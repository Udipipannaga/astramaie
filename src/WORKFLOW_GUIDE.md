# Astramaie - Workflow System Guide

## 🎯 Complete Workflow Process

This guide explains the complete workflow creation and delivery process for your Astramaie AI automation agency.

## Overview

**The System**: Create custom automation workflows for clients in your admin dashboard, then automatically showcase them on your public website.

**The Flow**:
```
Client Request → You Create → Publish → Client Views
```

---

## Step-by-Step Process

### Step 1: Client Requests Automation 📞

**How clients reach you:**
- Contact form submission
- Newsletter signup + inquiry
- Direct service request form

**What you see:**
- Notification in Admin Dashboard
- Contact details in Contacts/Services tab
- Client requirements and needs

---

### Step 2: You Create Custom Workflow 🛠️

**Access Admin Dashboard:**
1. Click shield icon (🛡️) in header
2. Enter password: `astramaie2024`
3. Click Workflows tab
4. Click "Create New Workflow" button

**Fill in Workflow Details:**

| Field | Required | Example | Description |
|-------|----------|---------|-------------|
| **Client Name** | ✅ Yes | "Acme Corp" | Who this workflow is for |
| **Workflow Name** | ✅ Yes | "Email Lead Nurture" | Title of the automation |
| **Description** | No | "Automated email sequence that nurtures leads..." | What the workflow does |
| **Category** | No | "Email Automation" | Type of automation |
| **Tags** | No | "email, leads, nurture" | Keywords (comma-separated) |
| **Published** | No | ✅ Checked | Make visible on website |

**Categories Available:**
- 📧 Email Automation
- ⚙️ Data Processing
- 🤖 AI Chatbot
- 📊 CRM Integration
- 📱 Social Media
- 📈 Analytics
- ✨ Custom Solution

**Draft vs Published:**
- **Draft** (unchecked): Private, only you see it in admin
- **Published** (checked): Public, appears on website

---

### Step 3: Workflow Appears on Website ✨

**When you mark as "Published":**
- Workflow automatically appears in "Custom Workflows" section
- Located between Services and 3D Model sections
- Beautiful card layout with category icons
- Fully responsive design

**What Clients See:**

```
┌─────────────────────────────────────┐
│  🤖                  [AI Chatbot]   │
│                                     │
│  Customer Onboarding Bot            │
│  Automated chatbot that guides...   │
│                                     │
│  [onboarding] [customer-success]    │
│  👁️ 0 views  ⚡ 5 steps             │
│                                     │
│  [View Details →]                   │
└─────────────────────────────────────┘
```

**Features on Public Showcase:**
- ✅ Category filtering buttons
- ✅ Search by workflow type
- ✅ View counts (tracks engagement)
- ✅ Professional card design
- ✅ Mobile responsive
- ✅ "Request Custom Workflow" CTA

---

### Step 4: Client Views Their Workflow 👀

**Client Experience:**
1. Visits your website
2. Scrolls to "Custom Workflows" section
3. Sees their workflow displayed professionally
4. Can filter by category
5. Views workflow details
6. Sees your portfolio of solutions

**Benefits:**
- ✨ Professional showcase of your work
- 🎯 Social proof for other clients
- 📊 Track engagement (view counts)
- 🚀 Builds credibility
- 💼 Live portfolio updates

---

## Admin Dashboard Management

### Viewing Workflows

**In Workflows Tab:**
- See all workflows (draft and published)
- Green "Published" badge = visible on website
- Yellow "Draft" badge = private, work in progress

**Information Displayed:**
- Client name (in tags)
- Workflow name and description
- Category and all tags
- Published/draft status
- Number of nodes/steps
- View and use counts
- Creation timestamp

### Editing Workflow Status

**To Make Draft → Published:**
- Currently: Manual recreation
- Future: Edit functionality

**To Delete Workflow:**
1. Click trash icon (🗑️) on workflow card
2. Confirm deletion
3. Workflow removed from database and website

---

## Example Workflows

### Example 1: Email Automation

```yaml
Client Name: TechStartup Inc
Workflow Name: Welcome Email Series
Description: 5-email automated sequence that welcomes new users and guides them through product features
Category: email-automation
Tags: email, onboarding, welcome, automation
Published: ✅ Yes
```

**Result**: Appears as 📧 Email Automation card on website

---

### Example 2: AI Chatbot

```yaml
Client Name: E-commerce Store
Workflow Name: 24/7 Customer Support Bot
Description: AI-powered chatbot that handles common customer questions and escalates to human when needed
Category: chatbot
Tags: customer-support, AI, chatbot, automation
Published: ✅ Yes
```

**Result**: Appears as 🤖 AI Chatbot card on website

---

### Example 3: Data Processing

```yaml
Client Name: Financial Services Co
Workflow Name: Daily Report Generator
Description: Automated data collection, processing, and report generation sent every morning at 8 AM
Category: data-processing
Tags: reports, data, automation, analytics
Published: ✅ Yes
```

**Result**: Appears as ⚙️ Data Processing card on website

---

## Public Workflow Showcase

### Section Location
Between **Services** and **3D Model** sections on homepage

### Visibility Rules
- ✅ Shows: Published workflows only
- ❌ Hides: Draft workflows
- 🚫 Section hidden if: No published workflows exist

### Category Filtering

**Filter Buttons:**
- All Workflows (shows everything)
- Email Automation
- Data Processing
- AI Chatbot
- CRM Integration
- Social Media
- Analytics
- Custom Solution

**User Experience:**
1. Client clicks category filter
2. Only workflows in that category display
3. Smooth animation transitions
4. Category count updates

### Workflow Cards

**Each Card Shows:**
- Category emoji icon (🤖 📧 ⚙️ etc.)
- Category badge (top-right)
- Workflow name (title)
- Description (truncated if long)
- Tags (max 4 shown)
- View count
- Step count
- "View Details" button

---

## Best Practices

### Creating Workflows

**✅ DO:**
- Use clear, descriptive names
- Write concise descriptions
- Choose appropriate category
- Add relevant tags including client name
- Publish when ready to showcase
- Keep drafts for work in progress

**❌ DON'T:**
- Create test workflows on production
- Leave published workflows incomplete
- Use vague or generic names
- Forget to add client name in tags
- Publish before client approval

### Tags Strategy

**Good Tags:**
- Client name: "Acme Corp"
- Function: "email", "automation", "chatbot"
- Industry: "ecommerce", "finance", "healthcare"
- Features: "AI", "scheduling", "analytics"

**Tag Examples:**
```
Acme Corp, email, leads, nurture, automation
TechCo, chatbot, support, AI, 24/7
Finance Ltd, data, reports, analytics, automated
```

### Description Writing

**Good Description:**
> "Automated email sequence that nurtures leads through a 7-day journey, providing value at each step and converting prospects into customers."

**Bad Description:**
> "Email thing"

**Formula:**
`[What it does] + [How it works] + [What it achieves]`

---

## Workflow Metrics

### Tracked Automatically

1. **Views** - How many times workflow card was seen
2. **Uses** - How many times "View Details" was clicked
3. **Creation Date** - When workflow was created

### Future Metrics (Potential)

- Conversion rate (views → inquiries)
- Category popularity
- Average view time
- Client engagement score

---

## Client Communication

### When Creating Workflow

**Email Template:**
```
Hi [Client Name],

Your custom automation workflow is ready!

Workflow: [Workflow Name]
Description: [Brief description]

You can view it live on our website at:
www.astramaie.com/#workflows

Filter by [Category] to find it, or look for the card with your company name in the tags.

Best regards,
Astramaie Team
```

### After Publishing

**Follow-up:**
- Send link to workflow showcase
- Explain how to find their workflow
- Ask for feedback
- Request testimonial if successful

---

## Troubleshooting

### Workflow Not Appearing on Website

**Check:**
1. Is "Published" checkbox checked? ✅
2. Did you refresh the website?
3. Is the workflow in admin dashboard?
4. Are there any console errors?

**Solution:**
- Re-create workflow with Published ✅
- Clear browser cache
- Check admin dashboard Workflows tab

### Wrong Category or Tags

**Current:**
- Delete and recreate workflow

**Future:**
- Edit functionality coming

### Workflow Showing to Wrong Audience

**If you want private workflow:**
- Uncheck "Published" box
- Keep as Draft
- Only you see it in admin

---

## Security & Privacy

### Draft Workflows
- ✅ 100% Private
- ❌ Never visible on public website
- 🔒 Only accessible in admin dashboard (password protected)

### Published Workflows
- ✅ Public on website
- ✅ Anyone can view
- ⚠️ Don't include sensitive client information
- 💡 Use for portfolio and social proof

### Client Names
- ✅ Safe to include if client approves
- ⚠️ Ask permission first
- 💡 Can use generic tags like "SaaS Client" instead

---

## Summary

**The Complete Flow:**

1. ✉️ Client requests automation
2. 🔐 You login to admin (shield icon)
3. ➕ Create workflow in Workflows tab
4. ✍️ Fill in all details
5. ✅ Check "Published" if ready
6. 💾 Click "Create Workflow"
7. ✨ Workflow appears on website
8. 👀 Client views their workflow
9. 📈 Track engagement metrics
10. 🎯 Convert more clients with social proof

**Key Benefits:**
- 🚀 Instant portfolio updates
- 💼 Professional showcase
- 📊 Social proof for prospects
- 🎨 Beautiful presentation
- 📱 Mobile-friendly display
- 🔐 Secure admin control

---

## Quick Reference

**Admin Password**: `astramaie2024`  
**Admin Access**: Shield icon (🛡️) in header  
**Create Workflow**: Admin → Workflows → Create New Workflow  
**Publish**: Check "Published" box in form  
**View Live**: Scroll to "Custom Workflows" section on website  

---

**Need Help?**

Check the comprehensive guides:
- [BACKEND_GUIDE.md](BACKEND_GUIDE.md) - Complete API documentation
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) - Security best practices
- [README.md](README.md) - Full project overview

**Your Astramaie workflow system is ready to showcase your amazing automation solutions!** 🚀✨
