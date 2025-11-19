import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Plus, Trash2, Loader2, PartyPopper } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";

export function HolidayManagement() {
  const [holidays, setHolidays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("festival");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await fetch(api.holidays.list);
      const data = await response.json();
      if (data.holidays) {
        setHolidays(data.holidays);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHoliday = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !date) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(api.holidays.create, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, type }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Holiday added successfully!");
        setName("");
        setDate("");
        setType("festival");
        setShowAddForm(false);
        fetchHolidays();
      } else {
        toast.error(data.error || "Failed to add holiday");
      }
    } catch (error) {
      console.error("Error adding holiday:", error);
      toast.error("Failed to add holiday");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteHoliday = async (id: string) => {
    if (!confirm("Are you sure you want to delete this holiday?")) {
      return;
    }

    try {
      const response = await fetch(api.holidays.delete(id), {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Holiday deleted successfully!");
        fetchHolidays();
      } else {
        toast.error(data.error || "Failed to delete holiday");
      }
    } catch (error) {
      console.error("Error deleting holiday:", error);
      toast.error("Failed to delete holiday");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "festival":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "national":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "company":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10">
        <CardContent className="p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <PartyPopper className="w-5 h-5" />
            Company Holidays & Festivals
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Holiday
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Holiday Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-white/5 border border-white/10 rounded-lg"
          >
            <form onSubmit={handleAddHoliday} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Holiday Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Diwali, Christmas, Independence Day"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="festival">Festival</option>
                    <option value="national">National Holiday</option>
                    <option value="company">Company Holiday</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Holiday
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-white/10 hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Holidays List */}
        {holidays.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No holidays added yet</p>
            <p className="text-sm text-gray-500 mt-2">Add company holidays to exclude them from leave calculations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {holidays.map((holiday, index) => (
              <motion.div
                key={holiday.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{holiday.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(holiday.type)}`}>
                        {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>{formatDate(holiday.date)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteHoliday(holiday.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-gray-400">
            💡 Holidays are automatically excluded from employee leave calculations along with weekends (Saturday & Sunday)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
