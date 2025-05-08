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
    recruiterHoursPerHire: "Average recruiter hours per
