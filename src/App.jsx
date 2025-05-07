import { useState } from "react";

export default function App() {
  const [inputs, setInputs] = useState({
    hires: 30,
    timeReduction: 12,
    dailyVacancyCost: 270,
    managerRate: 60,
    recruiterRate: 40,
    candidatesPerHire: 5,
    managerHoursPerCandidate: 5,
    recruiterHoursPerHire: 10,
    recruiterScreeningReduction: 30, // stored as %
    productivityPct: 50, // stored as %
    productiveDayValue: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const customLabels = {
    hires: "Hires (per year)",
    managerRate: "Manager Hourly Rate (USD/hr)",
    recruiterRate: "Recruiter Hourly Rate (USD/hr)",
    recruiterScreeningReduction: "Recruiter Screening Reduction (%)",
    productivityPct: "Productivity Replacement (%)",
    productiveDayValue: "Productive Day Value ($/day)",
    dailyVacancyCost: "Daily Cost per Vacancy ($/day)",
    timeReduction: "Time-to-Hire Reduction (days)",
    candidatesPerHire: "Candidates Interviewed per Hire",
    managerHoursPerCandidate: "Manager Hours per Candidate",
    recruiterHoursPerHire: "Recruiter Hours per Hire",
  };

  const recruiterReduction = inputs.recruiterScreeningReduction / 100;
  const productivity = inputs.productivityPct / 100;

  const managerSavings =
    inputs.hires *
    inputs.candidatesPerHire *
    inputs.managerHoursPerCandidate *
    0.4 *
    inputs.managerRate;

  const recruiterSavings =
    inputs.hires *
    inputs.recruiterHoursPerHire *
    recruiterReduction *
    inputs.recruiterRate;

  const downtimeSavings =
    inputs.hires *
    inputs.timeReduction *
    productivity *
    inputs.productiveDayValue;

  const directCostSavings =
    inputs.hires * inputs.timeReduction * inputs.dailyVacancyCost;

  const totalSavings =
    managerSavings + recruiterSavings + downtimeSavings + directCostSavings;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Culture Fit ROI Calculator
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {customLabels[key] || key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6 space-y-3">
        <p>
          <strong>Direct Cost Savings:</strong> $
          {directCostSavings.toLocaleString()}
        </p>
        <p>
          <strong>Manager Time Savings:</strong> $
          {managerSavings.toLocaleString()}
        </p>
        <p>
          <strong>Recruiter Time Savings:</strong> $
          {recruiterSavings.toLocaleString()}
        </p>
        <p>
          <strong>Downtime Savings:</strong> $
          {downtimeSavings.toLocaleString()}
        </p>
        <hr />
        <p className="text-xl font-bold">
          <strong>Total ROI:</strong> ${totalSavings.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
