export const getTotalDays = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end - start;

  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const getStatusStyles = (status) => {
  const base = "px-2 py-1 rounded text-xs font-medium";

  switch (status) {
    case "approved":
      return `${base} bg-green-100 text-green-700`;
    case "pending":
      return `${base} bg-yellow-100 text-yellow-700`;
    case "rejected":
      return `${base} bg-red-100 text-red-700`;
    default:
      return base;
  }
};
