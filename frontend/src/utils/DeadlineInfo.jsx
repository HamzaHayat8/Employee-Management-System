export const getDeadlineInfo = (dueDate) => {
  if (!dueDate) return { text: "N/A", isOverdue: false };

  const today = new Date();
  const due = new Date(dueDate);

  // Remove time part for accurate day comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = today - due;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return {
      text: `${diffDays} day${diffDays > 1 ? "s" : ""} overdue`,
      isOverdue: true,
    };
  }

  if (diffDays === 0) {
    return {
      text: "Due today",
      isOverdue: false,
    };
  }

  return {
    text: `Due in ${Math.abs(diffDays)} day${
      Math.abs(diffDays) > 1 ? "s" : ""
    }`,
    isOverdue: false,
  };
};
