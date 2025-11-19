# Employee ID Generation & Photo Upload Feature

## Overview
Successfully implemented unique employee ID generation and photo upload functionality for the employee management system.

## Key Features Added

### 1. **Unique Employee ID Generation**
- **Format**: `AST0001`, `AST0002`, `AST0003`, etc.
- **Logic**: Sequential numbering based on total employee count
- **Prefix**: "AST" for Astramaie
- **Padding**: 4 digits with leading zeros
- **Example**: First employee gets `AST0001`, second gets `AST0002`

### 2. **Employee Photo Upload**
- **Optional Upload**: Admin can upload employee profile photo during creation
- **File Types**: All image formats supported (jpg, png, gif, etc.)
- **Storage**: Photos stored as base64-encoded data URLs in the KV store
- **Fallback**: If no photo is uploaded, system uses default avatar from DiceBear API
- **UI**: Styled file input with green theme matching the application

### 3. **Employee ID Display**
- Employee ID is now visible in the admin dashboard employee list
- Format: "ID: AST0001 • Joined: 2025-11-19"

## Technical Implementation

### Frontend Changes (`/components/AdminDashboard.tsx`)
1. Added `photo` field to employee form state
2. Implemented file input field for photo upload
3. Updated employee list to display employee ID

### API Changes (`/utils/api.ts`)
1. Modified `createEmployee` to use `FormData` instead of JSON
2. Handles multipart form data for file uploads
3. Appends all text fields and photo file to FormData

### Backend Changes (`/supabase/functions/server/index.tsx`)
1. **Form Data Parsing**: Changed from `c.req.json()` to `c.req.formData()`
2. **ID Generation**: Implemented smart sequential ID generation
   - Fetches all existing employees
   - Counts unique employee IDs
   - Generates next sequential ID with proper formatting
3. **Photo Handling**:
   - Accepts uploaded photo file
   - Converts to ArrayBuffer then Uint8Array
   - Encodes as base64
   - Stores as data URL in employee record
   - Error handling for photo upload failures

## Usage for Tagore

When you add Tagore (tagorekrishna8@gmail.com) through the admin dashboard:

1. **Open Admin Dashboard** (password: `astramaie2024`)
2. **Go to Employees Tab**
3. **Click "Add New Employee"**
4. **Fill in the form**:
   - Name: Tagore
   - Email: tagorekrishna8@gmail.com
   - Department: (your choice)
   - Role: (your choice)
   - Salary: (your choice)
   - Joining Date: 2025-11-19 (today - already set as default)
   - Profile Photo: Click to upload Tagore's photo (optional)
   
5. **Click "Add Employee"**

### What Tagore Will See

Once created, Tagore will:
- **Receive Employee ID**: `AST0001` (or next available number)
- **Login to Dashboard**: Use his email and default password (`employee123`)
- **See Correct Stats**:
  - Days with Us: 1 (counting from today)
  - Present Days: 0 (until first check-in)
  - Attendance Rate: 0% (will update as he checks in)
  
### Day Counting

The dashboard now properly counts from the employee's `joiningDate`:
- **Day 1 (Today)**: Shows "Days with Us: 1"
- **Day 2**: Shows "Days with Us: 2"
- And so on...

All attendance statistics are calculated dynamically based on:
- Employee's joining date
- Actual check-in/check-out records
- Real-time calculations (no hardcoded values)

## Security Notes

- Photos are stored as base64 data URLs (embedded in KV store)
- File upload is server-side validated
- Only accessible through admin dashboard (password protected)
- Default password should be changed by employee on first login

## Future Enhancements

- Photo size optimization before storage
- Image cropping/resizing UI
- Photo update functionality
- Bulk employee import with photos
- Employee ID barcode/QR code generation
