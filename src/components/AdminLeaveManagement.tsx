import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, CheckCircle, XCircle, Clock, Loader2, User, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";

export function AdminLeaveManagement() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await fetch(api.leaves.admin);
      const data = await response.json();
      if (data.leaves) {
        setLeaves(data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReject = async (leaveId: string, status: "approved" | "rejected") => {
    if (!confirm(`Are you sure you want to ${status} this leave request?`)) {
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch(api.leaves.update(leaveId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          adminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Leave request ${status} successfully!`);
        setAdminNotes("");
        setSelectedLeave(null);
        fetchLeaves();
      } else {
        toast.error(data.error || `Failed to ${status} leave request`);
      }
    } catch (error) {
      console.error(`Error ${status} leave:`, error);
      toast.error(`Failed to ${status} leave request`);
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "rejected":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      default:
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    if (filter === "all") return true;
    return leave.status === filter;
  });

  const stats = {
    pending: leaves.filter((l) => l.status === "pending").length,
    approved: leaves.filter((l) => l.status === "approved").length,
    rejected: leaves.filter((l) => l.status === "rejected").length,
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
        <CardContent className="p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pending</p>
                <p className="text-3xl text-white font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Approved</p>
                <p className="text-3xl text-white font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Rejected</p>
                <p className="text-3xl text-white font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5" />
              Leave Requests
            </CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeaves.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No {filter !== "all" ? filter : ""} leave requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeaves.map((leave, index) => (
                <motion.div
                  key={leave.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{leave.employeeName}</h3>
                          <p className="text-sm text-gray-400">{leave.employeeId}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Duration</p>
                        <p className="text-sm text-white">
                          {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Working Days</p>
                        <p className="text-sm text-white">{leave.workingDays} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Type</p>
                        <p className="text-sm text-white capitalize">{leave.type}</p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Reason:</p>
                      <p className="text-sm text-white">{leave.reason}</p>
                    </div>

                    {/* Admin Notes (if exists) */}
                    {leave.adminNotes && (
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Admin Notes:</p>
                        <p className="text-sm text-white">{leave.adminNotes}</p>
                      </div>
                    )}

                    {/* Actions (only for pending) */}
                    {leave.status === "pending" && (
                      <div className="space-y-3 pt-3 border-t border-white/10">
                        {selectedLeave?.id === leave.id && (
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">
                              Admin Notes (Optional)
                            </label>
                            <textarea
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              rows={2}
                              placeholder="Add notes about this decision..."
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          {selectedLeave?.id !== leave.id ? (
                            <Button
                              onClick={() => setSelectedLeave(leave)}
                              variant="outline"
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          ) : (
                            <>
                              <Button
                                onClick={() => handleApproveReject(leave.id, "approved")}
                                disabled={processing}
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              >
                                {processing ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                )}
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleApproveReject(leave.id, "rejected")}
                                disabled={processing}
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                              >
                                {processing ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-2" />
                                )}
                                Reject
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectedLeave(null);
                                  setAdminNotes("");
                                }}
                                variant="outline"
                                size="sm"
                                className="border-white/10 hover:bg-white/5"
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs text-gray-500">
                      Requested on {formatDate(leave.createdAt)}
                      {leave.reviewedAt && ` • Reviewed on ${formatDate(leave.reviewedAt)}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
