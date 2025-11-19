import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { DollarSign, TrendingDown, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "../utils/api";

interface SalaryDeductionsProps {
  employeeId: string;
}

export function SalaryDeductions({ employeeId }: SalaryDeductionsProps) {
  const [deductions, setDeductions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeductions();
  }, [employeeId]);

  const fetchDeductions = async () => {
    setLoading(true);
    try {
      const response = await fetch(api.deductions.employee(employeeId));
      const data = await response.json();
      if (data.deductions) {
        setDeductions(data.deductions);
      }
    } catch (error) {
      console.error("Error fetching deductions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const totalDeductions = deductions.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-white/10">
        <CardContent className="p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingDown className="w-5 h-5" />
          Salary Deductions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {deductions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No salary deductions</p>
            <p className="text-sm text-gray-500 mt-2">Deductions appear when leave is approved</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Deductions Summary */}
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300 mb-1">Total Deductions</p>
                  <p className="text-2xl text-white font-semibold">
                    ${totalDeductions.toFixed(2)}
                  </p>
                </div>
                <TrendingDown className="w-12 h-12 text-red-400 opacity-50" />
              </div>
            </div>

            {/* Deductions List */}
            <div className="space-y-3">
              {deductions.map((deduction, index) => (
                <motion.div
                  key={deduction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span className="text-white font-medium">
                        {formatDate(deduction.month)}
                      </span>
                    </div>
                    <span className="text-red-400 font-semibold">
                      -${parseFloat(deduction.amount).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Days Deducted</p>
                      <p className="text-white">{deduction.days} day{deduction.days !== 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Per Day Rate</p>
                      <p className="text-white">
                        ${(parseFloat(deduction.amount) / deduction.days).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-gray-400">
                💡 Deductions are calculated based on approved leave days (excluding weekends and holidays)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
