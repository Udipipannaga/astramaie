# Leave Management & Email Notification System

## Overview
Comprehensive leave management system with automatic salary deductions, holiday tracking, and automated email notifications for employee onboarding.

**Admin Email**: Adithya@astramaie.com

## Features Implemented

### 1. **Automated Email Notifications** ✉️

#### When an Employee is Added:
- **Welcome Email to Employee**: Contains login credentials, employee ID, department, role, and joining date
- **Notification Email to Admin**: Contains all employee details for record-keeping

#### Email Service:
- Uses **Resend API** for reliable email delivery
- Beautifully formatted HTML emails with company branding
- Non-blocking email sending (doesn't slow down employee creation)
- Fallback handling if email service is not configured

#### Setup Required:
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add it to environment variables as `RESEND_API_KEY` (already prompted in this session)
4. Optional: Update `from` email address in `/supabase/functions/server/index.tsx` line 36 with your verified domain

### 2. **Leave Management System** 🏖️

#### Employee Leave Request:
- Employees can submit leave requests from their dashboard
- Required fields: Start date, end date, reason, type (personal/sick/vacation)
- **Smart Working Days Calculation**:
  - Automatically excludes Saturdays and Sundays
  - Automatically excludes company holidays/festivals
  - Shows exact number of working days for the leave period

#### Admin Leave Management:
- View all pending/approved/rejected leave requests
- Approve or reject with optional admin notes
- **Automatic Salary Deduction on Approval**:
  - Calculates per-day salary (monthly salary ÷ 26 working days)
  - Deducts based on actual working days taken
  - Records deduction for payroll tracking

#### Holiday/Festival Management:
- Admin can add company holidays
- Admin can remove holidays
- System automatically skips these dates when calculating leave days
- Weekends (Saturday/Sunday) are always excluded

### 3. **Salary Deduction System** 💰

#### Automatic Calculation:
- Formula: `Per Day Deduction = Monthly Salary ÷ 26`
- Total Deduction = Per Day × Working Days on Leave
- Only triggered when leave is **approved**

#### Deduction Records:
- Each approved leave creates a deduction record
- Tracked by month for easy payroll processing
- Employees can view their deduction history
- Admin has full visibility of all deductions

## API Endpoints Added

### Leave Management:
```
GET    /make-server-bae0b22c/employee/leave/:employeeId        - Get employee leaves
POST   /make-server-bae0b22c/employee/leave                    - Submit leave request
GET    /make-server-bae0b22c/admin/leaves                      - Get all leaves (admin)
PATCH  /make-server-bae0b22c/admin/leaves/:id                  - Approve/reject leave
```

### Holiday Management:
```
GET    /make-server-bae0b22c/holidays                          - Get all holidays
POST   /make-server-bae0b22c/admin/holidays                    - Add holiday (admin)
DELETE /make-server-bae0b22c/admin/holidays/:id                - Delete holiday (admin)
```

### Salary Deductions:
```
GET    /make-server-bae0b22c/employee/deductions/:employeeId   - Get employee deductions
```

## Data Structures

### Leave Request:
```typescript
{
  id: string,                    // "leave_timestamp_random"
  employeeId: string,            // Employee ID
  employeeName: string,          // Employee name
  startDate: string,             // "2025-11-20"
  endDate: string,               // "2025-11-22"
  reason: string,                // Reason for leave
  type: string,                  // "personal" | "sick" | "vacation"
  workingDays: number,           // Calculated working days
  status: string,                // "pending" | "approved" | "rejected"
  adminNotes?: string,           // Optional admin comments
  createdAt: string,             // ISO timestamp
  reviewedAt?: string            // ISO timestamp
}
```

### Holiday:
```typescript
{
  id: string,                    // "holiday_date_random"
  name: string,                  // "Diwali"
  date: string,                  // "2025-11-05"
  type: string,                  // "festival" | "national" | "company"
  createdAt: string              // ISO timestamp
}
```

### Salary Deduction:
```typescript
{
  id: string,                    // "deduction_leaveId"
  employeeId: string,            // Employee ID
  leaveId: string,               // Associated leave ID
  amount: string,                // "500.00"
  days: number,                  // Working days deducted
  month: string,                 // "2025-11" (YYYY-MM)
  createdAt: string              // ISO timestamp
}
```

## Working Days Calculation Logic

```javascript
// For a leave from Monday to Friday (5 calendar days):
// - If it includes a Saturday/Sunday: Those are excluded
// - If it includes a company holiday: That is excluded
// - Result: Only actual working days are counted

Example:
Leave: Nov 23-27 (5 days)
- Nov 23 (Fri) = Working day ✓
- Nov 24 (Sat) = Weekend ✗
- Nov 25 (Sun) = Weekend ✗
- Nov 26 (Mon) = Working day ✓
- Nov 27 (Tue) = Working day ✓
Result: 3 working days
```

## Salary Deduction Example

```
Employee: Tagore
Monthly Salary: $5000
Per Day Rate: $5000 ÷ 26 = $192.31

Leave Request: 3 working days
Deduction: $192.31 × 3 = $576.93

New Salary for Month: $5000 - $576.93 = $4423.07
```

## Email Templates

### Employee Welcome Email:
- Gradient green header with welcome message
- Credential box with all login details
- Employee ID, department, role
- Password change reminder
- Footer with contact info

### Admin Notification Email:
- Gradient blue header
- Complete employee details in formatted box
- Confirmation that employee received credentials
- Ready for admin records

## Next Steps for Frontend Integration

Need to create:
1. **Leave Request Form** in Employee Dashboard
2. **Leave Management Tab** in Admin Dashboard
3. **Holiday Management Section** in Admin Settings
4. **Payroll Tab** showing deductions
5. **Salary Breakdown** view for employees

## Security & Privacy

- Emails sent asynchronously (non-blocking)
- Employee passwords not exposed in logs
- Deduction records are private (employee can only see their own)
- Admin authentication required for all admin endpoints
- Salary information handled securely

## Testing Checklist

- [ ] Add Resend API key
- [ ] Create test employee → Check emails sent
- [ ] Add company holidays (Diwali, Christmas, etc.)
- [ ] Submit leave request as employee
- [ ] Approve leave as admin → Verify deduction calculated
- [ ] Check employee can see their deductions
- [ ] Verify weekends excluded from working days
- [ ] Verify holidays excluded from working days

## Benefits

✅ **For Employees:**
- Transparent leave tracking
- Know exactly how many working days they're taking
- See salary deductions before requesting leave
- Automated email with credentials on joining

✅ **For Admin:**
- Automated payroll deduction calculation
- No manual tracking of weekends/holidays
- Email notifications for every new hire
- Complete audit trail of leaves and deductions

✅ **For HR:**
- Accurate payroll processing
- Historical deduction records
- Easy holiday calendar management
- Reduced administrative overhead