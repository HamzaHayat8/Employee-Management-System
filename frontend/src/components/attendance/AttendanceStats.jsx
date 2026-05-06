
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../common/card";

const CHART_COLORS = ["#22c55e", "#eab308", "#ef4444"];

/** Custom tooltip for the recharts pie */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-sm">
      <span className="font-medium">{name}:</span> {value} days
    </div>
  );
};

export function AttendanceStats({
  presentCount,
  lateCount,
  absentCount,
  chartData,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Present */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Present
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-green-600">{presentCount}</p>
          <p className="text-xs text-gray-400 mt-1">days this month</p>
        </CardContent>
      </Card>

      {/* Late */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Late
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-yellow-500">{lateCount}</p>
          <p className="text-xs text-gray-400 mt-1">days this month</p>
        </CardContent>
      </Card>

      {/* Monthly overview pie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Monthly overview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
