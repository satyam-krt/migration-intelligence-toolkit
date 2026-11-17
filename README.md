
# Global Migration Intelligence Toolkit

An open-source developer toolkit for occupation classification, country intelligence and labour-market data processing.

## Overview

The Global Migration Intelligence Toolkit aims to provide reusable software components for developers and researchers working with international employment, migration information and labour-market intelligence.

The project focuses on transparency, explainability, extensibility and accessible data structures.

## Current Features

### Occupation Classification

A TypeScript-based rule-driven occupation classifier.

Current capabilities:

- Classifies job titles into broad occupation categories.
- Supports keyword-based matching.
- Returns matched terms.
- Provides an explanation for classifications.
- Returns a confidence indicator.
- Handles unknown occupation titles.
- Provides a list of supported categories.

The confidence indicator is a heuristic, not a statistically calibrated probability.

## Supported Categories

- Technology
- Engineering
- Healthcare
- Finance
- Education
- Sales
- Marketing
- Hospitality
- Construction
- Transportation
- Administration
- Other

## Installation

Requirements:

- Node.js 20 or later
- npm

Clone the repository:

```bash
git clone https://github.com/satyam-krt/migration-intelligence-toolkit.git

cd migration-intelligence-toolkit
```

Install dependencies:

```bash
npm install
```

## Build

```bash
npm run build
```

The compiled JavaScript and TypeScript declarations are generated in the `dist` directory.

## Run Tests

```bash
npm test
```

## Example

```javascript
import {
  classifyOccupation
} from "./dist/occupation-classifier.js";

const result = classifyOccupation("Software Engineer");

console.log(result);
```

Example result:

```json
{
  "input": "Software Engineer",
  "normalizedTitle": "software engineer",
  "category": "technology",
  "matchedTerms": ["software engineer"],
  "confidence": 0.95,
  "explanation": "The title matches a technology, software, data, or IT-related occupation."
}
```

## Project Roadmap

| Module | Purpose | Status |
| --- | --- | --- |
| Occupation Classification | Rule-based job-title classification | Initial implementation |
| Country Intelligence | Structured country information | Planned |
| Labour Market Analytics | Employment and demand indicators | Planned |
| Migration Scoring | Explainable opportunity comparisons | Planned |
| Data Schemas | Standardised migration data structures | Planned |
| Documentation | Developer guides and examples | In progress |

## Technology

- TypeScript
- Node.js
- JavaScript
- JSON
- GitHub Actions
- Open-source development tools

## Limitations

The current occupation classifier uses manually defined keyword rules.

It is not yet mapped to a validated international occupational taxonomy such as ISCO or a national occupation classification.

It may misclassify ambiguous, specialised or region-specific job titles.

The toolkit does not independently verify visa eligibility, employment demand or immigration regulations.

## Responsible Use

This toolkit is intended for research, software development and informational purposes.

It does not provide legal immigration advice or guarantee employment, visa eligibility or migration outcomes.

Applications using this toolkit should verify important information against authoritative and current sources.

## Contributing

Contributions, bug reports, feature suggestions and technical feedback are welcome.

Please open an issue before proposing substantial changes.

## Licence

MIT License. See the LICENSE file.
