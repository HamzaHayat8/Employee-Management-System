import React from "react";

function MyTaks({ tasks }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">My Tasks</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            const isCompleted = task.status === "completed";

            return (
              <div
                key={task._id}
                className="p-4 hover:bg-gray-50 transition flex items-start gap-4"
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  readOnly
                  className="w-5 h-5 text-blue-600 rounded mt-1"
                />

                <div className={`flex-1 ${isCompleted ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <p
                        className={`font-semibold ${
                          isCompleted
                            ? "text-gray-600 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </p>

                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{task.status}</p>
                  </div>

                  <p
                    className={`text-sm ${
                      isCompleted ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    {task.description}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="text-gray-500">
                      Assigned: {task.employeeId?.email}
                    </span>

                    <span className="text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-4 text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default MyTaks;
