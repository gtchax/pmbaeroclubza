# 🚀 **Integrated Document Management System**

## **Overview**

The PMB Aero Club now features a comprehensive document management system that seamlessly integrates **MEGA Cloud Storage** with **PostgreSQL Database** for secure, scalable, and trackable document storage during user registration and ongoing operations.

## **🏗️ System Architecture**

### **Core Components**

1. **MEGA Cloud Storage** - Secure file storage and retrieval
2. **PostgreSQL Database** - Document metadata and tracking
3. **React Components** - User interface for document management
4. **Server Actions** - Backend operations and API endpoints
5. **React Query Hooks** - Client-side data management and caching

### **Data Flow**

```
User Upload → MEGA Storage → Database Record → UI Display
     ↓              ↓              ↓            ↓
  File File → Cloud Storage → Metadata → Real-time Updates
```

## **📁 File Structure**

```
src/
├── lib/
│   ├── actions/
│   │   ├── mega-actions.ts          # MEGA storage operations
│   │   └── user-document-actions.ts # Database operations
│   ├── hooks/
│   │   ├── use-mega-storage.ts      # MEGA storage hooks
│   │   └── use-user-documents.ts    # Document management hooks
│   ├── mega-config.ts               # MEGA storage configuration
│   └── types.ts                     # TypeScript interfaces
├── components/mega/
│   ├── DocumentUpload.tsx           # File upload component
│   ├── MegaConnectionStatus.tsx     # Connection status
│   └── IntegratedDocumentManager.tsx # Main management interface
└── prisma/
    └── schema.prisma                # Database schema
```

## **🗄️ Database Schema**

### **UserDocument Model**

```prisma
model UserDocument {
  id          String   @id @default(cuid())
  userId      String
  name        String   // Original filename
  displayName String   // User-friendly display name
  type        DocumentType
  category    DocumentCategory
  megaFileId  String   // MEGA storage file ID
  megaFolderId String  // MEGA storage folder ID
  fileSize    Int      // File size in bytes
  mimeType    String   // MIME type
  status      DocumentStatus @default(PENDING)
  notes       String?  // Admin notes or user notes
  uploadedAt  DateTime @default(now())
  updatedAt   DateTime @updatedAt
  reviewedAt  DateTime?
  reviewedBy  String?  // Admin who reviewed the document
  reviewNotes String?  // Review feedback

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### **Enums**

```prisma
enum DocumentType {
  MEDICAL_CERTIFICATE
  LICENSE_COPY
  INSURANCE_DOCUMENT
  IDENTIFICATION
  MEDICAL_RECORD
  TRAINING_CERTIFICATE
  AIRCRAFT_CERTIFICATION
  OTHER
}

enum DocumentCategory {
  REGISTRATION
  MEDICAL
  LICENSING
  INSURANCE
  TRAINING
  AIRCRAFT
  ADMINISTRATIVE
  OTHER
}

enum DocumentStatus {
  PENDING
  APPROVED
  REJECTED
  EXPIRED
  ARCHIVED
}
```

## **🔧 Setup & Configuration**

### **1. Database Migration**

```bash
# Create and apply the migration
npx prisma migrate dev --name add_user_documents

# Generate Prisma client
npx prisma generate
```

### **2. Environment Variables**

```env
# MEGA Cloud Storage
MEGA_EMAIL=your-email@example.com
MEGA_PASSWORD=your-password
MEGA_BASE_FOLDER=PMB_AeroClub_Documents

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pmbaeroclub"
```

### **3. Dependencies**

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "megajs": "^1.0.0",
    "@tanstack/react-query": "^5.0.0"
  }
}
```

## **📤 Document Upload Process**

### **1. File Selection & Validation**

- **Supported Formats**: Images, PDFs, Word documents, Text files
- **Size Limits**: Configurable (default: 50MB per file)
- **File Count**: Configurable (default: 10 files per upload)
- **Type Validation**: MIME type checking and file extension validation

### **2. MEGA Storage Upload**

```typescript
// Upload to MEGA cloud storage
const result = await uploadFile(file);

if (result.success && result.file) {
  // File successfully uploaded to MEGA
  const megaFileId = result.file.id;
  const megaFolderId = result.file.folderId;
}
```

### **3. Database Record Creation**

```typescript
// Create database record with MEGA file reference
const documentRecord = await createUserDocument(userId, {
  name: file.name,
  displayName: file.name,
  type: "MEDICAL_CERTIFICATE",
  category: "REGISTRATION",
  megaFileId: megaFileId,
  megaFolderId: megaFolderId,
  fileSize: file.size,
  mimeType: file.type,
  notes: "Uploaded during registration"
});
```

### **4. Real-time Updates**

- **React Query**: Automatic cache invalidation and updates
- **UI Refresh**: Immediate display of uploaded documents
- **Progress Tracking**: Real-time upload progress indicators

## **🔍 Document Retrieval & Management**

### **1. User Document Queries**

```typescript
// Get all user documents
const { documents } = useUserDocuments(userId);

// Get user with documents
const { user } = useUserWithDocuments(userId);

// Search and filter documents
const { documents } = useSearchUserDocuments(userId, {
  type: "MEDICAL_CERTIFICATE",
  category: "MEDICAL",
  status: "APPROVED"
});
```

### **2. Document Statistics**

```typescript
// Get document statistics
const { stats } = useUserDocumentStats(userId);

// Available statistics
{
  total: 15,           // Total documents
  pending: 3,          // Pending review
  approved: 10,        // Approved documents
  rejected: 2          // Rejected documents
}
```

### **3. Document Operations**

```typescript
// Update document
const updateResult = await updateUserDocument(documentId, {
  status: "APPROVED",
  reviewNotes: "Document verified successfully"
});

// Delete document
const deleteResult = await deleteUserDocument(documentId);

// Approve/Reject documents
const approveResult = await approveDocument(documentId, adminId, notes);
const rejectResult = await rejectDocument(documentId, adminId, reason);
```

## **🎯 Key Features**

### **1. Integrated Management**

- **Unified Interface**: Single component for all document operations
- **Real-time Sync**: MEGA storage and database always in sync
- **Status Tracking**: Complete document lifecycle management

### **2. Security & Compliance**

- **Secure Storage**: MEGA cloud storage with encryption
- **Access Control**: User-specific document isolation
- **Audit Trail**: Complete upload and review history

### **3. User Experience**

- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload progress
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error messages and recovery

### **4. Administrative Features**

- **Document Review**: Approve/reject uploaded documents
- **Bulk Operations**: Manage multiple documents simultaneously
- **Reporting**: Document statistics and usage analytics

## **📱 Component Usage**

### **Basic Integration**

```tsx
import { IntegratedDocumentManager } from "@/components/mega/IntegratedDocumentManager";

function MyComponent() {
  return (
    <IntegratedDocumentManager
      userId="user_123"
      title="My Documents"
    />
  );
}
```

### **Custom Upload Component**

```tsx
import { DocumentUpload } from "@/components/mega/DocumentUpload";

function CustomUpload() {
  return (
    <DocumentUpload
      userId="user_123"
      maxFiles={5}
      maxFileSize={25}
      onUploadComplete={(files) => {
        console.log("Uploaded:", files);
      }}
    />
  );
}
```

### **Standalone Hooks**

```tsx
import { useUserDocumentManagement } from "@/lib/hooks/use-user-documents";

function DocumentStats() {
  const { documents, stats, isLoading } = useUserDocumentManagement(userId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h3>Total Documents: {stats?.total}</h3>
      <h3>Pending: {stats?.pending}</h3>
    </div>
  );
}
```

## **🚀 Advanced Features**

### **1. Document Workflow**

```typescript
// Document approval workflow
const workflow = {
  UPLOAD: "PENDING",
  REVIEW: "UNDER_REVIEW",
  APPROVE: "APPROVED",
  REJECT: "REJECTED",
  EXPIRE: "EXPIRED",
  ARCHIVE: "ARCHIVED"
};
```

### **2. Bulk Operations**

```typescript
// Upload multiple documents
const result = await createMultipleUserDocuments(userId, [
  { /* document 1 */ },
  { /* document 2 */ },
  { /* document 3 */ }
]);

// Bulk status updates
const updates = documents.map(doc => ({
  id: doc.id,
  status: "APPROVED"
}));
```

### **3. Search & Filtering**

```typescript
// Advanced search with multiple criteria
const searchResult = await searchUserDocuments(userId, {
  type: "MEDICAL_CERTIFICATE",
  category: "MEDICAL",
  status: "PENDING",
  searchTerm: "certificate"
});
```

## **🔧 Troubleshooting**

### **Common Issues**

1. **MEGA Connection Failed**
   - Check environment variables
   - Verify MEGA credentials
   - Check network connectivity

2. **Database Errors**
   - Run database migrations
   - Check Prisma client generation
   - Verify database connection

3. **Upload Failures**
   - Check file size limits
   - Verify file type restrictions
   - Check MEGA storage quota

### **Debug Mode**

```typescript
// Enable debug logging
const debugMode = process.env.NODE_ENV === 'development';

if (debugMode) {
  console.log('MEGA Upload Result:', result);
  console.log('Database Record:', documentRecord);
}
```

## **📈 Performance & Scalability**

### **1. Caching Strategy**

- **React Query**: Client-side caching with configurable stale times
- **Database**: Efficient indexing on userId and status fields
- **MEGA**: Cloud CDN for fast file delivery

### **2. Batch Operations**

- **Multiple Uploads**: Parallel file processing
- **Bulk Database**: Batch insert operations
- **Efficient Queries**: Optimized database queries

### **3. Storage Optimization**

- **File Compression**: Automatic image optimization
- **Thumbnail Generation**: Preview images for faster loading
- **Lazy Loading**: Load documents on demand

## **🔮 Future Enhancements**

### **1. Advanced Features**

- **Document Versioning**: Track document changes over time
- **Digital Signatures**: Secure document signing
- **OCR Integration**: Extract text from images and PDFs
- **AI Classification**: Automatic document categorization

### **2. Integration Extensions**

- **Email Notifications**: Document status updates
- **Mobile App**: Native mobile document management
- **API Endpoints**: External system integration
- **Webhook Support**: Real-time external notifications

### **3. Compliance & Security**

- **GDPR Compliance**: Data privacy controls
- **Encryption**: End-to-end file encryption
- **Access Logs**: Comprehensive audit trails
- **Backup Systems**: Automated backup and recovery

## **📚 API Reference**

### **Server Actions**

```typescript
// Document Management
createUserDocument(userId, documentData)
createMultipleUserDocuments(userId, documents)
getUserDocuments(userId)
getUserDocument(documentId)
updateUserDocument(documentId, updates)
deleteUserDocument(documentId)

// MEGA Operations
connectToMega()
disconnectFromMega()
uploadSingleDocument(userId, document)
uploadRegistrationDocuments(userId, documents)
getStorageUsage()
```

### **React Hooks**

```typescript
// Document Management
useUserDocuments(userId)
useUserDocument(documentId)
useUserWithDocuments(userId)
useUserDocumentManagement(userId)

// MEGA Storage
useMegaStorage()
useDocumentUpload(userId)
useMegaConnectionStatus()
```

## **🎉 Conclusion**

The Integrated Document Management System provides a robust, scalable, and user-friendly solution for managing documents in the PMB Aero Club application. By combining MEGA cloud storage with PostgreSQL database tracking, it offers the best of both worlds: secure file storage and comprehensive document management capabilities.

The system is designed to be:
- **Easy to Use**: Intuitive interface for users and administrators
- **Highly Secure**: Encrypted cloud storage with access controls
- **Fully Integrated**: Seamless database and storage synchronization
- **Extensible**: Built for future enhancements and integrations

For support or questions, please refer to the development team or consult the component documentation.
