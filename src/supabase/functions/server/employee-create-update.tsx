// This file contains the updated employee creation endpoint
// Replace lines 685-738 in /supabase/functions/server/index.tsx with this code

app.post('/make-server-bae0b22c/admin/employees', async (c) => {
  try {
    // Parse form data
    const formData = await c.req.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const department = formData.get('department')?.toString();
    const role = formData.get('role')?.toString();
    const salary = formData.get('salary')?.toString();
    const joiningDate = formData.get('joiningDate')?.toString();
    const password = formData.get('password')?.toString();
    const photo = formData.get('photo') as File | null;

    if (!name || !email || !department || !role) {
      return c.json({ error: 'Name, email, department, and role are required' }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Check if employee already exists
    const existingEmployee = await kv.get(`employee_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`);
    if (existingEmployee) {
      return c.json({ error: 'Employee with this email already exists' }, 409);
    }

    // Generate unique employee ID
    const allEmployees = await kv.getByPrefix('employee_');
    const employeeCount = new Set(allEmployees.map((emp: any) => emp?.employeeId).filter(Boolean)).size;
    const employeeId = `AST${String(employeeCount + 1).padStart(4, '0')}`; // e.g., AST0001, AST0002
    
    const employeeKey = `employee_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    
    let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
    
    // Handle photo upload if provided
    if (photo && photo.size > 0) {
      try {
        const photoBuffer = await photo.arrayBuffer();
        const photoExt = photo.name.split('.').pop() || 'jpg';
        
        // Convert ArrayBuffer to Uint8Array
        const photoData = new Uint8Array(photoBuffer);
        
        // Store photo data as base64 in KV store
        const base64Photo = btoa(String.fromCharCode(...photoData));
        const photoDataUrl = `data:${photo.type};base64,${base64Photo}`;
        avatarUrl = photoDataUrl;
        
        console.log(`Photo uploaded for employee: ${employeeId}`);
      } catch (photoError: any) {
        console.error('Error uploading photo:', photoError);
        // Continue with default avatar if photo upload fails
      }
    }
    
    const employeeData = {
      id: employeeId,
      employeeId: employeeId,
      name,
      email,
      department,
      role,
      salary: salary || null,
      joiningDate: joiningDate || new Date().toISOString().split('T')[0],
      password: password || 'employee123', // Default password
      avatar: avatarUrl,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await kv.set(employeeKey, employeeData);
    await kv.set(employeeId, employeeData); // Store by ID as well for quick lookup

    console.log(`Employee created: ${employeeId} - ${email}`);

    return c.json({
      success: true,
      message: 'Employee created successfully',
      employee: employeeData,
    });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return c.json({ error: error.message || 'Failed to create employee' }, 500);
  }
});
