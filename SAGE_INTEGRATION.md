# SAGE Business Cloud Accounting Integration

This document describes the integration of SAGE Business Cloud Accounting with the PMB Aero Club dashboards to provide real-time financial data, transactions, and account balances.

## 🚀 Features

### **OAuth2 Authentication**

- **Secure OAuth2 Authorization Code Flow** for SAGE API access
- **Automatic token refresh** to maintain continuous access
- **Secure token storage** in browser localStorage
- **CSRF protection** with state parameter validation

### **Financial Data Access**

- **Real-time account balances** from SAGE
- **Transaction history** with filtering and search
- **Financial summaries** including P&L and balance sheet
- **Customer and supplier management**
- **Journal entries** and audit trails

### **Dashboard Integration**

- **Student financial overview** with outstanding balances
- **Instructor earnings tracking** and payment history
- **Admin financial dashboard** with comprehensive metrics
- **Real-time data synchronization** across all dashboards

## 🔧 Setup & Configuration

### **Environment Variables**

Create a `.env.local` file with the following SAGE configuration:

```bash
# SAGE OAuth2 Configuration
SAGE_CLIENT_ID=your_sage_client_id
SAGE_CLIENT_SECRET=your_sage_client_secret
SAGE_REDIRECT_URI=http://localhost:3000/api/auth/sage/callback

# SAGE API Configuration (Optional - for direct API access)
SAGE_BASE_URL=https://api.sage.com/accounting/v3.1
SAGE_COMPANY_ID=your_company_id
```

### **SAGE Developer Account Setup**

1. **Register for SAGE Developer Account**
   - Visit [SAGE Developer Portal](https://developer.sage.com/)
   - Create a new application
   - Configure OAuth2 redirect URIs

2. **Configure OAuth2 Scopes**
   - Request `full_access` scope for complete financial data access
   - Ensure proper permissions for your use case

3. **Get API Credentials**
   - Copy Client ID and Client Secret
   - Configure redirect URI in SAGE developer console

## 📁 File Structure

```
src/
├── lib/
│   ├── sage-api.ts              # SAGE API client with OAuth2 support
│   ├── sage-auth.ts             # OAuth2 authentication manager
│   ├── actions/
│   │   └── sage-actions.ts      # Server actions for SAGE data
│   └── hooks/
│       └── use-sage-data.ts     # React Query hooks for SAGE data
├── app/
│   ├── api/auth/sage/
│   │   └── callback/route.ts    # OAuth2 callback handler
│   └── auth/sage/
│       ├── login/page.tsx       # SAGE connection page
│       ├── success/page.tsx     # Success page
│       └── error/page.tsx       # Error handling page
└── components/
    └── sage/
        ├── SageConnectionStatus.tsx  # Connection status component
        └── SageFinancialData.tsx     # Financial data display
```

## 🔐 Authentication Flow

### **1. User Initiates Connection**

```typescript
const { login } = useSageAuth();
login(); // Redirects to SAGE OAuth
```

### **2. SAGE OAuth2 Authorization**

- User is redirected to SAGE authorization page
- User grants permissions to PMB Aero Club
- SAGE redirects back with authorization code

### **3. Token Exchange**

```typescript
// Automatic token exchange in callback route
const authState = await sageOAuthManager.handleCallback(code, state);
```

### **4. API Access**

```typescript
// Automatic token inclusion in API requests
const accounts = await sageApi.getAccounts();
```

## 📊 Data Models

### **SageAccount**

```typescript
interface SageAccount {
  id: string;
  code: string;
  name: string;
  category: string;
  type: "asset" | "liability" | "equity" | "income" | "expense";
  balance: number;
  currency: string;
  status: "active" | "inactive";
}
```

### **SageTransaction**

```typescript
interface SageTransaction {
  id: string;
  reference: string;
  date: Date;
  description: string;
  amount: number;
  type: "debit" | "credit";
  accountId: string;
  status: "posted" | "draft" | "void";
}
```

### **SageFinancialSummary**

```typescript
interface SageFinancialSummary {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
}
```

## 🎯 Usage Examples

### **Student Dashboard Integration**

```typescript
import { useStudentFinancialSummary } from "@/lib/hooks/use-sage-data";

function StudentFinancialOverview({ studentId }: { studentId: string }) {
  const { data: financialData, isLoading } = useStudentFinancialSummary(studentId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Outstanding Balance: {formatCurrency(financialData.outstandingBalance)}</h3>
      {/* Display financial data */}
    </div>
  );
}
```

### **Admin Financial Dashboard**

```typescript
import { SageFinancialData } from "@/components/sage/SageFinancialData";

function AdminDashboard() {
  return (
    <div>
      <SageConnectionStatus />
      <SageFinancialData />
    </div>
  );
}
```

### **Connection Status Component**

```typescript
import { SageConnectionStatus } from "@/components/sage/SageConnectionStatus";

function DashboardHeader() {
  return (
    <header>
      <SageConnectionStatus showDetails={false} />
    </header>
  );
}
```

## 🔄 Data Refresh & Caching

### **React Query Integration**

- **Automatic caching** with configurable stale times
- **Background refetching** for real-time updates
- **Optimistic updates** for better UX
- **Error handling** with retry mechanisms

### **Cache Configuration**

```typescript
// Financial data refreshes every 2 minutes
staleTime: 2 * 60 * 1000,
gcTime: 5 * 60 * 1000,

// Account data refreshes every 5 minutes
staleTime: 5 * 60 * 1000,
gcTime: 10 * 60 * 1000,
```

## 🛡️ Security Features

### **OAuth2 Security**

- **State parameter validation** prevents CSRF attacks
- **Secure token storage** in browser localStorage
- **Automatic token refresh** maintains security
- **Proper error handling** for security incidents

### **Data Protection**

- **Read-only access** to financial data
- **No sensitive data logging** in production
- **Secure API communication** over HTTPS
- **Token expiration handling** for security

## 🚨 Error Handling

### **Common Error Scenarios**

1. **OAuth2 Errors**: Access denied, invalid request, server errors
2. **API Errors**: Network issues, rate limiting, authentication failures
3. **Data Errors**: Invalid responses, missing data, parsing errors

### **Error Recovery**

- **Automatic retry** for transient failures
- **Graceful degradation** to mock data when needed
- **User-friendly error messages** with recovery options
- **Fallback mechanisms** for critical functionality

## 📱 Mobile Responsiveness

### **Responsive Design**

- **Mobile-first approach** for all components
- **Touch-friendly interfaces** for mobile users
- **Responsive data tables** with horizontal scrolling
- **Optimized layouts** for small screens

## 🔧 Development & Testing

### **Mock Data Mode**

When SAGE credentials are not configured, the system automatically falls back to mock data:

```typescript
// Mock data includes realistic aviation business scenarios
- Student training fees
- Aircraft rental income
- Fuel and maintenance expenses
- Customer and supplier records
```

### **Testing OAuth2 Flow**

1. **Local Development**: Use localhost redirect URIs
2. **Test Credentials**: Create test SAGE application
3. **Mock Responses**: Test with mock API responses
4. **Error Scenarios**: Test various error conditions

## 📈 Performance Optimization

### **Data Loading Strategies**

- **Lazy loading** for large datasets
- **Pagination** for transaction lists
- **Debounced search** for account filtering
- **Optimistic updates** for better perceived performance

### **Caching Strategy**

- **Intelligent cache invalidation** based on data type
- **Background synchronization** for real-time updates
- **Efficient query patterns** to minimize API calls
- **Smart prefetching** for likely user actions

## 🔮 Future Enhancements

### **Planned Features**

1. **Real-time notifications** for financial events
2. **Advanced reporting** with custom date ranges
3. **Data export** to Excel/PDF formats
4. **Multi-company support** for larger organizations
5. **Audit logging** for compliance requirements

### **Integration Opportunities**

1. **Payment gateway integration** for online payments
2. **Banking API integration** for real-time balances
3. **Tax calculation** and reporting features
4. **Budget planning** and variance analysis

## 📞 Support & Troubleshooting

### **Common Issues**

1. **OAuth2 Connection Failed**: Check credentials and redirect URIs
2. **Data Not Loading**: Verify company ID and permissions
3. **Token Expired**: Check refresh token configuration
4. **API Rate Limits**: Implement proper request throttling

### **Getting Help**

- **Check browser console** for detailed error messages
- **Verify environment variables** are properly set
- **Test OAuth2 flow** in SAGE developer console
- **Review network requests** for API communication issues

## 📋 Compliance & Legal

### **Data Privacy**

- **GDPR compliance** for EU users
- **Data retention policies** for financial records
- **User consent** for data access
- **Secure data transmission** and storage

### **Financial Regulations**

- **Audit trail maintenance** for financial transactions
- **Data integrity** and accuracy requirements
- **Compliance reporting** capabilities
- **Secure access controls** for sensitive data

---

This integration provides PMB Aero Club with enterprise-grade financial management capabilities while maintaining security, performance, and user experience standards.
