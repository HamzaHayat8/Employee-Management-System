import React from "react";
import { Button } from "../components/common/button";
import { useGetbyIdQuery } from "../services/payslip/payslip.api";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loading";

export default function PrintPayslip() {
  const { _id } = useParams();

  const { data: payslip, isLoading } = useGetbyIdQuery(_id);
  const alldata = payslip?.payslip || {};

  const netSalary =
    alldata.basicSalary + alldata.allowances - alldata.deductions;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="p-8 md:p-2">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              PAYSLIP
            </h1>
          </div>

          <div className="border-t border-zinc-200 my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Employee Name
              </p>
              <p className="mt-1 text-md font-semibold text-slate-900">
                {alldata.employeeId?.first_name}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Position
              </p>
              <p className="mt-1 text-md font-semibold text-slate-900">
                {alldata.employeeId?.position}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Email
              </p>
              <p className="mt-1 text-md font-semibold text-slate-900">
                {alldata.employeeId?.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Period
              </p>
              <p className="mt-1 text-md font-semibold text-slate-900">
                {alldata.month} {alldata.year}
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200">
            <div className="grid grid-cols-2 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-500 uppercase tracking-wide">
              <span>Description</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="divide-y divide-zinc-200">
              <div className="grid grid-cols-2 px-5 py-4 text-base">
                <span className="text-slate-700">Basic Salary</span>
                <span className="text-right font-semibold">
                  {alldata.basicSalary}
                </span>
              </div>
              <div className="grid grid-cols-2 px-5 py-4 text-base">
                <span className="text-slate-700">Allowances</span>
                <span className="text-right font-semibold text-emerald-600">
                  {alldata.allowances}
                </span>
              </div>
              <div className="grid grid-cols-2 px-5 py-4 text-base">
                <span className="text-slate-700">Deductions</span>
                <span className="text-right font-semibold text-rose-600">
                  -{alldata.deductions}
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-200 bg-slate-50 grid grid-cols-2 px-5 py-5">
              <span className="font-bold text-slate-900">Net Salary</span>
              <span className="text-right text-3xl font-bold text-slate-900">
                ${netSalary.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-10 print:hidden">
            <Button
              onClick={() => window.print()}
              className="px-8 py-6 text-base rounded-xl bg-violet-600 hover:bg-violet-700"
            >
              Print Payslip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
