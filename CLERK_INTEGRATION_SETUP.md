# Clerk Authentication Integration Setup

This document explains how to set up Clerk authentication with your PMB Aero Club registration flow.

## Overview

The integration automatically creates Clerk user accounts when users complete the personal details step in your registration flow. Users cannot proceed to the next step if the email is already taken. **User roles are automatically assigned and saved to Clerk's metadata** based on the user type selection.

## Prerequisites

- Clerk account with authentication capabilities
- PostgreSQL database with Prisma schema
- Next.js application with the required dependencies

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/pmbaeroclub"

# Environment
NODE_ENV=development
```

## Clerk Dashboard Configuration

### 1. Get Your API Keys

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **API Keys** in the left sidebar
3. Copy your **Publishable Key** and **Secret Key**
4. Add them to your `.env.local` file

### 2. Configure Webhook Endpoint

1. In Clerk Dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Set the following configuration:

```
Endpoint URL: https://yourdomain.com/api/webhooks/clerk
Events to send:
✅ user.created
✅ user.updated
✅ user.deleted
✅ email_address.created
✅ email_address.updated
✅ email_address.deleted
✅ phone_number.created
✅ phone_number.updated
✅ phone_number.deleted
```

4. Copy the **Signing Secret** and add it to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

### 3. Configure User Metadata

1. In Clerk Dashboard, go to **Users**
2. Click on **Metadata** tab
3. Add the following public metadata fields:

```
userType: string (private, commercial)
userRole: string (STUDENT, INSTRUCTOR, ADMIN)
registrationStep: string (personal_details_completed, etc.)
registrationDate: string (ISO date string)
isActive: boolean (true/false)
```

4. Add the following private metadata fields:

```
registrationSource: string (pmb_aeroclub_website)
registrationFlow: string (multi_step_registration)
```

## How It Works

### 1. Registration Flow

1. User selects user type (private/commercial)
2. User fills out personal details form
3. **Email availability is checked in real-time** (on blur)
4. When user clicks "Continue":
   - Email availability is verified again
   - If email is available, Clerk account is created with:
     - **User role automatically assigned** (STUDENT for private, INSTRUCTOR for commercial)
     - Complete metadata including role, registration date, and source
   - User proceeds to next step
   - If email exists, user cannot proceed

### 2. Role Assignment Logic

The system automatically assigns roles based on user type:

- **Private Users** → `STUDENT` role
- **Commercial Users** → `INSTRUCTOR` role
- **Admin Users** → `ADMIN` role (can be set manually)

### 3. Metadata Structure

#### Public Metadata (visible to users):

```json
{
  "userType": "private|commercial",
  "userRole": "STUDENT|INSTRUCTOR|ADMIN",
  "registrationStep": "personal_details_completed",
  "registrationDate": "2024-01-15T10:30:00.000Z",
  "isActive": true
}
```

#### Private Metadata (internal use only):

```json
{
  "registrationSource": "pmb_aeroclub_website",
  "registrationFlow": "multi_step_registration"
}
```

### 4. Email Validation

- **Real-time checking**: Email availability is checked when user leaves the email field
- **Visual indicators**:
  - 🔄 Loading spinner while checking
  - ✅ Green checkmark for available email
  - ❌ Red X for existing email
- **Form validation**: Submit button is disabled if email already exists
- **Error messages**: Clear feedback about email availability

### 5. User Creation

When a user successfully submits the form:

1. Clerk account is created with:
   - Email address
   - First name and last name
   - Phone number (if provided)
   - **Complete metadata including role and registration details**

2. Webhook is triggered to sync user data to your database

3. User is automatically signed in and redirected to next step

## Features

### ✅ Real-time Email Validation

- Checks email availability as user types
- Prevents form submission with duplicate emails
- Visual feedback with icons and colors

### ✅ Automatic Role Assignment

- **User roles automatically saved to Clerk metadata**
- Role-based profile creation (Student/Instructor)
- Automatic database synchronization
- Support for future role changes

### ✅ Automatic Account Creation

- Creates Clerk account on form submission
- Sets appropriate user metadata and role
- Handles phone number verification

### ✅ Error Handling

- Clear error messages for all failure scenarios
- Graceful fallbacks for network issues
- User-friendly validation feedback

### ✅ Security

- Webhook signature verification
- Secure environment variable handling
- Protected API endpoints
- Role-based access control

## Testing

### 1. Test Email Validation

1. Start your development server: `npm run dev`
2. Go to `/register`
3. Select user type and fill out personal details
4. Try entering an email that already exists
5. Verify that the form prevents submission

### 2. Test Account Creation

1. Use a new email address
2. Fill out the form completely
3. Submit the form
4. Verify that:
   - Clerk account is created
   - **User role is properly set in metadata**
   - User is redirected to next step
   - Webhook is triggered (check logs)

### 3. Test Role Assignment

1. Create a private user account
2. Check Clerk dashboard for user metadata
3. Verify `userRole` is set to `STUDENT`
4. Create a commercial user account
5. Verify `userRole` is set to `INSTRUCTOR`

### 4. Test Webhook Integration

1. Check your application logs for webhook events
2. Verify user data is synced to database
3. Check that roles are properly created in database
4. Test the health endpoint: `/api/webhooks/health`

## Troubleshooting

### Common Issues

1. **"Signup system not ready" error**
   - Check if Clerk is properly initialized
   - Verify environment variables are set correctly

2. **Email validation not working**
   - Check browser console for errors
   - Verify Clerk API keys are correct
   - Check network requests in browser dev tools

3. **User role not being set**
   - Check Clerk dashboard for user metadata
   - Verify webhook is receiving events
   - Check database for role assignments

4. **Webhook not receiving events**
   - Verify webhook endpoint URL is correct
   - Check webhook secret matches
   - Ensure webhook is enabled in Clerk dashboard

5. **User not created in database**
   - Check webhook logs
   - Verify database connection
   - Check Prisma schema is up to date

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

### Log Analysis

Look for these log patterns:

```
✅ Webhook user.created successful for user user_123
👤 User user_123 setup completed with role: STUDENT
🎭 Role STUDENT assigned to user: user_123
📚 Student profile created for user: user_123
```

## Security Considerations

1. **Environment Variables**: Never expose Clerk secrets in client-side code
2. **Webhook Verification**: Always verify webhook signatures
3. **Role Management**: Implement proper role-based access control
4. **Metadata Validation**: Validate all metadata before processing
5. **Rate Limiting**: Consider implementing rate limiting for registration endpoints
6. **Input Validation**: Validate all form inputs before processing
7. **Error Handling**: Don't expose sensitive information in error messages

## Next Steps

After setting up Clerk integration:

1. **Test the complete flow** with real and duplicate emails
2. **Verify role assignment** in Clerk dashboard
3. **Monitor webhook events** to ensure data synchronization
4. **Set up email verification** if required by your business logic
5. **Implement user onboarding** after successful registration
6. **Add role-based access control** using Clerk user metadata
7. **Set up admin panel** for role management

## Support

For issues related to:

- **Clerk Integration**: Check [Clerk Documentation](https://clerk.com/docs)
- **Webhook Setup**: Review the webhook setup documentation
- **Database Issues**: Verify Prisma schema and database connectivity
- **Application Errors**: Check Next.js logs and error handling
- **Role Management**: Verify metadata structure and webhook processing

## Updates

Keep your Clerk integration updated:

1. Monitor Clerk for new features and updates
2. Update webhook event handlers as needed
3. Review security best practices regularly
4. Test authentication flows after updates
5. Verify role assignment logic remains correct
