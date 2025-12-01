# 🚗 Pico y Placa Predictor

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-TypeScript_|_Express_|_Docker-blue)
![License](https://img.shields.io/badge/license-MIT-grey)

A robust, **TDD-driven** application designed to predict "Pico y Placa" driving restrictions in Quito, Ecuador. Built with **TypeScript**, strictly following **Clean Architecture** and **SOLID principles**.

## ✨ Features

- **🧠 Core Logic**: Accurately predicts driving eligibility based on Plate, Date, and Time.
- **💻 Web Interface**: A clean, responsive UI built with **Tailwind CSS**.
- **🎉 Holiday Support**: Automatically detects Ecuadorian National Holidays (exempting restrictions).
- **🛡️ Validation**: Strict input validation for license plate formats (e.g., `PBC-1234`).
- **✅ Reliability**: **100% Test Coverage** across unit and integration levels.
- **🐳 Dockerized**: Ready for deployment with an optimized multi-stage Dockerfile.

## 🛠️ Technologies

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Server**: [Express.js](https://expressjs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)
- **Linting/Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Containerization**: [Docker](https://www.docker.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/CrisJurado10/Pico-Placa-App.git](https://github.com/CrisJurado10/Pico-Placa-App.git)
   cd Pico-Placa-App
Install dependencies:Bashnpm install
🏁 Running the Web AppStart the Express server:Bashnpm start
Open your browser and visit:👉 http://localhost:3000Enter your license plate, date, and time to check if you can drive!🧪 Running TestsThis project adheres to strict Test Driven Development (TDD). You can run the full test suite (Core Logic Unit Tests + API Integration Tests) using:Bashnpm test
To generate a detailed code coverage report:Bashnpm run test:coverage
Linting & FormattingMaintain code quality and consistency with the configured tools:Check for linting errors:Bashnpm run lint
Format code automatically:Bashnpm run format
🐳 Docker SupportBuild and run the application in a containerized environment using the optimized multi-stage Dockerfile:Build the image:Bashdocker build -t pico-placa-app .
Run the container:Bashdocker run -p 3000:3000 pico-placa-app
Access the app at http://localhost:3000.🏗️ ArchitectureThe project is structured to separate concerns strictly, ensuring maintainability and scalability:src/core/: Pure Business Logic (Entities & Use Cases). Contains PicoPlacaEvaluator and the HolidayChecker interface. This layer is independent of frameworks.src/server.ts: Interface Adapter. The entry point and API layer. Connects the core logic to the Web via Express.public/: Presentation Layer. A simple HTML/JS client styled with Tailwind CSS.📏 Rules ImplementedBased on current regulations for Quito, Ecuador:Morning Window: 07:00 - 09:30Afternoon Window: 16:00 - 19:30Weekends: No restrictions.Holidays: No restrictions (National Holidays included).Plate Schedule:DayRestricted Last DigitsMonday1, 2Tuesday3, 4Wednesday5, 6Thursday7, 8Friday9, 0👤 AuthorCristian JuradoGitHub: @CrisJurado10
