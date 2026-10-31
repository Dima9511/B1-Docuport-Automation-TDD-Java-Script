# Docuport Automation — TDD (Playwright + JavaScript)

UI test automation for **Docuport** (https://beta.docuport.app), built with **Playwright Test** in JavaScript.
The framework uses the **Page Object Model (POM)**, custom **fixtures**, **environment files** for URLs and credentials, and **JSON test data** for expected results.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Project structure](#project-structure)
5. [How the framework works](#how-the-framework-works)
6. [Tests](#tests)
7. [Running tests](#running-tests)
8. [Environments](#environments)
9. [Reports](#reports)
10. [Git workflow](#git-workflow)
11. [CI — Jenkins](#ci--jenkins)
12. [Troubleshooting](#troubleshooting)

---

## Tech stack

| Tool | Why it is here |
|---|---|
| **Node.js** (LTS) | Runs JavaScript outside the browser |
| **Playwright Test** | Test runner + browser automation |
| **dotenv** | Loads URL + credentials from `.env.<env>` into `process.env` |
| **cross-env** | Sets `TEST_ENV` / `HEADLESS` the same way on Mac, Linux and Windows |
| **allure-playwright** + **allure-commandline** | Allure HTML report (needs **Java 8+**) |

---

## Prerequisites

Run each command in a terminal. A version number means it is installed.

```bash
node -v      # v20 or newer
npm -v
npx -v
git -v
java -version   # only for Allure
```

---

## Setup

### 1. Clone and open

```bash
git clone <repo-url>
cd b#-docuport-automation-tdd-js
code .
```

### 2. Install packages + browser

```bash
npm install
npx playwright install chromium
```

### 3. Create `.env.beta` in the project root

Ask your instructor for the real values. **Never commit this file.**

```
# KEY=value — no quotes, no spaces around =
DOCUPORT_BASE_URL=https://beta.docuport.app
DOCUPORT_CLIENT_USERNAME=<client username>
DOCUPORT_CLIENT_PASSWORD=<client password>
DOCUPORT_EMPLOYEE_USERNAME=<employee username>
DOCUPORT_EMPLOYEE_PASSWORD=<employee password>
DOCUPORT_ADVISOR_USERNAME=<advisor username>
DOCUPORT_ADVISOR_PASSWORD=<advisor password>
DOCUPORT_SUPERVISOR_USERNAME=<supervisor username>
DOCUPORT_SUPERVISOR_PASSWORD=<supervisor password>
```

### 4. Check it works

```bash
npm run test:all
```

---

## Project structure

```
b#-docuport-automation-tdd-js/
├── data/
│   ├── beta_data.json             # expected data for beta: roles, left menu, invalid logins
│   └── pre_data.json              # same shape, pre values
├── pages/                         # page objects (POM)