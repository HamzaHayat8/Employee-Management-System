export const getPayslipAmount = (payslip) => {
  if (!payslip) return 0;
  console.log("Calculating payslip amount for:", payslip);
  const { basicSalary, allowances, deductions } = payslip;
  return Number(basicSalary) + Number(allowances) - Number(deductions);
};
