# Astramaie - AI Automation Agency Website

## 🚀 Overview

A fully functional, 3D animated website for Astramaie AI automation agency featuring:
- **Modern 3D Design** with particle effects and animations
- **Complete Backend** with Supabase integration
- **Custom Workflow Creation & Showcase** - Build workflows for clients and display them
- **Password-Protected Admin Dashboard** for managing all submissions
- **Contact Forms & Newsletter** with real-time submissions

## ✨ Features

### 1. **3D Interactive Design**
- Particle background with animated geometric shapes
- Smooth scroll navigation between sections
- Glass-morphism effects throughout
- Interactive 3D model viewer
- Motion animations powered by Motion/React
- Custom green ninja blade/shuriken logo

### 2. **Backend & Database** 
- **Contact Form System** - Collect and manage client inquiries
- **Newsletter Subscriptions** - Email collection with duplicate prevention
- **Service Requests** - Detailed request tracking with budgets and timelines
- **Real-time Analytics** - Track submissions, views, and engagement
- **Supabase Integration** - Secure data storage and API

### 3. **Custom Workflow System** ⭐
- **Admin Creates** - Build custom workflows per client request in admin dashboard
- **Client Receives** - Published workflows appear on public showcase section
- **Professional Display** - Beautiful cards with category filtering
- **Client Name Tracking** - Tag workflows with client names
- **Category Organization** - Email, Chatbot, Data Processing, CRM, Social Media, Analytics, Custom
- **Draft/Published Status** - Control workflow visibility
- **Metrics Tracking** - Views and engagement stats
- **Full Management** - Create, edit, delete client workflows

### 4. **Admin Dashboard** 🔐
- **Password Protected** (Default: `astramaie2024`)
- View all contact submissions
- Manage newsletter subscriptions
- Track service requests
- **Create & manage client workflows**
- Real-time statistics and analytics
- Responsive design  

### 5. **Internal Company Dashboard** 🏢
- **Separate dashboard for team members** (not linked to public site)
- **Multiple user logins** (Admin, Manager, Team)
- View workflows, contacts, and service requests
- **Analytics & performance metrics**
- Real-time data monitoring
- Secure team collaboration
- Read-only view (monitoring focus)

### 6. **Careers Section** 💼
- **Job postings** for AI/ML Engineers and other positions
- **Job application form** with detailed requirements
- Professional job listings with:
  - Responsibilities and requirements
  - Nice-to-have skills
  - Benefits and perks
  - Company culture highlights
- Application submissions stored in database
- Admin can view applications in dashboard

## 📚 Documentation

- **[BACKEND_GUIDE.md](BACKEND_GUIDE.md)** - Complete backend documentation
  - All API endpoints
  - Contact forms
  - Newsletter system
  - Service requests
  - Workflow API
  - Admin features

- **[WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md)** - Complete workflow system guide
  - Step-by-step workflow creation
  - Publishing workflows to website
  - Client delivery process
  - Best practices
  - Examples and templates

- **[INTERNAL_DASHBOARD_GUIDE.md](INTERNAL_DASHBOARD_GUIDE.md)** - Internal team dashboard guide
  - Team member access
  - Multiple user logins
  - Analytics and monitoring
  - Use cases and workflows
  - Security best practices

- **[SECURITY_GUIDE.md](SECURITY_GUIDE.md)** - Security documentation
  - Authentication setup
  - Password management
  - Production recommendations
  - Security checklist

## Quick Links

- 📖 [System Overview](SYSTEM_OVERVIEW.md) - Complete architecture and user guide
- 🔐 [Security Guide](SECURITY_GUIDE.md) - Admin security and authentication
- 📡 [Backend Documentation](BACKEND_GUIDE.md) - API and database
- ⚡ [Workflow System Guide](WORKFLOW_GUIDE.md) - Creating and managing workflows
- 🏢 [Internal Dashboard Guide](INTERNAL_DASHBOARD_GUIDE.md) - Team collaboration dashboard

**Default Admin Password**: `astramaie2024` (Change in `/components/AdminLogin.tsx`)
**Internal Dashboard Credentials**: See [INTERNAL_DASHBOARD_GUIDE.md](INTERNAL_DASHBOARD_GUIDE.md)

## 🎯 Quick Start

### For Website Visitors (Your Clients)

1. **Explore Services**
   - Scroll through the beautiful 3D website
   - View your services and capabilities
   - See the 3D model showcase

2. **View Custom Workflows**
   - Scroll to "Custom Workflows" section
   - See workflows you've created for other clients
   - Filter by category (Email, Chatbot, Data, etc.)
   - Click "Request Custom Workflow" to get started

3. **Get in Touch**
   - Click "Get Started" button for contact form
   - Subscribe to newsletter
   - Submit detailed service request

### For You (Admin/Agency Owner) 🔐

**Access Admin Dashboard:**
1. Click the shield icon (🛡️) in the website header
2. Enter password: `astramaie2024`
3. Dashboard opens with full management access

**What You Can Do:**
- ✅ Create custom workflows for clients
- ✅ Publish workflows to website
- ✅ View all contact submissions
- ✅ Manage newsletter subscribers
- ✅ Review service requests
- ✅ Delete workflows
- ✅ View real-time statistics

### For Your Team Members (Internal Dashboard) 🏢

**Access Internal Dashboard:**
1. Navigate to `/InternalDashboard.tsx` route (separate page)
2. Choose your credentials:
   - **Admin**: `admin` / `astramaie2024`
   - **Manager**: `manager` / `manager2024`
   - **Team**: `team` / `team2024`
3. Login to view analytics and data

**What Team Can Do:**
- 📊 View all workflows (read-only)
- 📧 View contact submissions
- 💬 View service requests
- 📈 View analytics and metrics
- 🔄 Refresh data in real-time
- 👥 Collaborate with visibility

**Key Difference:**
- **Admin Dashboard** = Create & Manage (for you)
- **Internal Dashboard** = View & Monitor (for team)

### For You (Admin/Agency Owner)

1. **Access Admin Dashboard** 🔐
   - Click the shield icon (🛡️) in the header
   - Enter password: `astramaie2024`
   - Dashboard opens with full access

2. **When Client Requests Workflow**
   - Check **Contacts** or **Services** tab for client request
   - Go to **Workflows** tab
   - Click "Create New Workflow"

3. **Create & Publish Workflow**
   - Fill in the form:
     - **Client Name**: e.g., "Acme Corp"
     - **Workflow Name**: e.g., "Email Lead Nurture Sequence"
     - **Description**: What the workflow does
     - **Category**: Select appropriate category
     - **Tags**: Add relevant tags + client name auto-included
     - **Published**: ✅ Check to make visible on website
   - Click "Create Workflow"
   - Done! Workflow now appears on public website

4. **Manage Everything**
   - **Contacts Tab**: View all contact form submissions
   - **Newsletter Tab**: See email subscribers
   - **Services Tab**: Review detailed service requests
   - **Workflows Tab**: Create, view, edit, delete client workflows
   - **Overview**: See real-time statistics