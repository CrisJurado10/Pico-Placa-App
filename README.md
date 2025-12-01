# Pico y Placa Predictor

A robust, TDD-driven application to predict "Pico y Placa" driving restrictions in Quito, Ecuador. Built with **TypeScript** following **Clean Architecture** and **SOLID principles**.

## Features
- **Core Logic**: Accurately predicts driving eligibility based on Plate, Date, and Time.
- **Web Interface**: A clean, responsive UI built with **Tailwind CSS**.
- **Holiday Support**: Automatically detects Ecuadorian National Holidays (exempting restrictions).
- **Validation**: strict input validation for license plate formats (e.g., `PBC-1234`).
- **Reliability**: **100% Test Coverage** across unit and integration levels.

## Technologies
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Server**: [Express.js](https://expressjs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm

### Installation

1. Clone the repository:
   git clone https://github.com/CrisJurado10/Pico-Placa-App.git
   cd pico_placa
   ```

2. Install dependencies:
   npm install
   ```

### Running the Web App

Start the Express server:
npm start
```

Open your browser and visit:  
**http://localhost:3000**

Enter your license plate, date, and time to check if you can drive!

### Running Tests

This project adheres to strict TDD. You can run the full test suite (Core Logic Unit Tests + API Integration Tests) using:
npm test
```

To generate a coverage report:
npm run test:coverage
```

## Architecture
The project is structured to separate concerns strictly:

- **`src/core/`**: Pure business logic (Entities & Use Cases). Contains `PicoPlacaEvaluator` and `HolidayChecker` interface. Independent of frameworks.
- **`src/server.ts`**: The Entry point and API layer (Interface Adapter). Connects the core logic to the Web via Express.
- **`public/`**: The Presentation layer. A simple HTML/JS client styled with Tailwind.

## Rules Implemented
- **Morning Window**: 07:00 - 09:30
- **Afternoon Window**: 16:00 - 19:30
- **Weekends**: No restrictions.
- **Holidays**: No restrictions (National Holidays included).

**Plate Schedule:**
| Day | Restricted Last Digits |
|-----|------------------------|
| Monday | 1, 2 |
| Tuesday | 3, 4 |
| Wednesday | 5, 6 |
| Thursday | 7, 8 |
| Friday | 9, 0 |
