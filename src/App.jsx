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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Culture Fit ROI Calculator</h1>

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

      {/* Output Table */}
      <div className="bg-white shadow p-4 rounded space-y-3 mt-6">
        <h2 className="text-xl font-semibold mb-4">Savings Breakdown</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 font-medium">Category</th>
                <th className="py-2 pr-4 font-medium">Cost Savings</th>
                <th className="py-2 pr-4 font-medium">Hours Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">Manager Cost Savings</td>
                <td className="py-2 pr-4">{formatCurrency(managerSavings)}</td>
                <td className="py-2 pr-4">{managerHoursSaved.toLocaleString()} hrs</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Recruiter Cost Savings</td>
                <td className="py-2 pr-4">{formatCurrency(recruiterSavings)}</td>
                <td className="py-2 pr-4">{recruiterHoursSaved.toLocaleString()} hrs</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Direct Cost Savings</td>
                <td className="py-2 pr-4">{formatCurrency(directCostSavings)}</td>
                <td className="py-2 pr-4">—</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Productivity Savings</td>
                <td className="py-2 pr-4">{formatCurrency(downtimeSavings)}</td>
                <td className="py-2 pr-4">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-xl">💰 Total ROI</td>
                <td className="py-2 pr-4 font-bold text-xl">{formatCurrency(totalSavings)}</td>
                <td className="py-2 pr-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
