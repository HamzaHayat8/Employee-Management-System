export const formatCurrency = (amount) => {
  if (amount == null) return "-";

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(amount);
};
