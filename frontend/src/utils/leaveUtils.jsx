export const getTotalDays = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);
  return (end - start) / (1000 * 60 * 60 * 24) + 1;
};

export const getStatusStyles = (status) => {
  const base = "px-2 py-1 rounded text-xs font-medium";

  switch (status) {
    case "Approved":
      return `${base} bg-green-100 text-green-700`;
    case "Pending":
      return `${base} bg-yellow-100 text-yellow-700`;
    case "Rejected":
      return `${base} bg-red-100 text-red-700`;
    default:
      return base;
  }
};
