## Description

This is a React frontend application (bootstrapped with Create React App) for a sample e-commerce/course project. It includes pages such as Home, Category, Product Detail, Cart, Login/Register, Payment, User Profile, Search, and more.

## Requirements

- Node.js (recommended >= 14) and npm or Yarn
- Optional: a running backend API — see `src/services/Api.js` to configure the `baseURL` and endpoints

## Installation

1. Open a terminal in the project root (the folder that contains `package.json`).
2. Install dependencies:

```bash
npm install
# or with yarn
# yarn install
```

## Running in Development

Start the development server with hot reload:

```bash
npm start
```

The app will open at http://localhost:3000 by default.

## Build for Production

Create an optimized production build:

```bash
npm run build
```

The production build will be created in the `build/` directory.

## Running Tests

If the project contains tests, run:

```bash
npm test
```

## Environment & API Configuration

- To configure environment variables, create a `.env` file in the project root and add the required variables.
- Check and update `src/services/Api.js` to point the `baseURL` to your backend server if it runs on a different host.

Then in `src/services/Api.js` you can read `process.env.REACT_APP_API_BASE_URL`.

## Project Structure (overview)

- `public/` — static files (index.html, global CSS, fonts, images)
- `src/` — React source code:
  - `pages/` — page components
  - `shared/` — shared components
  - `services/` — API clients and helpers (`src/services/Api.js`)
  - `redux-setup/` — store and reducers

## Notes

- Ensure the backend/API is running and `baseURL` in `src/services/Api.js` points to the correct address to avoid CORS or data-fetching issues.
- To deploy, you can host the `build/` directory on services like Netlify, Vercel, or any static hosting.


---

## Getting Started with Create React App

This project was bootstrapped with Create React App.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode. Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes. You may also see lint errors in the console.

#### `npm test`

Launches the test runner in interactive watch mode. See the Create React App docs for more information.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

#### `npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back. See Create React App docs for details.

See the Create React App documentation: https://facebook.github.io/create-react-app/docs/getting-started

