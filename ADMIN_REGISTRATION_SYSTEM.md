# Admin Registration System

This document describes the secure admin registration system implemented for PMB Aero Club, which ensures only one SUPER_ADMIN can be created and requires email verification.

## System Overview

The admin registration system provides:

- **One-time SUPER_ADMIN creation** - Only one SUPER_ADMIN user can exist
- **Secure registration** - Admin accounts are created with proper role-based access
- **Email verification** - All admin accounts require email verification before access
- **Role-based permissions** - Different admin levels with appropriate permissions

## Routes and Pages

### 1. Admin Registration (`/seams/admin-register`)

- **Purpose**: Create the first admin account (SUPER_ADMIN only)
- **Access**: Public (but checks for existing SUPER_ADMIN)
- **Features**:
  - Form validation with Zod schema
  - Admin level selection (SUPER_ADMIN, ADMIN, MANAGER)
  - Automatic SUPER_ADMIN existence check
  - Clerk user creation with metadata
  - Database user and role creation

### 2. Admin Login (`/seams/admin-login`)

- **Purpose**: Authenticate admin users
- **Access**: Public
- **Features**:
  - Email/password authentication
  - Email verification status check
  - Automatic OTP resend for unverified users
  - Redirect to verification page if needed

### 3. Email Verification (`/seams/verify-email`)

- **Purpose**: Verify admin email addresses with OTP
- **Access**: Public (with email parameter)
- **Features**:
  - 6-digit OTP verification
  - Countdown timer for resend
  - Automatic dashboard redirect on success
  - Resend verification email functionality

### 4. Admin Dashboard (`/seams/dashboard`)

- **Purpose**: Main admin interface
- **Access**: Authenticated admins only
- **Features**:
  - User information display
  - Quick statistics overview
  - Navigation to different admin sections
  - Logout functionality

## API Endpoints

### Admin Management

- `POST /api/admin/register` - Create new admin account
- `POST /api/admin/login` - Authenticate admin user
- `POST /api/admin/verify-email` - Verify email with OTP
- `POST /api/admin/resend-verification` - Resend verification email
- `GET /api/admin/me` - Get current admin user info
- `POST /api/admin/logout` - Logout admin user

### System Checks

- `GET /api/admin/check-super-admin` - Check if SUPER_ADMIN exists

## Security Features

### 1. One-Time SUPER_ADMIN Creation

- Database check prevents multiple SUPER_ADMIN users
- API-level validation ensures security
- Only allows registration when no SUPER_ADMIN exists

### 2. Email Verification Required

- All admin accounts must verify email before access
- OTP-based verification system
- Prevents unauthorized access to admin features

### 3. Role-Based Access Control

- Different admin levels with specific permissions
- Database-level role enforcement
- Clerk metadata for additional security

### 4. Input Validation

- Zod schema validation for all forms
- Server-side validation for API endpoints
- SQL injection prevention through Prisma ORM

## User Flow

### First-Time Setup

1. **Access Registration**: Navigate to `/seams/admin-register`
2. **System Check**: System verifies no SUPER_ADMIN exists
3. **Account Creation**: Fill out registration form
4. **Clerk Creation**: User created in Clerk with admin metadata
5. **Database Creation**: User and role created in database
6. **Email Verification**: Verification email sent automatically
7. **OTP Verification**: User enters 6-digit code
8. **Account Activation**: Email verified, account approved
9. **Dashboard Access**: Redirected to admin dashboard

### Subsequent Admin Creation

1. **SUPER_ADMIN Check**: Only existing admins can create new accounts
2. **Role Assignment**: New admins get appropriate role levels
3. **Same Verification Process**: Email verification required for all

### Login Process

1. **Authentication**: Email/password login
2. **Verification Check**: System checks email verification status
3. **Conditional Redirect**:
   - **Verified**: Redirect to dashboard
   - **Unverified**: Show verification message, redirect to verification page

## Database Schema

### User Model

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  firstName     String
  lastName      String
  isApproved    Boolean  @default(false)
  approvalStatus UserApprovalStatus @default(PENDING)
  approvedAt    DateTime?
  // ... other fields
}
```

### Role Model

```prisma
model Role {
  id          String @id @default(cuid())
  name        String @unique // SUPER_ADMIN, ADMIN, MANAGER
  description String
  permissions Json   // Store permissions as JSON
}
```

### Admin Model

```prisma
model Admin {
  id          String   @id @default(cuid())
  userId      String   @unique
  adminLevel  String   // SUPER_ADMIN, ADMIN, MANAGER
  permissions Json     // Specific admin permissions
}
```

## Environment Variables Required

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_connection_string

# Other Clerk settings
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/seams/admin-login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/seams/admin-register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/seams/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/seams/verify-email
```

## Permissions Structure

### SUPER_ADMIN

- Full system access
- Can manage all users and roles
- System configuration access
- Can create other admin accounts

### ADMIN

- User management
- Aircraft management
- Booking management
- Report access
- Cannot manage other admins

### MANAGER

- Limited user management
- Aircraft monitoring
- Basic reporting
- No system configuration access

## Error Handling

### Common Error Scenarios

1. **SUPER_ADMIN Already Exists**: Registration blocked
2. **Email Not Verified**: Login blocked, redirect to verification
3. **Invalid OTP**: Verification failed, allow retry
4. **Authentication Required**: Redirect to login
5. **Insufficient Permissions**: Access denied

### User Experience

- Clear error messages
- Helpful guidance for next steps
- Automatic redirects where appropriate
- Loading states and feedback

## Testing

### Manual Testing Steps

1. **First Registration**: Verify SUPER_ADMIN creation works
2. **Duplicate Prevention**: Try to create second SUPER_ADMIN (should fail)
3. **Email Verification**: Test OTP verification flow
4. **Login Flow**: Test verified vs unverified login
5. **Dashboard Access**: Verify protected routes work
6. **Logout**: Test session termination

### Security Testing

1. **Unauthorized Access**: Try to access admin routes without auth
2. **Role Escalation**: Attempt to access SUPER_ADMIN features as regular admin
3. **SQL Injection**: Test form inputs for injection attempts
4. **Session Management**: Verify proper session handling

## Future Enhancements

### Potential Improvements

1. **Two-Factor Authentication**: Add 2FA for additional security
2. **Audit Logging**: Track admin actions for compliance
3. **IP Whitelisting**: Restrict admin access to specific IP ranges
4. **Session Timeout**: Implement automatic session expiration
5. **Backup Admin**: Create secondary admin recovery process

### Monitoring and Alerts

1. **Failed Login Attempts**: Alert on suspicious activity
2. **Admin Account Changes**: Log role modifications
3. **System Access**: Monitor dashboard usage patterns
4. **Email Verification**: Track verification success rates

## Troubleshooting

### Common Issues

1. **Clerk Integration**: Verify API keys and webhook configuration
2. **Database Connection**: Check Prisma connection and migrations
3. **Email Delivery**: Verify Clerk email service configuration
4. **Role Creation**: Ensure database roles exist before user creation

### Debug Steps

1. Check browser console for client-side errors
2. Review server logs for API endpoint errors
3. Verify database schema matches Prisma models
4. Test Clerk API endpoints independently
5. Check environment variable configuration

## Support

For technical support or questions about the admin registration system:

1. Review this documentation
2. Check the application logs
3. Verify environment configuration
4. Test with known good credentials
5. Contact the development team
