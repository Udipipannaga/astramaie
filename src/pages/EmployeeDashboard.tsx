import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import {
  LogOut,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  User,
  TrendingUp,
  CheckCircle,
  XCircle,
  Home,
  Timer,
  Activity,
  Award,
  Bell,
  Settings,
  Download,
  CreditCard,
  ClipboardList,
  Plane,
  TrendingDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";
import { LeaveRequestForm } from "../components/LeaveRequestForm";
import { LeaveHistory } from "../components/LeaveHistory";
import { SalaryDeductions } from "../components/SalaryDeductions";

interface EmployeeDashboardProps {
  employee: {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    employeeId: string;
    joiningDate: string;
    avatar: string;
    salary?: string;
  };
  onLogout: () => void;
  onBack: () => void;
}

export function EmployeeDashboard({ employee, onLogout, onBack }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState("0:00:00");
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  // Generate and download pay slip
  const downloadPaySlip = (month?: string) => {
    const currentMonth = month || payrollData.currentMonth;
    
    const paySlipHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Pay Slip - ${employee.name} - ${currentMonth}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .company-name { font-size: 28px; font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
    .document-title { font-size: 18px; color: #64748b; margin-top: 10px; }
    .section { margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .label { color: #64748b; font-weight: 600; }
    .value { color: #1e293b; font-weight: 500; }
    .salary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .salary-table th, .salary-table td { padding: 12px; text-align: left; border: 1px solid #e2e8f0; }
    .salary-table th { background: #f1f5f9; font-weight: 600; color: #1e293b; }
    .total-row { background: #eff6ff; font-weight: bold; font-size: 16px; }
    .net-salary { background: #dbeafe; color: #1e40af; font-size: 18px; }
    .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-name">ASTRAMAIE</div>
    <div style="color: #64748b; font-size: 14px;">AI Automation Agency</div>
    <div class="document-title">SALARY SLIP - ${currentMonth.toUpperCase()}</div>
  </div>

  <div class="section">
    <div class="info-row">
      <span class="label">Employee Name:</span>
      <span class="value">${employee.name}</span>
    </div>
    <div class="info-row">
      <span class="label">Employee ID:</span>
      <span class="value">${employee.employeeId}</span>
    </div>
    <div class="info-row">
      <span class="label">Department:</span>
      <span class="value">${employee.department}</span>
    </div>
    <div class="info-row">
      <span class="label">Designation:</span>
      <span class="value">${employee.role}</span>
    </div>
    <div class="info-row">
      <span class="label">Date of Joining:</span>
      <span class="value">${new Date(employee.joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
    </div>
  </div>

  <table class="salary-table">
    <thead>
      <tr>
        <th>EARNINGS</th>
        <th style="text-align: right;">AMOUNT (₹)</th>
        <th>DEDUCTIONS</th>
        <th style="text-align: right;">AMOUNT (₹)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Basic Salary</td>
        <td style="text-align: right;">${payrollData.basicSalary.toLocaleString('en-IN')}</td>
        <td>Provident Fund (PF)</td>
        <td style="text-align: right;">${Math.round(payrollData.basicSalary * 0.12).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>House Rent Allowance (HRA)</td>
        <td style="text-align: right;">${Math.round(payrollData.allowances * 0.5).toLocaleString('en-IN')}</td>
        <td>Professional Tax</td>
        <td style="text-align: right;">${Math.round(payrollData.deductions * 0.02).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>Transport Allowance</td>
        <td style="text-align: right;">${Math.round(payrollData.allowances * 0.3).toLocaleString('en-IN')}</td>
        <td>Income Tax (TDS)</td>
        <td style="text-align: right;">${Math.round(payrollData.deductions * 0.88).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>Other Allowances</td>
        <td style="text-align: right;">${Math.round(payrollData.allowances * 0.2).toLocaleString('en-IN')}</td>
        <td></td>
        <td></td>
      </tr>
      <tr class="total-row">
        <td>GROSS EARNINGS</td>
        <td style="text-align: right;">₹ ${(payrollData.basicSalary + payrollData.allowances).toLocaleString('en-IN')}</td>
        <td>TOTAL DEDUCTIONS</td>
        <td style="text-align: right;">₹ ${payrollData.deductions.toLocaleString('en-IN')}</td>
      </tr>
      <tr class="net-salary">
        <td colspan="3" style="text-align: right;">NET SALARY PAYABLE:</td>
        <td style="text-align: right;">₹ ${payrollData.netSalary.toLocaleString('en-IN')}</td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 30px; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb;">
    <strong>Amount in Words:</strong> ${numberToWords(payrollData.netSalary)} Rupees Only
  </div>

  <div class="footer">
    <p>This is a system-generated document and does not require a signature.</p>
    <p>© ${new Date().getFullYear()} Astramaie. All rights reserved.</p>
  </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([paySlipHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PaySlip_${employee.employeeId}_${currentMonth.replace(/\s/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Pay slip downloaded!", {
      description: "You can print it as PDF from your browser"
    });
  };

  // Generate and download documents
  const downloadDocument = (docType: string) => {
    let documentHTML = '';
    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const baseStyle = `
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .company-name { font-size: 28px; font-weight: bold; color: #1e3a8a; }
        .document-title { font-size: 20px; color: #1e293b; margin-top: 15px; font-weight: 600; }
        .content { margin: 30px 0; }
        .info-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .signature { margin-top: 60px; text-align: right; }
        .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
      </style>
    `;

    switch(docType) {
      case 'Employment Contract':
        documentHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Employment Contract - ${employee.name}</title>
  ${baseStyle}
</head>
<body>
  <div class="header">
    <div class="company-name">ASTRAMAIE</div>
    <div style="color: #64748b;">AI Automation Agency</div>
    <div class="document-title">EMPLOYMENT CONTRACT</div>
  </div>

  <div class="content">
    <p><strong>Date:</strong> ${new Date(employee.joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
    
    <div class="info-box">
      <p><strong>Employee Details:</strong></p>
      <p>Name: ${employee.name}</p>
      <p>Employee ID: ${employee.employeeId}</p>
      <p>Designation: ${employee.role}</p>
      <p>Department: ${employee.department}</p>
    </div>

    <p>This Employment Contract is entered into between <strong>Astramaie</strong> (hereinafter referred to as "the Company") and <strong>${employee.name}</strong> (hereinafter referred to as "the Employee").</p>

    <h3>1. POSITION AND DUTIES</h3>
    <p>The Employee is appointed as <strong>${employee.role}</strong> in the ${employee.department} department. The Employee agrees to perform duties and responsibilities as assigned by the Company.</p>

    <h3>2. COMPENSATION</h3>
    <p>The Employee shall receive a monthly salary of <strong>₹${payrollData.basicSalary.toLocaleString('en-IN')}</strong> plus applicable allowances, subject to statutory deductions.</p>

    <h3>3. TERM OF EMPLOYMENT</h3>
    <p>This employment commenced on <strong>${new Date(employee.joiningDate).toLocaleDateString('en-IN')}</strong> and shall continue until terminated by either party in accordance with the terms herein.</p>

    <h3>4. WORKING HOURS</h3>
    <p>The standard working hours are 9:00 AM to 6:00 PM, Monday through Friday, with flexibility as required by business needs.</p>

    <h3>5. LEAVE ENTITLEMENT</h3>
    <p>The Employee is entitled to annual leave, sick leave, and other leaves as per company policy.</p>

    <h3>6. CONFIDENTIALITY</h3>
    <p>The Employee agrees to maintain confidentiality of all proprietary information and trade secrets of the Company.</p>

    <div class="signature">
      <p>___________________________</p>
      <p><strong>Authorized Signatory</strong></p>
      <p>Astramaie</p>
    </div>
  </div>

  <div class="footer">
    <p>This is a system-generated document.</p>
    <p>© ${new Date().getFullYear()} Astramaie. All rights reserved.</p>
  </div>
</body>
</html>`;
        break;

      case 'Tax Form 16':
        documentHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Form 16 - ${employee.name}</title>
  ${baseStyle}
  <style>
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    table th, table td { padding: 10px; text-align: left; border: 1px solid #e2e8f0; }
    table th { background: #f1f5f9; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-name">ASTRAMAIE</div>
    <div style="color: #64748b;">AI Automation Agency</div>
    <div class="document-title">FORM 16 - PART B</div>
    <div style="color: #64748b; margin-top: 10px;">Assessment Year 2024-25</div>
  </div>

  <div class="content">
    <div class="info-box">
      <p><strong>Employee Details:</strong></p>
      <p>Name: ${employee.name}</p>
      <p>Employee ID: ${employee.employeeId}</p>
      <p>PAN: Not Provided</p>
      <p>Designation: ${employee.role}</p>
    </div>

    <table>
      <tr>
        <th>Particulars</th>
        <th style="text-align: right;">Amount (₹)</th>
      </tr>
      <tr>
        <td><strong>GROSS SALARY</strong></td>
        <td></td>
      </tr>
      <tr>
        <td>Salary as per provisions contained in section 17(1)</td>
        <td style="text-align: right;">${(payrollData.basicSalary * 12).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td>Value of perquisites under section 17(2)</td>
        <td style="text-align: right;">${(payrollData.allowances * 12).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td><strong>Gross Salary (1+2)</strong></td>
        <td style="text-align: right;"><strong>${((payrollData.basicSalary + payrollData.allowances) * 12).toLocaleString('en-IN')}</strong></td>
      </tr>
      <tr>
        <td><strong>DEDUCTIONS</strong></td>
        <td></td>
      </tr>
      <tr>
        <td>Standard Deduction under section 16(ia)</td>
        <td style="text-align: right;">50,000</td>
      </tr>
      <tr>
        <td>Professional Tax</td>
        <td style="text-align: right;">${Math.round(payrollData.deductions * 0.02 * 12).toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td><strong>Total Deductions</strong></td>
        <td style="text-align: right;"><strong>${(50000 + Math.round(payrollData.deductions * 0.02 * 12)).toLocaleString('en-IN')}</strong></td>
      </tr>
      <tr>
        <td><strong>Income chargeable under the head 'Salaries'</strong></td>
        <td style="text-align: right;"><strong>${(((payrollData.basicSalary + payrollData.allowances) * 12) - 50000 - Math.round(payrollData.deductions * 0.02 * 12)).toLocaleString('en-IN')}</strong></td>
      </tr>
      <tr>
        <td><strong>TAX DEDUCTED AT SOURCE</strong></td>
        <td style="text-align: right;"><strong>${payrollData.taxDeducted.toLocaleString('en-IN')}</strong></td>
      </tr>
    </table>

    <div class="signature">
      <p>___________________________</p>
      <p><strong>Authorized Signatory</strong></p>
      <p>Astramaie</p>
    </div>
  </div>

  <div class="footer">
    <p>This is a system-generated document.</p>
    <p>© ${new Date().getFullYear()} Astramaie. All rights reserved.</p>
  </div>
</body>
</html>`;
        break;

      case 'Insurance Policy':
        documentHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insurance Policy - ${employee.name}</title>
  ${baseStyle}
</head>
<body>
  <div class="header">
    <div class="company-name">ASTRAMAIE</div>
    <div style="color: #64748b;">AI Automation Agency</div>
    <div class="document-title">EMPLOYEE INSURANCE POLICY</div>
  </div>

  <div class="content">
    <div class="info-box">
      <p><strong>Policy Holder Details:</strong></p>
      <p>Name: ${employee.name}</p>
      <p>Employee ID: ${employee.employeeId}</p>
      <p>Policy Number: AST-INS-${employee.employeeId}-2024</p>
      <p>Policy Start Date: ${new Date(employee.joiningDate).toLocaleDateString('en-IN')}</p>
    </div>

    <h3>COVERAGE DETAILS</h3>
    
    <h4>1. Health Insurance</h4>
    <p>Coverage Amount: ₹5,00,000 per annum</p>
    <p>Covers: Employee + Spouse + 2 Children</p>
    <p>Benefits: Hospitalization, Pre & Post hospitalization, Day care procedures, Ambulance charges</p>

    <h4>2. Life Insurance</h4>
    <p>Sum Assured: ₹10,00,000</p>
    <p>Nominee: As per employee nomination</p>

    <h4>3. Accident Insurance</h4>
    <p>Coverage Amount: ₹5,00,000</p>
    <p>Covers: Accidental death and permanent disability</p>

    <h3>TERMS AND CONDITIONS</h3>
    <ul>
      <li>This policy is valid as long as the employee is in active service with Astramaie</li>
      <li>All claims must be submitted within 30 days of treatment</li>
      <li>Pre-existing diseases have a waiting period of 2 years</li>
      <li>Maternity benefits are covered after 9 months of continuous employment</li>
    </ul>

    <h3>CLAIM PROCESS</h3>
    <p>To file a claim, contact HR department with required documents including hospitalization bills, discharge summary, and prescriptions.</p>

    <div class="signature">
      <p>___________________________</p>
      <p><strong>Authorized Signatory</strong></p>
      <p>Astramaie</p>
    </div>
  </div>

  <div class="footer">
    <p>This is a system-generated document.</p>
    <p>© ${new Date().getFullYear()} Astramaie. All rights reserved.</p>
  </div>
</body>
</html>`;
        break;

      case 'ID Card':
        documentHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ID Card - ${employee.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f3f4f6; }
    .id-card { 
      width: 350px; 
      margin: 0 auto; 
      background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); 
      border-radius: 15px; 
      padding: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .id-header { text-align: center; color: white; margin-bottom: 20px; }
    .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
    .id-content { 
      background: white; 
      border-radius: 10px; 
      padding: 20px; 
      text-align: center;
    }
    .photo { 
      width: 120px; 
      height: 120px; 
      border-radius: 60px; 
      margin: 0 auto 15px; 
      border: 4px solid #2563eb;
      object-fit: cover;
    }
    .name { font-size: 20px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
    .role { color: #64748b; margin-bottom: 15px; }
    .details { text-align: left; margin-top: 15px; padding-top: 15px; border-top: 2px solid #e2e8f0; }
    .detail-row { display: flex; justify-content: space-between; padding: 5px 0; }
    .label { color: #64748b; font-size: 13px; }
    .value { color: #1e293b; font-weight: 600; font-size: 13px; }
    .id-footer { text-align: center; color: white; margin-top: 15px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="id-card">
    <div class="id-header">
      <div class="company-name">ASTRAMAIE</div>
      <div style="font-size: 12px;">AI Automation Agency</div>
    </div>
    
    <div class="id-content">
      <img src="${employee.avatar}" alt="${employee.name}" class="photo" />
      <div class="name">${employee.name}</div>
      <div class="role">${employee.role}</div>
      
      <div class="details">
        <div class="detail-row">
          <span class="label">Employee ID:</span>
          <span class="value">${employee.employeeId}</span>
        </div>
        <div class="detail-row">
          <span class="label">Department:</span>
          <span class="value">${employee.department}</span>
        </div>
        <div class="detail-row">
          <span class="label">Email:</span>
          <span class="value" style="font-size: 11px;">${employee.email}</span>
        </div>
        <div class="detail-row">
          <span class="label">Valid From:</span>
          <span class="value">${new Date(employee.joiningDate).toLocaleDateString('en-IN')}</span>
        </div>
      </div>
    </div>
    
    <div class="id-footer">
      If found, please return to Astramaie office
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 12px;">
    <p>Print this page to create a physical ID card</p>
    <p>© ${new Date().getFullYear()} Astramaie. All rights reserved.</p>
  </div>
</body>
</html>`;
        break;
    }

    // Create blob and download
    const blob = new Blob([documentHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType.replace(/\s/g, '_')}_${employee.employeeId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`${docType} downloaded!`, {
      description: "You can print it as PDF from your browser"
    });
  };

  // Convert number to words for pay slip
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';

    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '');
    };

    if (num < 1000) return convertLessThanThousand(num);
    if (num < 100000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return convertLessThanThousand(thousands) + ' Thousand' + (remainder !== 0 ? ' ' + convertLessThanThousand(remainder) : '');
    }
    
    const lakhs = Math.floor(num / 100000);
    const remainder = num % 100000;
    return convertLessThanThousand(lakhs) + ' Lakh' + (remainder !== 0 ? ' ' + numberToWords(remainder) : '');
  };

  // Timer for working hours
  useEffect(() => {
    if (isCheckedIn && checkInTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setWorkingHours(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCheckedIn, checkInTime]);

  // Load attendance data
  useEffect(() => {
    loadAttendanceData();
    loadTasks();
  }, []);

  const loadAttendanceData = async () => {
    try {
      const data = await api.getEmployeeAttendance(employee.id);
      // Ensure data is always an array
      setAttendanceData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load attendance:", error);
      setAttendanceData([]);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await api.getEmployeeTasks(employee.id);
      // Ensure data is always an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setTasks([]);
    }
  };

  const handleTaskStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
      await api.updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated!");
      await loadTasks();
    } catch (error: any) {
      toast.error("Failed to update task status", {
        description: error.message,
      });
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      await api.employeeCheckIn(employee.id, now.toISOString());
      setIsCheckedIn(true);
      setCheckInTime(now);
      toast.success("Checked in successfully!", {
        description: `Started work at ${now.toLocaleTimeString()}`,
      });
      await loadAttendanceData();
    } catch (error: any) {
      toast.error("Check-in failed", {
        description: error.message,
      });
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      await api.employeeCheckOut(employee.id, now.toISOString());
      setIsCheckedIn(false);
      toast.success("Checked out successfully!", {
        description: `Ended work at ${now.toLocaleTimeString()}. Total: ${workingHours}`,
      });
      setCheckInTime(null);
      setWorkingHours("0:00:00");
      await loadAttendanceData();
    } catch (error: any) {
      toast.error("Check-out failed", {
        description: error.message,
      });
    }
  };

  // Calculate payroll data based on actual employee salary
  const payrollData = useMemo(() => {
    // Parse employee salary (could be string like "₹75,000" or "75000")
    const salaryStr = employee.salary || "0";
    const basicSalary = parseFloat(salaryStr.replace(/[^0-9.-]+/g, "")) || 75000;
    
    // Calculate components
    const allowances = Math.round(basicSalary * 0.2); // 20% of basic
    const deductions = Math.round(basicSalary * 0.113); // ~11.3% (PF + tax)
    const netSalary = basicSalary + allowances - deductions;
    
    // Calculate YTD (assuming employee joined in the current year)
    const joiningDate = new Date(employee.joiningDate);
    const today = new Date();
    const monthsWorked = Math.max(1, 
      (today.getFullYear() - joiningDate.getFullYear()) * 12 + 
      (today.getMonth() - joiningDate.getMonth()) + 1
    );
    const ytdEarnings = Math.round(netSalary * monthsWorked);
    const taxDeducted = Math.round(ytdEarnings * 0.1); // Simplified 10% tax
    
    return {
      currentMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      basicSalary,
      allowances,
      deductions,
      netSalary,
      ytdEarnings,
      pendingLeaves: 12,
      taxDeducted,
    };
  }, [employee.salary, employee.joiningDate]);

  // Calculate attendance stats dynamically based on joining date and actual data
  const attendanceStats = useMemo(() => {
    const joiningDate = new Date(employee.joiningDate);
    const today = new Date();
    
    // Calculate total working days since joining (calendar days)
    const daysSinceJoining = Math.floor((today.getTime() - joiningDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Count actual attendance from data
    const presentDays = attendanceData.filter(record => record.status === "Present").length;
    const absentDays = attendanceData.filter(record => record.status === "Absent").length;
    const halfDays = attendanceData.filter(record => record.status === "Half Day").length;
    
    // Calculate attendance rate
    const totalDays = daysSinceJoining;
    const attendanceRate = totalDays > 0 ? ((presentDays + halfDays * 0.5) / totalDays * 100).toFixed(1) : 0;
    
    return {
      present: presentDays,
      absent: absentDays,
      halfDay: halfDays,
      totalDays: totalDays,
      attendanceRate: Number(attendanceRate),
    };
  }, [attendanceData, employee.joiningDate]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "leave", label: "Leave", icon: Plane },
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "payroll", label: "Payroll", icon: DollarSign },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-white/10"
              >
                ← Back to Website
              </Button>
              <div className="flex items-center gap-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-white">{employee.name}</h2>
                  <p className="text-gray-400 text-sm">{employee.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="border-white/10 hover:bg-white/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="bg-white/5 border-white/10 sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Check-in/Check-out Card */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white text-xl mb-1">
                            {isCheckedIn ? "You're Checked In" : "Ready to Start Work?"}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {isCheckedIn
                              ? `Working for: ${workingHours}`
                              : `Today is ${new Date().toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {!isCheckedIn ? (
                          <Button
                            onClick={handleCheckIn}
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Check In
                          </Button>
                        ) : (
                          <Button
                            onClick={handleCheckOut}
                            size="lg"
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                          >
                            <XCircle className="w-5 h-5 mr-2" />
                            Check Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Attendance</p>
                          <p className="text-white text-2xl">{attendanceStats.attendanceRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Net Salary</p>
                          <p className="text-white text-2xl">₹{(payrollData.netSalary / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Timer className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Days with Us</p>
                          <p className="text-white text-2xl">{attendanceStats.totalDays}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Present Days</p>
                          <p className="text-white text-2xl">{attendanceStats.present}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5 text-blue-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceData.slice(0, 5).map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <p className="text-white">{record.date}</p>
                              <p className="text-gray-400 text-sm">
                                {record.checkIn} - {record.checkOut || "In Progress"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white">{record.hours}</p>
                            <p className="text-gray-400 text-sm">{record.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "attendance" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Attendance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-500/10 rounded-lg">
                        <p className="text-green-400 text-3xl mb-1">{attendanceStats.present}</p>
                        <p className="text-gray-400 text-sm">Present</p>
                      </div>
                      <div className="text-center p-4 bg-red-500/10 rounded-lg">
                        <p className="text-red-400 text-3xl mb-1">{attendanceStats.absent}</p>
                        <p className="text-gray-400 text-sm">Absent</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                        <p className="text-yellow-400 text-3xl mb-1">{attendanceStats.halfDay}</p>
                        <p className="text-gray-400 text-sm">Half Day</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <p className="text-blue-400 text-3xl mb-1">{attendanceStats.totalDays}</p>
                        <p className="text-gray-400 text-sm">Total Days</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {attendanceData.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                record.status === "Present"
                                  ? "bg-green-500/20"
                                  : record.status === "Absent"
                                  ? "bg-red-500/20"
                                  : "bg-yellow-500/20"
                              }`}
                            >
                              {record.status === "Present" ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : record.status === "Absent" ? (
                                <XCircle className="w-5 h-5 text-red-400" />
                              ) : (
                                <Clock className="w-5 h-5 text-yellow-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-white">{record.date}</p>
                              <p className="text-gray-400 text-sm">
                                {record.checkIn} - {record.checkOut || "---"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white">{record.hours}</p>
                            <p
                              className={`text-sm ${
                                record.status === "Present"
                                  ? "text-green-400"
                                  : record.status === "Absent"
                                  ? "text-red-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {record.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "leave" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <LeaveRequestForm 
                  employeeId={employee.id} 
                  employeeName={employee.name}
                  onSuccess={() => setActiveTab("leave")}
                />
                <LeaveHistory employeeId={employee.id} />
                <SalaryDeductions employeeId={employee.id} />
              </motion.div>
            )}

            {activeTab === "tasks" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">My Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                              <ClipboardList className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white">{task.title}</p>
                              <p className="text-gray-400 text-sm">
                                {task.dueDate} • {task.status}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                              onClick={() => handleTaskStatusUpdate(task.id, "Completed")}
                            >
                              Complete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                              onClick={() => handleTaskStatusUpdate(task.id, "In Progress")}
                            >
                              In Progress
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "payroll" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        Current Month Salary
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-white/5"
                        onClick={() => downloadPaySlip()}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Slip
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Basic Salary</span>
                        <span className="text-white text-xl">₹{payrollData.basicSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Allowances</span>
                        <span className="text-green-400 text-xl">+ ₹{payrollData.allowances.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Deductions</span>
                        <span className="text-red-400 text-xl">- ₹{payrollData.deductions.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white">Net Salary</span>
                          <span className="text-blue-400 text-3xl">₹{payrollData.netSalary.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Year-to-Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Earnings</span>
                          <span className="text-white">₹{payrollData.ytdEarnings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax Deducted</span>
                          <span className="text-white">₹{payrollData.taxDeducted.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Net YTD</span>
                          <span className="text-green-400">
                            ₹{(payrollData.ytdEarnings - payrollData.taxDeducted).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {["October 2024", "September 2024", "August 2024"].map((month) => (
                          <div
                            key={month}
                            className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                          >
                            <span className="text-white">{month}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => downloadPaySlip(month)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "documents" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">My Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Employment Contract", date: "Jan 15, 2023", size: "245 KB" },
                        { name: "Tax Form 16", date: "Apr 1, 2024", size: "180 KB" },
                        { name: "Insurance Policy", date: "Jan 20, 2023", size: "320 KB" },
                        { name: "ID Card", date: "Jan 16, 2023", size: "95 KB" },
                      ].map((doc) => (
                        <div
                          key={doc.name}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white">{doc.name}</p>
                              <p className="text-gray-400 text-sm">
                                {doc.date} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadDocument(doc.name)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-6">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-24 h-24 rounded-full border-4 border-blue-500"
                      />
                      <div>
                        <h3 className="text-white text-2xl mb-1">{employee.name}</h3>
                        <p className="text-gray-400">{employee.role}</p>
                        <p className="text-gray-400 text-sm mt-1">ID: {employee.employeeId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <p className="text-white">{employee.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Department</p>
                        <p className="text-white">{employee.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Joining Date</p>
                        <p className="text-white">{employee.joiningDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Employment Type</p>
                        <p className="text-white">Full-time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}