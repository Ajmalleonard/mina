#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFilePath = path.join(process.cwd(), '.env.local');

// Check if .env.local already exists
if (fs.existsSync(envFilePath)) {
  console.log(".env.local already exists. Skipping creation.");
  process.exit(0);
}

const envContent = `# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@minafoundation.org

# For Gmail, you need to create an App Password:
# 1. Enable 2-Step Verification in your Google Account
# 2. Go to https://myaccount.google.com/apppasswords
# 3. Generate an App Password for "Mail" and "Other (Custom name)"
# 4. Use that password as SMTP_PASSWORD
`;

try {
  fs.writeFileSync(envFilePath, envContent);
  console.log(".env.local file has been created successfully!");
  console.log("Please update the file with your actual email credentials.");
} catch (error) {
  console.error("Error creating .env.local file:", error);
  process.exit(1);
}
