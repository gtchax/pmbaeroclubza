# Clerk Webhook Integration Setup

This document explains how to set up and configure the Clerk webhook integration for the PMB Aero Club application.

## Overview

The webhook system automatically syncs user data from Clerk (authentication service) to your local database when users:

- Sign up for new accounts
- Update their profile information
- Delete their accounts
- Change email addresses or phone numbers

## Prerequisites

- Clerk account with webhook capabilities
- PostgreSQL database with Prisma schema
- Next.js application with the required dependencies

## Installation

### 1. Install Dependencies

The following packages are already included in your `package.json`:

```bash
npm install @clerk/nextjs @prisma/client svix
```

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Clerk Configuration
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pmbaeroclub"
```

### 3. Database Setup

Ensure your database is running and the schema is up to date:

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Or run migrations if you prefer
npm run db:migrate
```

## Clerk Dashboard Configuration

### 1. Create Webhook Endpoint

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Webhooks** in the left sidebar
3. Click **Add Endpoint**
4. Set the following configuration:

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

### 2. Get Webhook Secret

1. After creating the webhook, copy the signing secret
2. Add it to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

### 3. Test Webhook

1. In the Clerk dashboard, click **Send test webhook**
2. Choose `user.created` event
3. Verify the webhook is received successfully

## File Structure

```
src/
├── app/
│   └── api/
│       └── webhooks/
│           ├── clerk/
│           │   └── route.ts          # Main webhook handler
│           └── health/
│               └── route.ts          # Health check endpoint
└── lib/
    ├── webhook-utils.ts              # Utility functions
    └── webhook-config.ts             # Configuration constants
```

## How It Works

### 1. User Creation Flow

When a user signs up through Clerk:

1. Clerk sends `user.created` webhook to `/api/webhooks/clerk`
2. Webhook verifies signature using `CLERK_WEBHOOK_SECRET`
3. User is created in your database with Clerk's user ID
4. Default `STUDENT` role is assigned
5. Student profile is created with default values
6. Response is sent back to Clerk

### 2. User Update Flow

When a user updates their profile:

1. Clerk sends `user.updated` webhook
2. User information is updated in database
3. Role changes are processed if `public_metadata.userType` is set
4. Appropriate profile (student/instructor) is created if needed

### 3. User Deletion Flow

When a user deletes their account:

1. Clerk sends `user.deleted` webhook
2. User and all related data is removed from database (cascade delete)

## Configuration Options

### User Types

Users can be categorized by setting `public_metadata.userType` in Clerk:

- `student` - Creates student profile and assigns STUDENT role
- `instructor` - Creates instructor profile and assigns INSTRUCTOR role
- `admin` - Assigns ADMIN role

### Default Values

Default values are set for new profiles:

**Student Profile:**

- Date of birth: 1990-01-01 (should be updated by user)
- Flight hours: 0
- Address: Empty string

**Instructor Profile:**

- License type: CFI
- License expiry: 1 year from creation
- Medical expiry: 1 year from creation

## Testing

### 1. Health Check

Test the webhook system health:

```bash
curl https://yourdomain.com/api/webhooks/health
```

### 2. Test Webhook Processing

Send a test POST request:

```bash
curl -X POST https://yourdomain.com/api/webhooks/health
```

### 3. Monitor Logs

Check your application logs for webhook events:

```bash
# Look for webhook logs
grep "Webhook received" your-app.log
```

## Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Check `CLERK_WEBHOOK_SECRET` environment variable
   - Ensure the secret matches the one in Clerk dashboard

2. **Database connection errors**
   - Verify `DATABASE_URL` is correct
   - Check database is running and accessible
   - Ensure Prisma schema is up to date

3. **User not created in database**
   - Check webhook logs for errors
   - Verify database permissions
   - Check if user already exists

4. **Role assignment fails**
   - Ensure roles table exists
   - Check database constraints
   - Verify user ID format

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

### Log Analysis

Webhook events are logged with the following format:

```
✅ Webhook user.created successful for user user_123 at 2024-01-01T12:00:00.000Z
❌ Webhook user.updated failed for user user_456 at 2024-01-01T12:01:00.000Z: Database connection error
```

## Security Considerations

1. **Webhook Secret**: Never expose `CLERK_WEBHOOK_SECRET` in client-side code
2. **Signature Verification**: Always verify webhook signatures before processing
3. **Rate Limiting**: Consider implementing rate limiting for webhook endpoints
4. **Input Validation**: Validate all incoming webhook data
5. **Error Handling**: Don't expose sensitive information in error responses

## Monitoring

### 1. Health Checks

Regular health checks ensure the system is working:

```bash
# Cron job example
*/5 * * * * curl -s https://yourdomain.com/api/webhooks/health > /dev/null
```

### 2. Database Monitoring

Monitor user creation and role assignment:

```sql
-- Check recent user creations
SELECT id, email, "firstName", "lastName", "createdAt"
FROM users
ORDER BY "createdAt" DESC
LIMIT 10;

-- Check role assignments
SELECT u.email, r.name as role, ur."createdAt"
FROM users u
JOIN "user_roles" ur ON u.id = ur."userId"
JOIN roles r ON ur."roleId" = r.id
ORDER BY ur."createdAt" DESC
LIMIT 10;
```

### 3. Webhook Event Logging

Consider implementing a webhook event log table for better monitoring:

```sql
CREATE TABLE webhook_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  user_id VARCHAR(255),
  status VARCHAR(20) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Support

For issues related to:

- **Clerk Integration**: Check [Clerk Documentation](https://clerk.com/docs)
- **Webhook Setup**: Review this document and check logs
- **Database Issues**: Verify Prisma schema and database connectivity
- **Application Errors**: Check Next.js logs and error handling

## Updates

Keep your webhook system updated:

1. Monitor Clerk for new webhook events
2. Update event handlers as needed
3. Review security best practices
4. Test webhook functionality regularly
