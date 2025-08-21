# Authentication & Authorization Components

This directory contains components for handling user authentication, approval status, and role-based access control in the PMB Aero Club application.

## Components Overview

### 1. ProtectedRoute

Basic authentication guard that redirects unauthenticated users to login.

### 2. ApprovalCheck

Checks if the authenticated user's account has been approved by administrators.

### 3. AuthGuard

Combines authentication and approval checking in a single component.

### 4. RoleGuard

Provides role-based access control for different user types.

## Usage Examples

### Basic Authentication Protection

```tsx
import { ProtectedRoute } from "@/components/auth";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected dashboard content</div>
    </ProtectedRoute>
  );
}
```

### Authentication + Approval Check

```tsx
import { AuthGuard } from "@/components/auth";

export default function AdminPage() {
  return (
    <AuthGuard requireApproval={true} showPendingMessage={true}>
      <div>Admin content only visible to approved users</div>
    </AuthGuard>
  );
}
```

### Role-Based Access Control

```tsx
import { RoleGuard } from "@/components/auth";

export default function InstructorOnlyPage() {
  return (
    <RoleGuard requiredRoles={["INSTRUCTOR", "ADMIN"]}>
      <div>Content only visible to instructors and admins</div>
    </RoleGuard>
  );
}
```

### Custom Fallback UI

```tsx
import { AuthGuard } from "@/components/auth";

const CustomFallback = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
    <p className="text-gray-600">
      You don't have permission to view this content.
    </p>
  </div>
);

export default function RestrictedPage() {
  return (
    <AuthGuard requireApproval={true} fallback={<CustomFallback />}>
      <div>Restricted content</div>
    </AuthGuard>
  );
}
```

### Using the Hook Directly

```tsx
import { useApprovalStatus } from "@/components/auth";

export default function UserProfile() {
  const {
    isApproved,
    isPending,
    isRejected,
    userRole,
    userType,
    refreshApprovalStatus,
  } = useApprovalStatus();

  if (isPending) {
    return <div>Your account is pending approval...</div>;
  }

  if (isRejected) {
    return <div>Your account was not approved.</div>;
  }

  return (
    <div>
      <h1>Welcome, {userRole}!</h1>
      <button onClick={refreshApprovalStatus}>Refresh Status</button>
    </div>
  );
}
```

## Component Props

### ProtectedRoute

- `children`: Content to render if authenticated
- `fallback`: Custom UI to show while redirecting
- `redirectTo`: Login page URL (default: "/login")

### ApprovalCheck

- `children`: Content to render if approved
- `fallback`: Custom UI for unapproved users
- `showPendingMessage`: Whether to show pending approval message
- `redirectTo`: URL to redirect to (optional)

### AuthGuard

- `children`: Content to render if authenticated and approved
- `requireApproval`: Whether to check approval status (default: true)
- `showPendingMessage`: Whether to show pending approval message (default: true)
- `fallback`: Custom UI for unauthorized users
- `redirectTo`: Login page URL (default: "/login")

### RoleGuard

- `children`: Content to render if user has required role
- `requiredRoles`: Array of roles that can access the content
- `fallback`: Custom UI for unauthorized users
- `showAccessDenied`: Whether to show access denied message (default: true)

## User Approval Status

The system tracks user approval status through Clerk's `publicMetadata`:

```typescript
interface UserApprovalStatus {
  isApproved: boolean; // Whether user account is approved
  isPending: boolean; // Whether approval is pending
  isRejected: boolean; // Whether approval was rejected
  approvalDate?: string; // When account was approved
  rejectionReason?: string; // Reason for rejection (if applicable)
  status: "approved" | "pending" | "rejected" | "loading";
  userRole?: string; // User's role (STUDENT, INSTRUCTOR, ADMIN)
  userType?: string; // User type (private, commercial)
}
```

## User Roles

The application supports the following user roles:

- **STUDENT**: Private users, student pilots
- **INSTRUCTOR**: Commercial users, flight instructors
- **ADMIN**: Administrative users with full access

## Integration with Clerk

These components integrate with Clerk authentication and use the following metadata fields:

- `isApproved`: Boolean indicating approval status
- `isRejected`: Boolean indicating rejection status
- `approvalDate`: ISO date string of approval
- `rejectionReason`: String explaining rejection
- `userRole`: User's assigned role
- `userType`: User's registration type

## Best Practices

1. **Wrap sensitive content** with appropriate guards
2. **Use fallback UI** for better user experience
3. **Check approval status** for admin-only features
4. **Implement role-based access** for different user types
5. **Handle loading states** gracefully
6. **Provide clear feedback** when access is denied

## Error Handling

All components include proper error handling and loading states:

- Loading spinners while checking authentication/approval
- Clear error messages for different scenarios
- Graceful fallbacks for network issues
- User-friendly rejection explanations
