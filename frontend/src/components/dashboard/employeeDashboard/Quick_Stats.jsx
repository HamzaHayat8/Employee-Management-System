import { ClockIcon, Paperclip } from "lucide-react";
import React from "react";

function Quick_Stats({ tasks, leaves, checkedIn }) {
  const completedTasks = tasks.filter(
    (task) => task?.status === "completed",
  ).length;

  const ApprovedLeaves = leaves.filter(
    (leave) => leave?.status === "approved",
  ).length;

  // check in
  const latestCheckIn =
    checkedIn && checkedIn.length > 0
      ? checkedIn.reduce((latest, current) =>
          new Date(current.checkInTime) > new Date(latest.checkInTime)
            ? current
            : latest,
        )
      : null;

  const formattedTime = latestCheckIn
    ? new Date(latestCheckIn.checkInTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";
  // check in

  return (
    <div class="space-y-8">
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">Quick Stats</h2>
        </div>

        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                {/* <Combine/> */}
              </div>
              <div>
                <p class="text-sm text-gray-600">Completed Tasks</p>
                <p class="font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ClockIcon />
              </div>
              <div>
                <p class="text-sm text-gray-600">Today Checked In</p>
                <p class="font-semibold text-gray-900">{formattedTime}</p>
              </div>
            </div>
            {/* <span class="text-xs text-blue-600 font-semibold">+1</span> */}
          </div>

          {/* <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-file-alt text-purple-600"></i>
              </div>
              <div>
                <p class="text-sm text-gray-600">Documents</p>
                <p class="font-semibold text-gray-900">{documents}</p>
              </div>
            </div>
            <span class="text-xs text-amber-600 font-semibold">+5</span>
          </div> */}

          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Paperclip />
              </div>
              <div>
                <p class="text-sm text-gray-600">Approved Leaves</p>
                <p class="font-semibold text-gray-900">{ApprovedLeaves}</p>
              </div>
            </div>
            <span class="text-xs text-red-600 font-semibold">
              Action needed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quick_Stats;
