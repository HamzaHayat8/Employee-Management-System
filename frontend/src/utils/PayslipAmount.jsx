export const getPayslipAmount = (payslip) => {
  console.log("Calculating payslip amount for:", payslip);
  if (!payslip) return 0;
  const { basicSalary, allowances, deductions } = payslip;
  return Number(basicSalary) + Number(allowances) - Number(deductions);
};
