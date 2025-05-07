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
    recruiterScreeningReduction: "Recruiter Time Saved (%)",
    productivityPct: "Vacancy Productivity Loss (%)",
    productiveDayValue: "Value of One Productive Employee per Day ($)",
    dailyVacancyCost: "Daily Cost per Vacancy ($/day)",
    timeReduction: "Time-to-Hire Reduction (days)",
    candidatesPerHire: "Candidates Interviewed per Hire",
    managerHoursPerCandidate: "Manager Hours per Candidate",
    recruiterHoursPerHire: "Recruiter Hours per Hire",
  };

  // Convert percentages
  const recruiterReduction = inputs.recruiterScreeningReduction / 100;
  const productivity = inputs.productivityPct / 100;

  // $ Savings
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

  // Time Savings (in hours)
  const managerTimeSavedHours = managerSavings / inputs.managerRate;
  const recruiterTimeSavedHours = recruiterSavings / inputs.recruiterRate;
  const totalTimeSaved = managerTimeSavedHours + recruiterTimeSavedHours;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
  The Culture Fit ROI Calculator
</h1>

<p className="text-center text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
  Discover How Much You Can Save When Cultural Integrity Drives Hiring
</p>


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

      {/* Two Column Output */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* $ Savings Column */}
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

        {/* Time Savings Column */}
        <div className="bg-white rounded-lg shadow p-6 space-y-3">
          <p>
            <strong>Manager Time Saved:</strong>{" "}
            {managerTimeSavedHours.toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}{" "}
            hours/year
          </p>
          <p>
            <strong>Recruiter Time Saved:</strong>{" "}
            {recruiterTimeSavedHours.toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}{" "}
            hours/year
          </p>
          <hr />
          <p className="text-xl font-bold">
            <strong>Total Time Saved:</strong>{" "}
            {totalTimeSaved.toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}{" "}
            hours/year
          </p>
        </div>
      </div>
    </div>
  );
}
