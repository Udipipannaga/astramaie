# 🔐 SECURE CREDENTIALS - PRIVATE

⚠️ **IMPORTANT: DELETE THIS FILE BEFORE DEPLOYMENT!**

---

## Admin Dashboard Password

**Password:** `astramaie2024`

**Access:** Click "Admin" button in the header navigation

**Features:**
- View and manage client workflows
- View job applications
- Publish workflows to clients
- View workflow details and descriptions

---

## Internal Company Dashboard Credentials

**Access:** Go to `/company` URL directly (not linked on public site)

### Admin Account
- **Username:** `admin`
- **Password:** `astramaie2024`
- **Role:** Admin (Full access)

### Manager Account
- **Username:** `manager`
- **Password:** `manager2024`
- **Role:** Manager (Management access)

### Team Member Account
- **Username:** `team`
- **Password:** `team2024`
- **Role:** Team Member (Basic access)

---

## Security Notes

1. **Passwords Removed from Website:** ✅
   - Admin login page no longer shows password
   - Company login page no longer shows credentials
   - Only you have access to these credentials now

2. **Change Passwords for Production:**
   - Admin password is in `/components/AdminLogin.tsx` (line 24)
   - Company passwords are in `/components/CompanyLogin.tsx` (lines 10-14)
   - Replace with strong, unique passwords before going live

3. **Better Security for Production:**
   - Move authentication to backend (Supabase Auth)
   - Use environment variables for secrets
   - Implement proper user management
   - Add password hashing
   - Enable 2FA for admin access

4. **Delete This File:**
   - Remove `/SECURE_CREDENTIALS.md` before deployment
   - Don't commit to public repositories
   - Store passwords in a password manager

---

## Quick Access Guide

### For You (Owner):
- **Public Website:** Main URL
- **Admin Dashboard:** Click "Admin" in header → Use password `astramaie2024`
- **Company Dashboard:** Navigate to `/company` → Use any account above

### For Team Members:
- **Company Dashboard Only:** Navigate to `/company` 
- Give them username/password based on their role
- They cannot access Admin Dashboard (different system)

---

**Remember:** These are demo credentials for development. Use proper authentication in production!
