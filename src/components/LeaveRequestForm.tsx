import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";

interface LeaveRequestFormProps {
  employeeId: string;
  employeeName: string;
  onSuccess?: () => void;
}

export function LeaveRequestForm({ employeeId, employeeName, onSuccess }: LeaveRequestFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [workingDays, setWorkingDays] = useState(0);
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    fetchHolidays();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      calculateWorkingDays();
    }
  }, [startDate, endDate, holidays]);

  const fetchHolidays = async () => {
    try {
      const response = await fetch(api.holidays.list);
      const data = await response.json();
      if (data.holidays) {
        setHolidays(data.holidays);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const calculateWorkingDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      setWorkingDays(0);
      return;
    }

    let days = 0;
    const holidayDates = new Set(holidays.map((h: any) => h.date));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split('T')[0];
      
      // Skip weekends and holidays
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidayDates.has(dateStr)) {
        days++;
      }
    }

    setWorkingDays(days);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !reason) {
      toast.error("Please fill all required fields");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    if (workingDays === 0) {
      toast.error("No working days in selected range (weekends/holidays excluded)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(api.leaves.create, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          employeeName,
          startDate,
          endDate,
          reason,
          type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Leave request submitted successfully!");
        setStartDate("");
        setEndDate("");
        setReason("");
        setType("personal");
        setWorkingDays(0);
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.error || "Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5" />
          Request Leave
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Leave Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Please provide a reason for your leave..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {workingDays > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white">
                    <span className="font-semibold">{workingDays}</span> working day{workingDays !== 1 ? 's' : ''} will be requested
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    (Excludes weekends and company holidays)
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading || workingDays === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Leave Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
