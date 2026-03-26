import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, User } from '../../prisma/generated/client';
import { AdminLoginDto } from './dto/admin-login.dto';
import { VerifyAdminMfaDto } from './dto/verify-admin-mfa.dto';
import { buildOtpAuthUrl, generateTotpSecret, verifyTotpCode } from './totp.util';
import { decryptSecret, encryptSecret } from './crypto.util';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';

type AuthenticatedUser = Pick<User, 'id' | 'email' | 'role'>;
type SafeUser = Omit<User, 'password' | 'mfaSecret'>;

type AdminLoginResponse =
  | {
      status: 'authenticated';
      access_token: string;
      user: SafeUser;
    }
  | {
      status: 'mfa_code_required';
      challengeToken: string;
      user: SafeUser;
    }
  | {
      status: 'mfa_setup_required';
      challengeToken: string;
      user: SafeUser;
      mfaSecret: string;
      otpAuthUrl: string;
    };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.validateCredentials(email, pass);
    return user ? this.sanitizeUser(user) : null;
  }

  async validateCredentials(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: AuthenticatedUser) {
    return {
      access_token: this.buildAccessToken(user),
    };
  }
  
  async register(userDto: any) {
    const existingUser = await this.usersService.findOne(userDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.usersService.create(userDto);
    return this.login(user);
  }

  async initiateAdminLogin(adminLoginDto: AdminLoginDto): Promise<AdminLoginResponse> {
    const user = await this.validateCredentials(adminLoginDto.email, adminLoginDto.password);
    this.ensureAdmin(user);

    if (!user.mfaEnabled || !user.mfaSecret) {
      const mfaSecret = generateTotpSecret();

      return {
        status: 'mfa_setup_required',
        challengeToken: this.jwtService.sign(
          {
            sub: user.id,
            email: user.email,
            role: user.role,
            purpose: 'admin-mfa-setup',
            mfaSecret,
          },
          { expiresIn: '10m' },
        ),
        user: this.sanitizeUser(user),
        mfaSecret,
        otpAuthUrl: buildOtpAuthUrl({
          issuer: process.env.ADMIN_TOTP_ISSUER || 'Mina Admin',
          accountName: user.email,
          secret: mfaSecret,
        }),
      };
    }

    return {
      status: 'mfa_code_required',
      challengeToken: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
          purpose: 'admin-mfa-verify',
        },
        { expiresIn: '10m' },
      ),
      user: this.sanitizeUser(user),
    };
  }

  async completeAdminMfa(verifyAdminMfaDto: VerifyAdminMfaDto) {
    const challengePayload = this.verifyChallengeToken(verifyAdminMfaDto.challengeToken);
    const user = await this.usersService.findById(challengePayload.sub);

    this.ensureAdmin(user);

    let totpSecret = '';
    let shouldEnableMfa = false;

    if (challengePayload.purpose === 'admin-mfa-setup') {
      if (!challengePayload.mfaSecret) {
        throw new UnauthorizedException('The admin setup session is invalid. Please sign in again.');
      }

      totpSecret = challengePayload.mfaSecret;
      shouldEnableMfa = true;
    } else {
      if (!user.mfaSecret) {
        throw new UnauthorizedException('Google Authenticator is not configured for this admin.');
      }
      totpSecret = decryptSecret(user.mfaSecret);
    }

    const isValidCode = verifyTotpCode(totpSecret, verifyAdminMfaDto.code);
    if (!isValidCode) {
      throw new UnauthorizedException('The verification code is invalid or expired.');
    }

    const updatedUser = await this.usersService.update(user.id, {
      lastLoginAt: new Date(),
      ...(shouldEnableMfa
        ? {
            mfaEnabled: true,
            mfaSecret: encryptSecret(totpSecret),
          }
        : {}),
    });

    return {
      status: 'authenticated' as const,
      access_token: this.buildAccessToken(updatedUser),
      user: this.sanitizeUser(updatedUser),
      justConfiguredMfa: shouldEnableMfa,
    };
  }

  async getAdminProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    this.ensureAdmin(user);

    return this.sanitizeUser(user);
  }

  async changeAdminPassword(
    userId: string,
    changeAdminPasswordDto: ChangeAdminPasswordDto,
  ) {
    const user = await this.usersService.findById(userId);
    this.ensureAdmin(user);

    const currentPasswordMatches = await bcrypt.compare(
      changeAdminPasswordDto.currentPassword,
      user.password,
    );

    if (!currentPasswordMatches) {
      throw new UnauthorizedException('The current password is incorrect.');
    }

    if (
      changeAdminPasswordDto.currentPassword ===
      changeAdminPasswordDto.newPassword
    ) {
      throw new BadRequestException(
        'The new password must be different from the current password.',
      );
    }

    await this.usersService.update(user.id, {
      password: await bcrypt.hash(changeAdminPasswordDto.newPassword, 10),
    });

    return {
      message: 'Password updated successfully.',
    };
  }

  private buildAccessToken(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  private ensureAdmin(user: User | null): asserts user is User {
    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Invalid admin credentials.');
    }
  }

  private sanitizeUser(user: User): SafeUser {
    const { password, mfaSecret, ...safeUser } = user;
    return safeUser;
  }

  private verifyChallengeToken(token: string) {
    try {
      const payload = this.jwtService.verify<{
        sub: string;
        email: string;
        role: Role;
        purpose: 'admin-mfa-setup' | 'admin-mfa-verify';
        mfaSecret?: string;
      }>(token);

      if (payload.purpose === 'admin-mfa-setup' && !payload.mfaSecret) {
        throw new UnauthorizedException('The admin setup session is invalid. Please sign in again.');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('The admin verification session has expired. Please sign in again.');
    }
  }
}
