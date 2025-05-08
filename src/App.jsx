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

  // Derived hourly rates from annual salary
  const managerRate = useMemo(() => inputs.managerAnnualSalary / 2080, [inputs.managerAnnualSalary]);
  const recruiterRate = useMemo(() => inputs.recruiterAnnualSalary / 2080, [inputs.recruiterAnnualSalary]);

  // Savings Calculations
  const managerSavings = inputs.hires * inputs.candidatesPerHire * inputs.managerHoursPerCandidate * 0.4 * managerRate;
  const recruiterSavings = inputs.hires * inputs.recruiterHoursPerHire * inputs.recruiterScreeningReduction * recruiterRate;
  const downtimeSavings = inputs.hires * inputs.timeReduction * inputs.productivityPct * inputs.productiveDayValue;
  const directCostSavings = inputs.hires * inputs.timeReduction * inputs.dailyVacancyCost;
  const totalSavings = managerSavings + recruiterSavings + downtimeSavings + directCostSavings;

  const labelMap = {
    hires: "Number of Hires",
    timeReduction: "Time to Fill Reduction (days)",
    dailyVacancyCost: "Daily Vacancy Cost ($)",
    managerAnnualSalary: "Manager Annual Salary ($)",
    recruiterAnnualSalary: "Recruiter Annual Salary ($)",
    candidatesPerHire: "Candidates per Hire",
    managerHoursPerCandidate: "Manager Hours per Candidate",
    recruiterHoursPerHire: "Recruiter Hours per Hire",
    recruiterScreeningReduction: "Recruiter Screening Time Saved (%)",
    productivityPct: "Productivity % During Vacancy",
    productiveDayValue: "Value of a Productive Day ($)",
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Culture Fit ROI Calculator</h1>

      {Object.entries(inputs).map(([key, value]) => (
        <div key={key}>
          <label className="block font-medium">
            {labelMap[key] || key.replace(/([A-Z])/g, " $1")}
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

      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Direct Cost Savings:</strong> ${directCostSavings.toLocaleString()}</p>
        <p><strong>Manager Time Savings:</strong> ${managerSavings.toLocaleString()}</p>
        <p><strong>Recruiter Time Savings:</strong> ${recruiterSavings.toLocaleString()}</p>
        <p><strong>Downtime Savings:</strong> ${downtimeSavings.toLocaleString()}</p>
        <p className="text-xl font-bold"><strong>Total ROI:</strong> ${totalSavings.toLocaleString()}</p>
      </div>
    </div>
  );
}
