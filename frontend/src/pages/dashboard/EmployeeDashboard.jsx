import Cards from "../../components/common/cards";
import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegCalendar, FaRegClipboard } from "react-icons/fa6";
import { LiaTasksSolid } from "react-icons/lia";

function EmployeeDashboard() {
  const Carddata = [
    {
      id: 1,
      name: "Days Present",
      number: 30,
      icon: <FaRegCalendar />,
    },
    {
      id: 2,
      name: "Active Tasks",
      number: 2,
      icon: <LiaTasksSolid />,
    },
    {
      id: 3,
      name: "Pending Leaves",
      number: 5,
      icon: <FaRegClipboard />,
    },
    {
      id: 4,
      name: "Latest Payslip",
      number: "$1,000",
      icon: <BsCurrencyDollar />,
    },
  ];

  return (
    <div className="w-ful">
      <h1 className="text-xl font-medium tracking-tight">
        Welcome, Hamza Hayat !
      </h1>
      <p className="text-zinc-600 text-[12px]">
        Software Developer - Engineering
      </p>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6 w-full">
        <Cards Carddata={Carddata} />
      </div>

      {/* Task section */}
      <div class="py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Taks11 */}
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">My Tasks</h2>
                <a
                  href="#"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </a>
              </div>

              <div class="divide-y divide-gray-200">
                <div class="p-4 hover:bg-gray-50 transition flex items-start gap-4">
                  <input
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 rounded cursor-pointer mt-1"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <p class="font-semibold text-gray-900">
                        Design new dashboard mockup
                      </p>
                      <span class="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        High Priority
                      </span>
                    </div>
                    <p class="text-sm text-gray-600">
                      Update UI/UX for the employee dashboard
                    </p>
                    <div class="flex items-center gap-4 mt-3">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-user-circle text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-600">
                          Assigned by John Doe
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-600">Due: Today</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-4 hover:bg-gray-50 transition flex items-start gap-4">
                  <input
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 rounded cursor-pointer mt-1"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <p class="font-semibold text-gray-900">
                        Code review for authentication module
                      </p>
                      <span class="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                        Medium Priority
                      </span>
                    </div>
                    <p class="text-sm text-gray-600">
                      Review pull requests from the development team
                    </p>
                    <div class="flex items-center gap-4 mt-3">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-user-circle text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-600">
                          Assigned by Jane Smith
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-600">Due: Tomorrow</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-4 hover:bg-gray-50 transition flex items-start gap-4">
                  <input
                    type="checkbox"
                    class="w-5 h-5 text-gray-300 rounded cursor-pointer mt-1"
                    disabled=""
                  />
                  <div class="flex-1 opacity-60">
                    <div class="flex items-center gap-2 mb-2">
                      <p class="font-semibold text-gray-600 line-through">
                        Client presentation slides
                      </p>
                      <span class="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Completed
                      </span>
                    </div>
                    <p class="text-sm text-gray-500">
                      Prepare Q4 performance metrics slides
                    </p>
                    <div class="flex items-center gap-4 mt-3">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-user-circle text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-500">
                          Assigned by Mike Johnson
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-gray-400 text-sm"></i>
                        <span class="text-xs text-gray-500">
                          Due: Last Monday
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  + Add New Task
                </button>
              </div>
            </div>
            {/* Taks11 */}

            {/* Time Tracking */}
            {/* <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
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
            </div> */}
            {/* Time Tracking */}
          </div>

          {/* Quick Stats */}
          <div class="space-y-8 ">
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-bold text-gray-900">Quick Stats</h2>
              </div>

              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-tasks text-blue-600"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Completed Tasks</p>
                      <p class="font-semibold text-gray-900">24</p>
                    </div>
                  </div>
                  <span class="text-xs text-emerald-600 font-semibold">
                    +12%
                  </span>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-users text-emerald-600"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Team Members</p>
                      <p class="font-semibold text-gray-900">12</p>
                    </div>
                  </div>
                  <span class="text-xs text-blue-600 font-semibold">+1</span>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-file-alt text-purple-600"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Documents</p>
                      <p class="font-semibold text-gray-900">48</p>
                    </div>
                  </div>
                  <span class="text-xs text-amber-600 font-semibold">+5</span>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-exclamation-circle text-red-600"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Pending Approvals</p>
                      <p class="font-semibold text-gray-900">3</p>
                    </div>
                  </div>
                  <span class="text-xs text-red-600 font-semibold">
                    Action needed
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Stats */}
        </div>
      </div>
      {/* Task section */}
    </div>
  );
}

export default EmployeeDashboard;
