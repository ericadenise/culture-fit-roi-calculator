import { useState, useMemo } from "react";

export default function App() {
  const [inputs, setInputs] = useState({
    hires: 30,
    timeReduction: 12,
    dailyVacancyCost: 270,
    managerAnnualSalary: 125000,
    recruiterAnnualSalary: 85000,
    candidatesPerHire: 5,
    managerHoursPerCandidate: 5,
    recruiterHoursPerHire: 10,
    recruiterScreeningReduction: 0.3,
    productivityPct: 0.5,
    productiveDayValue: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const managerRate = useMemo(() => inputs.managerAnnualSalary / 2080, [inputs.managerAnnualSalary]);
  const recruiterRate = useMemo(() => inputs.recruiterAnnualSalary / 2080, [inputs.recruiterAnnualSalary]);

  const managerHoursSaved = inputs.hires * inputs.candidatesPerHire * inputs.managerHoursPerCandidate * 0.4;
  const recruiterHoursSaved = inputs.hires * inputs.recruiterHoursPerHire * inputs.recruiterScreeningReduction;

  const managerSavings = managerHoursSaved * managerRate;
  const recruiterSavings = recruiterHoursSaved * recruiterRate;
  const downtimeSavings = inputs.hires * inputs.timeReduction * inputs.productivityPct * inputs.productiveDayValue;
  const directCostSavings = inputs.hires * inputs.timeReduction * inputs.dailyVacancyCost;
  const totalSavings = managerSavings + recruiterSavings + downtimeSavings + directCostSavings;
  const totalHoursSaved = managerHoursSaved + recruiterHoursSaved;

  const labelMap = {
    hires: "Annual hires?",
    timeReduction: "Days to reduce hiring?",
    dailyVacancyCost: "Average daily vacancy cost?",
    managerAnnualSalary: "Average manager salary?",
    recruiterAnnualSalary: "Average recruiter salary?",
    candidatesPerHire: "Average candidates per hire?",
    managerHoursPerCandidate: "Average manager hours per candidate?",
    recruiterHoursPerHire: "Average recruiter hours per hire?",
    recruiterScreeningReduction: "Percent of screening time saved?",
    productivityPct: "Percent productivity during vacancy?",
    productiveDayValue: "Value of one productive day?",
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Culture Fit ROI Calculator</h1>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key}>
            <label className="block font-medium mb-1">
              {labelMap[key] || key}
            </label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>

      {/* Savings Breakdown - Two Columns */}
      <div className="bg-white shadow p-6 rounded space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Cost Savings */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium border-b pb-1">Cost Savings</h3>
            <p><strong>Manager Cost Savings:</strong> {formatCurrency(managerSavings)}</p>
            <p><strong>Recruiter Cost Savings:</strong> {formatCurrency(recruiterSavings)}</p>
            <p><strong>Direct Cost Savings:</strong> {formatCurrency(directCostSavings)}</p>
            <p><strong>Productivity Savings:</strong> {formatCurrency(downtimeSavings)}</p>
            <p className="text-xl font-bold pt-2"><strong>💰 Total ROI:</strong> {formatCurrency(totalSavings)}</p>
          </div>

          {/* Right Column: Hours Saved */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium border-b pb-1">Hours Saved</h3>
            <p><strong>Manager Hours Saved:</strong> {managerHoursSaved.toLocaleString()} hrs</p>
            <p><strong>Recruiter Hours Saved:</strong> {recruiterHoursSaved.toLocaleString()} hrs</p>
            <p><strong>Direct Cost Savings:</strong> N/A</p>
            <p><strong>Productivity Savings:</strong> N/A</p>
            <p className="text-xl font-bold pt-2"><strong>Total Hours Saved:</strong> {totalHoursSaved.toLocaleString()} hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
