import React from "react";

function Time_Tracking() {
  return (
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900">Time Tracking</h2>
        <div class="flex gap-2">
          <button class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            Start Timer
          </button>
          <button class="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">
            Log Time
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">Today</p>
            <p class="text-2xl font-bold text-blue-600">7.5h</p>
          </div>
          <div class="text-center p-4 bg-emerald-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">This Week</p>
            <p class="text-2xl font-bold text-emerald-600">37.5h</p>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">This Month</p>
            <p class="text-2xl font-bold text-purple-600">154h</p>
          </div>
          <div class="text-center p-4 bg-amber-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">Billable</p>
            <p class="text-2xl font-bold text-amber-600">140h</p>
          </div>
        </div>

        <div class="flex items-end justify-between h-48 gap-2 p-4 bg-gray-50 rounded-lg">
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-blue-500 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Mon</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-blue-500 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Tue</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-blue-500 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Wed</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-blue-500 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Thu</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-blue-500 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Fri</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-gray-300 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Sat</span>
          </div>
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-full bg-gray-300 rounded-t"></div>
            <span class="text-xs text-gray-600 font-medium">Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Time_Tracking;
