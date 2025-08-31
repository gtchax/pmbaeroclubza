# GitHub Actions CI/CD Setup

This directory contains GitHub Actions workflows for automated testing and deployment.

## Workflows

### 1. CI - Build and Test (`ci.yml`)
**Triggers:** Push to `main`/`develop` branches, Pull Requests to these branches

**What it does:**
- ✅ **Linting & Type Check**: Runs ESLint and TypeScript compiler
- ✅ **Clean Build**: Performs a clean build using `pnpm build:clean`
- ✅ **Database Setup**: Sets up PostgreSQL for Prisma integration
- ✅ **Security Audit**: Runs `pnpm audit` for vulnerability checking
- ✅ **Build Validation**: Verifies that build artifacts are created correctly

### 2. Quick Validation (`validate.yml`)
**Triggers:** Push to `feature/*` branches, Pull Request updates

**What it does:**
- ✅ **Fast Linting**: Quick ESLint check
- ✅ **Type Checking**: TypeScript validation without full compilation
- ✅ **Dependency Check**: Ensures all dependencies install correctly

## Required GitHub Secrets

For the CI workflow to work properly with Clerk authentication, add these secrets to your repository:

```
CLERK_SECRET_KEY                    # Your Clerk secret key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   # Your Clerk publishable key
```

**How to add secrets:**
1. Go to your GitHub repository
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with the exact names above

## Environment Variables

The workflows use these environment variables:
- `DATABASE_URL`: Set to test PostgreSQL instance
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry
- `CLERK_*`: Authentication keys (from secrets)

## Customization

### Adding Tests
To enable the test job in `ci.yml`:
1. Add your test script to `package.json`
2. Change `if: false` to `if: true` in the test job
3. Update the test command from `pnpm test` to match your setup

### Adding More Environments
You can add deployment workflows by creating additional `.yml` files:
- `deploy-staging.yml` - Deploy to staging on develop branch
- `deploy-production.yml` - Deploy to production on main branch

### Adjusting Branch Strategy
Current setup assumes:
- `main` - Production branch
- `develop` - Development branch  
- `feature/*` - Feature branches

Update branch names in workflow files if your strategy differs.

## Troubleshooting

### Common Issues

**1. Build fails with Prisma errors**
- Ensure `DATABASE_URL` is properly set in the workflow
- Check that your schema.prisma file is valid

**2. Clerk authentication errors**
- Verify that GitHub secrets are set correctly
- Check that secret names match exactly (case-sensitive)

**3. pnpm version mismatch**
- Update the pnpm version in workflows to match `packageManager` in package.json

**4. Node version issues**
- Ensure Node version in workflow matches your local development version
- Update `node-version` in workflow files if needed

### Viewing Workflow Results

1. Go to your GitHub repository
2. Click the "Actions" tab
3. Select a workflow run to see detailed logs
4. Each job shows individual step results

## Best Practices

- Keep workflows focused and fast
- Use caching for dependencies (`cache: 'pnpm'`)
- Set appropriate timeouts for each job
- Use `continue-on-error: true` for non-critical steps
- Keep secrets secure and rotate them regularly
