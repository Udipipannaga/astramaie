# Astramaie Website - Backend Guide

## Overview

Your Astramaie AI automation agency website now has a fully functional backend powered by Supabase. The backend handles contact forms, newsletter subscriptions, service requests, and provides an admin dashboard for managing all submissions.

## 🔐 Security

### Admin Authentication
The admin dashboard is now **password protected**:

- **Default Password**: `astramaie2024`
- **Location to Change**: `/components/AdminLogin.tsx` (line 18)
- **Session**: Authentication persists during browser session
- **Access**: Click shield icon → Enter password → Access granted

**To Change Password**:
1. Open `/components/AdminLogin.tsx`
2. Find line: `const ADMIN_PASSWORD = "astramaie2024";`
3. Change to your secure password
4. Save the file

**⚠️ Important Security Notes**:
- This is **client-side password protection** suitable for prototyping
- For production, implement **server-side authentication** with user accounts
- Consider using Supabase Auth for proper user management
- Never commit passwords to version control

## Features

### 1. **Contact Form System**
- Full contact form with name, email, company, service selection, and message
- Email validation
- Real-time form submission with toast notifications
- Status tracking (new, in-progress, completed)

### 2. **Newsletter Subscriptions**
- Email collection for newsletter signups
- Duplicate email prevention
- Active status tracking

### 3. **Service Requests**
- Detailed service request forms
- Budget and timeline tracking
- Service type categorization
- Description field for project details

### 4. **Admin Dashboard**
- Real-time statistics and analytics
- View all contact submissions
- View all newsletter subscriptions
- View all service requests
- Status management
- Last 7 days activity tracking

## How to Use

### For Website Visitors

#### Newsletter Signup
1. Scroll to the "Get Started" section (bottom of homepage)
2. Enter your email address
3. Click "Get Started"
4. You'll see a success message confirming subscription

#### Contact Form
1. Click "Get Started" button in the header (or anywhere on the site)
2. Fill out the contact form with:
   - Name (required)
   - Email (required)
   - Company (optional)
   - Service Interest (optional)
   - Message (required)
3. Click "Send Message"
4. You'll receive a confirmation toast notification

### For Admin/Agency Owner

#### Access Admin Dashboard
1. Click the shield icon (🛡️) in the header
2. The dashboard will open showing:
   - **Total Contacts**: All contact form submissions
   - **Newsletter Subs**: All newsletter subscriptions
   - **Service Requests**: All detailed service requests
   - **Recent Activity**: Submissions from the last 7 days

#### View Submissions
- **Contacts Tab**: See all contact form messages with status badges
- **Newsletter Tab**: View all email subscribers
- **Services Tab**: Review detailed service requests with budgets and timelines

#### Refresh Data
- Click the refresh icon (↻) in the dashboard header to reload all data

## API Endpoints

All endpoints are prefixed with: `https://${projectId}.supabase.co/functions/v1/make-server-bae0b22c`

### Public Endpoints

#### Submit Contact Form
```
POST /contact
Body: {
  name: string (required)
  email: string (required)
  company?: string
  message: string (required)
  service?: string
}
```

#### Subscribe to Newsletter
```
POST /newsletter
Body: {
  email: string (required)
  name?: string
}
```

#### Submit Service Request
```
POST /service-request
Body: {
  name: string (required)
  email: string (required)
  company?: string
  service: string (required)
  budget?: string
  timeline?: string
  description?: string
}
```

### Admin Endpoints

#### Get All Contacts
```
GET /admin/contacts
Returns: { success: true, contacts: [], count: number }
```

#### Get All Newsletter Subscriptions
```
GET /admin/newsletter
Returns: { success: true, subscriptions: [], count: number }
```

#### Get All Service Requests
```
GET /admin/service-requests
Returns: { success: true, requests: [], count: number }
```

#### Get Statistics
```
GET /admin/stats
Returns: {
  success: true,
  stats: {
    totalContacts: number,
    totalNewsletters: number,
    totalServices: number,
    newContacts: number,
    pendingServices: number,
    recentContacts: number
  }
}
```

#### Update Contact Status
```
PATCH /admin/contacts/:id
Body: { status: string }
```

## Data Storage

All data is stored in Supabase's key-value store with the following prefixes:

- **Contacts**: `contact_{timestamp}_{random}`
- **Newsletters**: `newsletter_{email_sanitized}`
- **Service Requests**: `service_{timestamp}_{random}`

## Security Features

- Email validation on all forms
- Duplicate prevention for newsletter subscriptions
- CORS enabled for cross-origin requests
- Error logging for debugging
- Input sanitization

## Components

### Frontend Components

1. **ContactModal** (`/components/ContactModal.tsx`)
   - Beautiful animated modal
   - Form validation
   - Loading states
   - Toast notifications

2. **AdminDashboard** (`/components/AdminDashboard.tsx`)
   - Full-screen dashboard overlay
   - Tabbed interface
   - Real-time data refresh
   - Statistics cards

3. **CTA3D** (`/components/CTA3D.tsx`)
   - Newsletter signup integration
   - Form submission handling

### Backend Files

1. **Server** (`/supabase/functions/server/index.tsx`)
   - Hono web server
   - All API routes
   - Error handling
   - CORS configuration

2. **API Client** (`/utils/api.ts`)
   - Type-safe API calls
   - Error handling
   - Centralized endpoint management

## Testing the Backend

1. **Test Newsletter Signup**:
   - Enter an email in the bottom CTA section
   - Click "Get Started"
   - Open Admin Dashboard to verify

2. **Test Contact Form**:
   - Click "Get Started" in header
   - Fill out the form
   - Submit and check Admin Dashboard

3. **View Analytics**:
   - Open Admin Dashboard
   - Check the stats cards at the top
   - Navigate between tabs to see different submission types

## Future Enhancements

Possible additions for production:

1. **Email Notifications**: Send emails when forms are submitted
2. **Authentication**: Add login system for admin access
3. **Export Data**: CSV export for submissions
4. **Response System**: Reply to contacts directly from dashboard
5. **Advanced Analytics**: Charts and graphs for submissions over time
6. **Email Templates**: Automated response emails
7. **CRM Integration**: Connect to HubSpot, Salesforce, etc.

## Important Notes

⚠️ **Figma Make is for prototyping**: This implementation is perfect for demonstrations and prototypes. For production use with sensitive data, consider:

- Adding authentication to admin routes
- Implementing rate limiting
- Adding spam protection (CAPTCHA)
- Setting up email notifications
- Deploying to your own secure infrastructure
- Implementing GDPR compliance features

## Support

All backend functionality is now live and working! The system automatically:
- Stores all form submissions
- Validates email addresses
- Prevents duplicate newsletter subscriptions
- Provides real-time statistics
- Enables easy management through the admin dashboard

Enjoy your fully functional AI automation agency website! 🚀

## Workflow System

### Overview

The workflow system allows you to **create custom automation workflows for clients** in the admin dashboard. When published, these workflows automatically appear on the public website in the "Custom Workflows" section for clients to view.

### Workflow Process

1. **Client Requests** - Client contacts you for automation
2. **Admin Creates** - You create workflow in admin dashboard
3. **Published** - Workflow appears on public website
4. **Client Views** - Client sees their custom workflow showcased

### Public Workflow Showcase

**Location**: Between Services and 3D Model sections on homepage

**Visibility**:
- Only **Published** workflows appear (drafts hidden)
- Automatically fetches from database
- Section hidden if no published workflows

**Features**:
- Category filtering (All, Email Automation, Chatbot, Data Processing, CRM, Social Media, Analytics, Custom)
- Beautiful card layout with icons
- View counts and metrics
- Client tags displayed
- "Request Custom Workflow" CTA button

### Creating Workflows (Admin)

**Access**: Admin Dashboard → Workflows Tab → "Create New Workflow"

**Required Fields**:
- **Client Name** - Who this workflow is for (e.g., "Acme Corp")
- **Workflow Name** - Title of the automation (e.g., "Email Lead Nurture")

**Optional Fields**:
- **Description** - What the workflow does
- **Category** - Email, Chatbot, Data, CRM, Social, Analytics, Custom
- **Tags** - Comma-separated keywords
- **Published** - Checkbox to make visible on public site

**Example**:
```
Client Name: Tech Startup Inc.
Workflow Name: Customer Onboarding Bot
Description: Automated chatbot that guides new customers through setup
Category: AI Chatbot
Tags: onboarding, customer-success, automation
Published: ✅ Yes
```

**Result**: Workflow appears in public showcase with chatbot icon and category badge.

### Workflow Categories & Icons

Each category has a unique icon and label:

| Category | Icon | Label |
|----------|------|-------|
| email-automation | 📧 | Email Automation |
| data-processing | ⚙️ | Data Processing |
| chatbot | 🤖 | AI Chatbot |
| crm-integration | 📊 | CRM Integration |
| social-media | 📱 | Social Media |
| analytics | 📈 | Analytics |
| custom | ✨ | Custom Solution |

### Draft vs Published

**Draft Workflows**:
- ❌ Not visible on public website
- ✅ Visible only in admin dashboard
- 🟡 Yellow "Draft" badge in admin
- **Use for**: Work in progress, pending client approval

**Published Workflows**:
- ✅ Visible on public website showcase
- ✅ Visible in admin dashboard
- 🟢 Green "Published" badge in admin
- **Use for**: Completed workflows ready to showcase

### Managing Workflows

**In Admin Dashboard**:
- **View All** - See all workflows (draft and published)
- **Create** - Add new client workflow
- **Delete** - Remove workflow (with confirmation)
- **Track Metrics** - Views, uses, engagement

**Displayed Information**:
- Workflow name and description
- Category and tags
- Published/draft status
- Client name (in tags)
- Number of nodes/steps
- View and use counts
- Creation date