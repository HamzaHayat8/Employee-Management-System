import React from "react";

function Time_Tracking({ checkedIn = [] }) {
  // ---------- Helper Functions ----------

  const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isThisWeek = (date) => {
    const d = new Date(date);
    const now = new Date();

    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    return d >= firstDayOfWeek && d <= now;
  };

  const isThisMonth = (date) => {
    const d = new Date(date);
    const now = new Date();

    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  };

  const calculateHours = (records) => {
    return records.reduce((total, item) => {
      const checkIn = new Date(item.checkInTime);
      const checkOut = item.checkOutTime
        ? new Date(item.checkOutTime)
        : new Date(); // live tracking

      const diff = (checkOut - checkIn) / (1000 * 60 * 60);
      return total + diff;
    }, 0);
  };

  const formatHours = (hours) => {
    if (!hours || isNaN(hours)) return "0h";

    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    return `${h}h ${m}m`;
  };

  // ---------- Filters ----------

  const todayRecords = checkedIn.filter((item) => isToday(item.checkInTime));

  const weekRecords = checkedIn.filter((item) => isThisWeek(item.checkInTime));

  const monthRecords = checkedIn.filter((item) =>
    isThisMonth(item.checkInTime),
  );

  // ---------- Totals ----------

  const todayHours = calculateHours(todayRecords);
  const weekHours = calculateHours(weekRecords);
  const monthHours = calculateHours(monthRecords);

  // ---------- UI ----------

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Time Tracking</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Today */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Today</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatHours(todayHours)}
            </p>
          </div>

          {/* Week */}
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This Week</p>
            <p className="text-2xl font-bold text-emerald-600">
              {formatHours(weekHours)}
            </p>
          </div>

          {/* Month */}
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This Month</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatHours(monthHours)}
            </p>
          </div>

          {/* Sessions */}
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Sessions</p>
            <p className="text-2xl font-bold text-amber-600">
              {checkedIn.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Time_Tracking;
