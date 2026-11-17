
import {
  classifyOccupation
} from "../dist/occupation-classifier.js";

const jobTitles = [
  "Software Engineer",
  "Registered Nurse",
  "Financial Analyst",
  "Digital Marketing Manager",
  "Civil Engineer",
  "Hotel Manager",
  "Logistics Manager"
];

for (const title of jobTitles) {
  const result = classifyOccupation(title);

  console.log("\n----------------------------");
  console.log("Occupation:", result.input);
  console.log("Category:", result.category);
  console.log("Confidence indicator:", result.confidence);
  console.log("Matched terms:", result.matchedTerms);
  console.log("Explanation:", result.explanation);
}
