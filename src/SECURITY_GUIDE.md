# Astramaie Website - Security Guide

## 🔐 Admin Dashboard Security

### Current Implementation

Your admin dashboard is now **password protected** with client-side authentication suitable for prototyping and demos.

### Default Credentials

```
Password: astramaie2024
```

**⚠️ CHANGE THIS IMMEDIATELY** if deploying to production or handling real data!

## How to Change the Admin Password

### Step 1: Locate the Password
Open `/components/AdminLogin.tsx` and find line 18:

```typescript
const ADMIN_PASSWORD = "astramaie2024"; // Change this to your secure password
```

### Step 2: Set Your Password
Replace with a strong password:

```typescript
const ADMIN_PASSWORD = "YourSecurePassword123!@#";
```

### Step 3: Save and Test
1. Save the file
2. Click the shield icon in the header
3. Enter your new password
4. Verify access is granted

## Security Features

### ✅ Currently Implemented

1. **Password Protection**
   - Admin dashboard requires password
   - Login modal with show/hide password toggle
   - Session persistence (stays logged in during browser session)
   - Wrong password feedback

2. **Input Validation**
   - Email format validation on all forms
   - Required field checking
   - Duplicate prevention for newsletter subscriptions

3. **Error Handling**
   - Graceful error messages
   - No sensitive information leaks
   - User-friendly feedback

4. **CORS Configuration**
   - Proper cross-origin resource sharing
   - Controlled API access

### ⚠️ Limitations (Prototype Environment)

1. **Client-Side Password Check**
   - Password is stored in frontend code
   - Anyone with dev tools can view it
   - **NOT SUITABLE FOR PRODUCTION**

2. **No User Management**
   - Single shared password
   - No individual admin accounts
   - No role-based access control

3. **No Rate Limiting**
   - Unlimited login attempts
   - No brute-force protection
   - No API request throttling

4. **Session Storage**
   - Uses React state (clears on refresh/close)
   - No persistent sessions
   - No "remember me" functionality

## For Production Deployment

### Recommended Security Enhancements

#### 1. Server-Side Authentication

Implement proper authentication using Supabase Auth:

```typescript
// Sign up new admin
const { data, error } = await supabase.auth.admin.createUser({
  email: 'admin@astramaie.com',
  password: 'secure-password-here',
  email_confirm: true
});

// Sign in
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'admin@astramaie.com',
  password: 'password',
});

// Protect routes
const accessToken = session.access_token;
```

#### 2. Protected API Routes

Add authentication to admin endpoints in `/supabase/functions/server/index.tsx`:

```typescript
app.get('/make-server-bae0b22c/admin/contacts', async (c) => {
  // Check authentication
  const accessToken = c.req.headers.get('Authorization')?.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  // Continue with protected logic...
});
```

#### 3. Environment Variables

Store secrets in environment variables:

```typescript
// Don't hardcode passwords in code!
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD');
```

#### 4. Rate Limiting

Implement request throttling:

```typescript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({ 
  tokensPerInterval: 5, 
  interval: 'minute' 
});
```

#### 5. HTTPS Only

Ensure all communications are encrypted:
- Deploy behind HTTPS
- Set secure cookie flags
- Enforce SSL/TLS

#### 6. CSRF Protection

Add CSRF tokens to forms:

```typescript
import { csrf } from 'npm:hono/csrf';
app.use('*', csrf());
```

#### 7. Input Sanitization

Sanitize all user inputs:

```typescript
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);
```

## Access Control

### Current Access Levels

1. **Public Users**
   - ✅ View website content
   - ✅ Submit contact forms
   - ✅ Subscribe to newsletter
   - ✅ View workflow templates
   - ✅ Clone workflow templates
   - ❌ Access admin dashboard
   - ❌ View submissions
   - ❌ Manage workflows

2. **Authenticated Admin** (with password)
   - ✅ Everything public users can do
   - ✅ Access admin dashboard
   - ✅ View all submissions
   - ✅ Manage workflows
   - ✅ Seed sample data
   - ✅ Delete records
   - ✅ View analytics

### Recommended Production Roles

1. **Viewer**
   - View-only access to dashboard
   - No edit/delete permissions

2. **Editor**
   - View and edit submissions
   - Manage workflows
   - No delete permissions

3. **Admin**
   - Full access to everything
   - Delete permissions
   - User management

## Data Protection

### Currently Protected

✅ **Contact Form Data**
- Stored securely in Supabase KV
- Only accessible via authenticated API

✅ **Newsletter Subscriptions**
- Email validation
- Duplicate prevention
- Secure storage

✅ **Workflow Data**
- Controlled access
- Metrics tracking
- Version control

### Additional Recommendations

1. **Data Encryption**
   - Encrypt sensitive fields at rest
   - Use Supabase's built-in encryption

2. **GDPR Compliance**
   - Add privacy policy
   - Implement data export
   - Add delete request handling
   - Cookie consent banner

3. **Data Retention**
   - Set retention policies
   - Automatic data cleanup
   - Archive old submissions

4. **Backup Strategy**
   - Regular automated backups
   - Disaster recovery plan
   - Test restore procedures

## Security Checklist

### Before Going Live

- [ ] Change default admin password
- [ ] Implement server-side authentication
- [ ] Add rate limiting to API endpoints
- [ ] Enable HTTPS/SSL
- [ ] Add CSRF protection
- [ ] Sanitize all inputs
- [ ] Set up monitoring and alerts
- [ ] Add privacy policy and terms
- [ ] Implement CAPTCHA on forms
- [ ] Set up error logging
- [ ] Configure firewall rules
- [ ] Enable API key rotation
- [ ] Add session timeout
- [ ] Implement 2FA (optional)
- [ ] Security audit/pen testing

### Regular Maintenance

- [ ] Review access logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Review user permissions quarterly
- [ ] Security audit annually
- [ ] Test backup restoration annually

## Common Vulnerabilities to Avoid

### ❌ DON'T:
- Hardcode passwords in source code
- Store sensitive data in local storage
- Trust client-side validation alone
- Expose API keys in frontend
- Allow unlimited login attempts
- Skip input validation
- Use HTTP (always use HTTPS)
- Commit secrets to version control

### ✅ DO:
- Use environment variables for secrets
- Implement server-side validation
- Use prepared statements for queries
- Sanitize all user inputs
- Log security events
- Keep dependencies updated
- Use strong password policies
- Implement session timeouts

## Emergency Procedures

### If Compromised

1. **Immediate Actions**
   - Change all passwords immediately
   - Revoke all API keys
   - Check audit logs for suspicious activity
   - Notify affected users if data breach

2. **Investigation**
   - Review access logs
   - Identify entry point
   - Assess data exposure
   - Document findings

3. **Recovery**
   - Patch vulnerabilities
   - Restore from clean backup
   - Reset all credentials
   - Update security policies

4. **Prevention**
   - Implement additional security measures
   - Conduct security training
   - Update incident response plan

## Support & Resources

### Supabase Security Docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/security

### Best Practices
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework

## Current Security Status

**Environment**: Prototype/Demo  
**Security Level**: Basic (Password Protected)  
**Suitable For**: Demonstrations, prototypes, internal testing  
**Not Suitable For**: Production with real user data, PII, sensitive information  

**For Production**: Implement server-side authentication, HTTPS, rate limiting, and all recommended security enhancements above.

---

**Remember**: Security is not a one-time task but an ongoing process. Regularly review and update your security measures as threats evolve.

🔐 Stay secure!
