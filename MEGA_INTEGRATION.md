# MEGA Cloud Storage Integration

This document describes the integration of MEGA cloud storage for storing PMB Aero Club registration documents and images.

## 🚀 **Overview**

The MEGA integration provides secure, end-to-end encrypted cloud storage for all registration documents including:

- Medical certificates
- License copies
- Insurance documents
- Identification documents
- Other supporting materials

## 📁 **File Structure**

```
src/
├── lib/
│   ├── mega-config.ts          # MEGA client configuration and manager
│   ├── actions/
│   │   └── mega-actions.ts     # Server-side actions for MEGA operations
│   └── hooks/
│       └── use-mega-storage.ts # React hooks for MEGA operations
├── components/
│   └── mega/
│       ├── MegaConnectionStatus.tsx  # Connection status component
│       ├── DocumentUpload.tsx        # Document upload component
│       └── MegaDashboard.tsx         # Main dashboard component
└── types.ts                    # TypeScript interfaces
```

## ⚙️ **Configuration**

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# MEGA Account Credentials
MEGA_EMAIL=your-mega-email@example.com
MEGA_PASSWORD=your-mega-password

# MEGA Base Folder (optional)
MEGA_BASE_FOLDER=PMB_Aero_Club_Registrations
```

### MEGA Account Setup

1. Create a MEGA account at [mega.nz](https://mega.nz)
2. Enable 2FA for enhanced security
3. Note your email and password
4. Ensure you have sufficient storage space

## 🔐 **Security Features**

- **End-to-End Encryption**: All files are encrypted before upload
- **Secure Authentication**: Uses MEGA's secure authentication system
- **Access Control**: User-specific folders prevent cross-user access
- **Audit Trail**: All operations are logged for compliance

## 📤 **Upload Process**

### 1. File Validation

- File size limits (configurable, default: 50MB)
- File type restrictions (images, PDFs, Word documents)
- Virus scanning (if enabled)

### 2. Storage Organization

```
PMB_Aero_Club_Registrations/
├── user_123/
│   └── documents/
│       ├── medical_certificate.pdf
│       ├── license_copy.jpg
│       └── insurance_docs.pdf
├── user_456/
│   └── documents/
│       └── identification.pdf
```

### 3. Upload Flow

1. User selects files
2. Files are validated
3. Files are encrypted locally
4. Files are uploaded to MEGA
5. File metadata is stored in database
6. Success confirmation is shown

## 🎯 **Usage Examples**

### Basic Connection

```tsx
import { useMegaStorage } from "@/lib/hooks/use-mega-storage";

function MyComponent() {
  const { isConnected, connect, disconnect } = useMegaStorage();

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect}>Disconnect</button>
      ) : (
        <button onClick={connect}>Connect to MEGA</button>
      )}
    </div>
  );
}
```

### Document Upload

```tsx
import { DocumentUpload } from "@/components/mega/DocumentUpload";

function RegistrationForm() {
  return (
    <DocumentUpload
      userId="user_123"
      maxFiles={10}
      maxFileSize={50}
      onUploadComplete={(files) => {
        console.log("Uploaded:", files);
      }}
    />
  );
}
```

### Connection Status

```tsx
import { MegaConnectionStatus } from "@/components/mega/MegaConnectionStatus";

function Dashboard() {
  return <MegaConnectionStatus showDetails={true} className="mb-6" />;
}
```

## 🔧 **API Reference**

### MegaStorageManager Class

```typescript
class MegaStorageManager {
  // Connection
  async connect(): Promise<void>;
  async disconnect(): Promise<void>;

  // File Operations
  async uploadFile(
    parentFolderId: string,
    fileName: string,
    fileData: Buffer | File | Blob,
    mimeType?: string
  ): Promise<MegaFile>;
  async downloadFile(
    fileId: string
  ): Promise<{ data: Buffer; name: string; type: string }>;
  async deleteFile(fileId: string): Promise<void>;

  // Folder Operations
  async createFolder(
    parentFolderId: string,
    folderName: string
  ): Promise<string>;
  async deleteFolder(folderId: string): Promise<void>;

  // Utility
  isConnected(): boolean;
  getBaseFolderId(): string | null;
  async getStorageUsage(): Promise<{ used: number; total: number }>;
}
```

### Server Actions

```typescript
// Connection
connectToMega(): Promise<{ success: boolean; message: string }>
disconnectFromMega(): Promise<{ success: boolean; message: string }>
getMegaConnectionStatus(): Promise<{ connected: boolean; baseFolderId: string | null }>

// Upload
uploadRegistrationDocuments(userId: string, documents: Document[]): Promise<UploadResult>
uploadSingleDocument(userId: string, document: Document): Promise<UploadResult>

// Management
getRegistrationDocuments(userId: string): Promise<DocumentResult>
downloadDocument(fileId: string): Promise<DownloadResult>
deleteDocument(fileId: string): Promise<DeleteResult>

// Storage
getStorageUsage(): Promise<StorageResult>
```

### React Hooks

```typescript
// Connection
useMegaConnection(): ConnectionActions
useMegaConnectionStatus(): ConnectionStatus
useMegaStorage(): MegaStorageState

// Upload
useUploadRegistrationDocuments(): UploadMutation
useUploadSingleDocument(): UploadMutation
useDocumentUpload(userId: string): UploadActions

// Management
useRegistrationDocuments(userId: string): DocumentsQuery
useDownloadDocument(): DownloadMutation
useDeleteDocument(): DeleteMutation

// Storage
useStorageUsage(): StorageQuery
```

## 🚨 **Error Handling**

### Common Errors

1. **Authentication Failed**
   - Check email/password
   - Verify 2FA if enabled
   - Check account status

2. **Storage Full**
   - Check available space
   - Delete old files
   - Upgrade MEGA plan

3. **Network Issues**
   - Check internet connection
   - Verify firewall settings
   - Try again later

### Error Recovery

```typescript
try {
  await uploadFile(file);
} catch (error) {
  if (error.message.includes("authentication")) {
    // Re-authenticate
    await reconnect();
  } else if (error.message.includes("storage")) {
    // Handle storage issues
    showStorageWarning();
  } else {
    // Generic error handling
    showErrorMessage(error.message);
  }
}
```

## 📱 **Mobile Responsiveness**

All MEGA components are fully responsive and work on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

### Mobile Optimizations

- Touch-friendly file selection
- Swipe gestures for file management
- Optimized upload progress display
- Responsive grid layouts

## 🧪 **Testing**

### Unit Tests

```bash
# Test MEGA configuration
npm test mega-config

# Test server actions
npm test mega-actions

# Test React hooks
npm test use-mega-storage
```

### Integration Tests

```bash
# Test full upload flow
npm test mega-integration

# Test error scenarios
npm test mega-errors
```

### Manual Testing

1. **Connection Test**
   - Connect to MEGA
   - Verify folder creation
   - Check storage usage

2. **Upload Test**
   - Upload various file types
   - Test file size limits
   - Verify encryption

3. **Download Test**
   - Download uploaded files
   - Verify file integrity
   - Check access controls

## 🔮 **Future Enhancements**

### Planned Features

1. **Advanced Search**
   - Full-text search in documents
   - Metadata filtering
   - Date range queries

2. **Bulk Operations**
   - Mass file upload
   - Batch file deletion
   - Bulk status updates

3. **Version Control**
   - File versioning
   - Change history
   - Rollback capabilities

4. **Advanced Security**
   - Custom encryption keys
   - Access logging
   - Compliance reporting

5. **Integration Features**
   - Webhook notifications
   - API rate limiting
   - Third-party integrations

### Performance Improvements

1. **Upload Optimization**
   - Chunked uploads
   - Resume capability
   - Parallel processing

2. **Caching Strategy**
   - File metadata caching
   - Connection pooling
   - Smart refresh

3. **Monitoring**
   - Performance metrics
   - Error tracking
   - Usage analytics

## 🆘 **Support & Troubleshooting**

### Common Issues

1. **Slow Uploads**
   - Check internet speed
   - Verify MEGA server status
   - Try during off-peak hours

2. **Connection Drops**
   - Enable auto-reconnect
   - Check network stability
   - Verify credentials

3. **File Corruption**
   - Re-upload affected files
   - Check file integrity
   - Contact support if persistent

### Getting Help

1. **Documentation**: Check this file first
2. **Console Logs**: Check browser console for errors
3. **Network Tab**: Verify API calls in DevTools
4. **Support**: Contact development team

## 📄 **License & Compliance**

- **MEGA Terms**: Follow MEGA's terms of service
- **Data Protection**: Compliant with GDPR requirements
- **Audit Trail**: Maintains compliance records
- **Security**: Enterprise-grade security measures

## 🔄 **Updates & Maintenance**

### Regular Maintenance

1. **Monthly**
   - Update MEGA client library
   - Review security settings
   - Clean up old connections

2. **Quarterly**
   - Performance review
   - Security audit
   - User feedback analysis

3. **Annually**
   - Major version updates
   - Architecture review
   - Compliance check

### Update Process

1. **Backup**: Export current configuration
2. **Test**: Verify in staging environment
3. **Deploy**: Roll out to production
4. **Monitor**: Watch for issues
5. **Rollback**: If problems occur

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: PMB Aero Club Development Team
