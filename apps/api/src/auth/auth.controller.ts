import { Body, Controller, Get, Patch, Post, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Role } from '../../prisma/generated/client';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { VerifyAdminMfaDto } from './dto/verify-admin-mfa.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private refreshTokenService: RefreshTokenService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('admin/login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.initiateAdminLogin(adminLoginDto);
  }

  @Post('admin/verify')
  async verifyAdminMfa(@Body() verifyAdminMfaDto: VerifyAdminMfaDto) {
    return this.authService.completeAdminMfa(verifyAdminMfaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/me')
  async adminMe(@Request() req) {
    return this.authService.getAdminProfile(req.user.userId);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    const payload = this.refreshTokenService.verifyToken(refreshToken);
    if (!payload || !payload.sub) throw new UnauthorizedException('Invalid refresh token');
    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');
    return this.authService.login({ id: user.id, email: user.email, role: user.role });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/password')
  async changeAdminPassword(
    @Request() req,
    @Body() changeAdminPasswordDto: ChangeAdminPasswordDto,
  ) {
    return this.authService.changeAdminPassword(
      req.user.userId,
      changeAdminPasswordDto,
    );
  }
}
