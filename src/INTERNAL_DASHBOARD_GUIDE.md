# Astramaie - Internal Company Dashboard Guide

## 🏢 Overview

The **Internal Company Dashboard** is a separate, secure dashboard for your team members (employees) to view analytics, workflows, contacts, and service requests. This is **completely independent** from the public website and admin dashboard.

## 🔐 Access & Security

### How to Access

**URL**: Access the internal dashboard at `/InternalDashboard.tsx` route

**Not Linked**: This dashboard is NOT linked from the public website for security reasons.

### User Credentials

Three user roles are pre-configured:

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| `admin` | `astramaie2024` | Admin | Full access |
| `manager` | `manager2024` | Manager | Full access |
| `team` | `team2024` | Team Member | Full access |

**To Change Credentials**: Edit `/components/CompanyLogin.tsx` (line 11-15)

```typescript
const COMPANY_USERS = [
  { username: "admin", password: "astramaie2024", role: "Admin" },
  { username: "manager", password: "manager2024", role: "Manager" },
  { username: "team", password: "team2024", role: "Team Member" },
  // Add more users here
];
```

---

## ✨ Features

### 1. **Dashboard Overview**

**Stats Cards:**
- 📊 Total Workflows (published + drafts)
- 📧 Total Contacts (with weekly breakdown)
- 💬 Service Requests (pending responses)
- 📈 Newsletter Subscribers (total count)

**Real-time Data:**
- All data fetches from same Supabase backend
- Refresh button to reload data
- Auto-loads on dashboard open

---

### 2. **Workflows Tab** ⚡

**View All Client Workflows:**
- See both published and draft workflows
- Published workflows (green badge with checkmark)
- Draft workflows (yellow badge with clock icon)

**Information Displayed:**
- Workflow name and description
- Category and tags
- Node count (automation steps)
- View and use metrics
- Creation timestamp

**Status Badges:**
- 🟢 **Published** = Live on public website
- 🟡 **Draft** = Work in progress, not public

**Filtering:**
- View published count
- View draft count
- See all workflows at once

---

### 3. **Contacts Tab** 📧

**View Contact Form Submissions:**
- Name and email of contact
- Full message content
- Submission timestamp
- "New" badge for recent contacts

**Use Cases:**
- Review client inquiries
- Track communication
- Monitor lead generation
- Identify urgent requests

**Displayed Information:**
- Contact name
- Email address
- Full message text
- Date and time received

---

### 4. **Service Requests Tab** 💬

**View Detailed Service Requests:**
- Client name, email, and company
- Service type requested
- Full project description
- Budget range
- Timeline requirements
- Submission date

**Use Cases:**
- Review project requirements
- Assess budget and timeline
- Plan resource allocation
- Track incoming projects

---

### 5. **Analytics Tab** 📊

**Four Analytics Cards:**

1. **Workflow Performance**
   - Top 5 most viewed workflows
   - View counts per workflow
   - Ranked by popularity

2. **Category Distribution**
   - Workflows grouped by category
   - Count per category
   - See which automation types are most common

3. **Recent Activity (Last 7 Days)**
   - New contacts count
   - New workflows created
   - New service requests
   - Weekly performance snapshot

4. **Quick Stats**
   - Total workflow views (all time)
   - Total workflow uses (all time)
   - Average workflow steps
   - Overall metrics

---

## 🎯 User Roles

### Admin
- **Username**: `admin`
- **Password**: `astramaie2024`
- **Access**: Full access to all features
- **Use Case**: Company owner/administrator

### Manager
- **Username**: `manager`
- **Password**: `manager2024`
- **Access**: Full access to all features
- **Use Case**: Project managers, team leads

### Team Member
- **Username**: `team`
- **Password**: `team2024`
- **Access**: Full access to all features
- **Use Case**: Developers, designers, support staff

**Note**: Currently all roles have the same access. You can customize permissions in the future by checking the `role` prop in `CompanyDashboard.tsx`.

---

## 🚀 How to Use

### Step 1: Access Dashboard

1. Navigate to `/InternalDashboard.tsx` route (not public URL)
2. You'll see the login screen
3. Choose credentials based on your role:
   - Admin: `admin` / `astramaie2024`
   - Manager: `manager` / `manager2024`
   - Team: `team` / `team2024`

### Step 2: Login

1. Enter your username
2. Enter your password
3. Click "Login to Dashboard"
4. Welcome screen appears with your name and role

### Step 3: Navigate Dashboard

**Top Bar:**
- Company logo and dashboard title
- Your username and role displayed
- Refresh button (reload all data)
- Logout button

**Main Tabs:**
- Workflows - View all client workflows
- Contacts - View contact submissions
- Service Requests - View project requests
- Analytics - View performance metrics

### Step 4: View Data

**In Each Tab:**
- Scroll through records
- View full details in cards
- Check timestamps
- Monitor metrics

### Step 5: Logout

- Click "Logout" button in top right
- Returns to login screen
- Session cleared

---

## 🔄 Refresh Data

**Automatic:**
- Data loads when dashboard opens
- Data loads when switching tabs

**Manual:**
- Click refresh button (🔄) in top right
- All data reloads from database
- Useful for real-time updates

---

## 📱 Responsive Design

**Desktop:**
- Full 4-column layout for stats
- Multi-column analytics cards
- Optimized for large screens

**Tablet:**
- 2-column layout for stats
- Responsive card sizing
- Touch-friendly interface

**Mobile:**
- Single column layout
- Stacked cards
- Mobile-optimized navigation

---

## 🎨 Design Features

**Visual Elements:**
- Particle background animation
- Glass-morphism effects
- Gradient color schemes
- Color-coded badges
- Icon-based navigation

**Color Coding:**
- 🔵 Blue - Workflows and primary actions
- 🟣 Purple - Contacts and communication
- 🟢 Green - Service requests and success
- 🟠 Orange - Newsletter and growth metrics
- 🟡 Yellow - Drafts and pending items

---

## 🔐 Security Best Practices

### Credentials Management

**✅ DO:**
- Change default passwords immediately
- Use strong, unique passwords
- Store credentials securely
- Share credentials only with team members
- Update passwords regularly

**❌ DON'T:**
- Share credentials publicly
- Use same password for multiple accounts
- Write passwords in plain text
- Store credentials in public repos

### Access Control

**Current Setup:**
- Hardcoded credentials in `CompanyLogin.tsx`
- No database authentication (for simplicity)
- Session-based auth (logged in until logout)

**Future Enhancements:**
- Database-backed user management
- Role-based permissions (read-only, edit, admin)
- Password hashing and encryption
- Session expiration and timeouts
- Two-factor authentication (2FA)

---

## 🆚 Dashboard Comparison

### Public Website Admin Dashboard

**Purpose**: Manage website content and create workflows  
**Access**: Via shield icon (🛡️) on public website  
**Password**: `astramaie2024`  
**Features**: 
- Create workflows
- Delete workflows
- View all submissions
- Full management capabilities

### Internal Company Dashboard

**Purpose**: View analytics and monitor performance  
**Access**: Separate route `/InternalDashboard.tsx` (not linked)  
**Users**: Multiple team members (admin, manager, team)  
**Features**:
- View workflows (no editing)
- View contacts
- View service requests
- Analytics and metrics
- Read-only access (currently)

**Key Difference**: Admin dashboard is for **management**, Internal dashboard is for **monitoring**.

---

## 🔧 Customization

### Adding New Users

**Location**: `/components/CompanyLogin.tsx`

```typescript
const COMPANY_USERS = [
  { username: "admin", password: "astramaie2024", role: "Admin" },
  { username: "manager", password: "manager2024", role: "Manager" },
  { username: "team", password: "team2024", role: "Team Member" },
  // Add new user here:
  { username: "developer", password: "dev2024", role: "Developer" },
  { username: "support", password: "support2024", role: "Support" },
];
```

### Changing Passwords

**Edit the password field:**

```typescript
{ username: "admin", password: "YourNewSecurePassword123!", role: "Admin" },
```

### Customizing Roles

**You can add more role-based logic:**

```typescript
// In CompanyDashboard.tsx
{role === "Admin" && (
  <Button>Admin Only Feature</Button>
)}

{role === "Team Member" && (
  <p>Limited access notice</p>
)}
```

---

## 📊 Use Cases

### For Company Owner (Admin)

**Daily Tasks:**
- Check new contact submissions
- Review service requests
- Monitor workflow performance
- Track overall metrics

**Weekly Tasks:**
- Analyze workflow views and uses
- Review category distribution
- Check weekly activity stats
- Plan workflow creation based on demand

### For Project Managers

**Daily Tasks:**
- Check service requests for new projects
- Review contact inquiries for leads
- Monitor workflow status (published vs draft)
- Track team progress

**Weekly Tasks:**
- Analyze project pipeline
- Report on workflow completion
- Review client engagement metrics

### For Team Members

**Daily Tasks:**
- View assigned workflows
- Check workflow details and tags
- Monitor workflow metrics
- Reference client information

**Weekly Tasks:**
- Review completed workflows
- Check performance metrics
- Identify improvement areas

---

## 🐛 Troubleshooting

### Can't Login

**Check:**
1. Username is correct (case-sensitive)
2. Password is correct (case-sensitive)
3. Credentials match those in `CompanyLogin.tsx`

**Solution:**
- Verify credentials in code
- Clear browser cache
- Try different browser

### Data Not Loading

**Check:**
1. Internet connection active
2. Supabase backend running
3. No console errors

**Solution:**
- Click refresh button
- Check browser console for errors
- Verify API endpoints working

### Dashboard Not Appearing

**Check:**
1. Logged in successfully
2. No JavaScript errors
3. Route is correct

**Solution:**
- Logout and login again
- Refresh browser page
- Check console for errors

---

## 🚀 Future Enhancements

### Potential Features

1. **Real-time Updates**
   - WebSocket integration
   - Live data streaming
   - Instant notifications

2. **Advanced Analytics**
   - Charts and graphs
   - Trend analysis
   - Predictive insights

3. **Role-Based Permissions**
   - Admin can manage workflows
   - Manager can view all data
   - Team can view assigned workflows only

4. **Export Functionality**
   - Export contacts to CSV
   - Export service requests
   - Download analytics reports

5. **Search & Filter**
   - Search workflows by name
   - Filter contacts by date
   - Sort service requests by budget

6. **Notifications**
   - New contact alerts
   - New service request notifications
   - Workflow milestone alerts

7. **Collaboration Tools**
   - Internal notes on workflows
   - Task assignment
   - Team comments

8. **Mobile App**
   - Native mobile dashboard
   - Push notifications
   - Offline access

---

## 📝 Summary

**What You Have:**
- ✅ Secure internal dashboard for team
- ✅ Multiple user login system
- ✅ View workflows, contacts, services
- ✅ Analytics and metrics
- ✅ Responsive design
- ✅ Refresh functionality
- ✅ Separate from public website

**How to Access:**
- 🔑 Use credentials: `admin`/`astramaie2024`, `manager`/`manager2024`, or `team`/`team2024`
- 🌐 Navigate to `/InternalDashboard.tsx` route
- 👥 Perfect for team collaboration and monitoring

**Security:**
- 🔒 Not linked from public website
- 🔐 Password protected
- 👤 Multiple user support
- 🚫 Separate from admin dashboard

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│  INTERNAL COMPANY DASHBOARD             │
├─────────────────────────────────────────┤
│  Access: /InternalDashboard.tsx         │
│                                         │
│  CREDENTIALS:                           │
│  • admin / astramaie2024 (Admin)        │
│  • manager / manager2024 (Manager)      │
│  • team / team2024 (Team Member)        │
│                                         │
│  FEATURES:                              │
│  ⚡ Workflows - View all workflows      │
│  📧 Contacts - View submissions         │
│  💬 Services - View requests            │
│  📊 Analytics - View metrics            │
│                                         │
│  CONTROLS:                              │
│  🔄 Refresh - Reload data               │
│  🚪 Logout - End session                │
└─────────────────────────────────────────┘
```

**Your internal team dashboard is ready for collaboration!** 🎉
