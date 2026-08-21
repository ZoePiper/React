# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Study Tracker

## Overview

Study Tracker is a fullstack web application that helps developers track their learning progress across courses, tutorials, and learning paths.

Users can:

- Search studies
- Filter studies by status, category, and direction
- View learning progress
- Navigate through paginated results
- Follow recommended next learning steps
- Open course links directly from the application

The application was built to practice fullstack development concepts including REST APIs, filtering, pagination, React state management, and component architecture.

---

## Features

### Search

Search studies by:

- Title
- Platform
- Category
- Direction
- Status

Example:

```text
React
JavaScript
Frontend
```

---

### Filtering

Users can filter studies by:

#### Status

- Not Started
- In Progress
- Completed

#### Category

Examples:

- HTML
- CSS
- JavaScript
- React
- Node.js
- Docker

#### Direction

- Frontend
- Backend
- Fullstack
- AI Engineering

---

### Pagination

Large result sets are split into pages.

Users can navigate using:

- Previous
- Next

Pagination automatically updates when filters change.

---

### Progress Tracking

Each study contains:

```text
0 - 100%
```

A visual progress bar displays completion progress.

---

### Clickable Tags

Categories are displayed as clickable tags.

Clicking a tag automatically filters the study list.

Example:

```text
[React]
```

Filters all React-related studies.

---

### Next Learning Step

Each study contains a recommended next step.

Example:

```text
HTML + CSS
↓
JavaScript
↓
React
↓
Next.js
```

This creates a learning roadmap inside the application.

---

## Tech Stack

### Frontend

- React
- JavaScript
- CSS
- Vite

### Backend

- Node.js
- Express
- REST API

---

## Project Structure

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── StudyCard.jsx
│   │   └── Pagination.jsx
│   ├── App.jsx
│   └── App.css
```

### Backend

```text
backend/
├── data/
│   └── studies.js
├── server.js
└── package.json
```

Future scalable structure:

```text
backend/
├── routes/
├── controllers/
├── services/
├── data/
└── server.js
```

---

## API

### Endpoint

```http
GET /api/studies
```

### Query Parameters

| Parameter | Description        |
| --------- | ------------------ |
| search    | Search term        |
| status    | Study status       |
| category  | Study category     |
| direction | Learning direction |
| page      | Current page       |
| limit     | Results per page   |

Example:

```http
/api/studies?search=react&status=Completed&page=1&limit=6
```

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Learning Outcomes

This project helped me practice:

### React

- useState
- useEffect
- Component architecture
- Props
- Conditional rendering
- Dynamic styling
- Event handling

### Backend

- Express
- REST APIs
- Query parameters
- Filtering
- Pagination
- API design

### Debugging

Learned how to troubleshoot:

- Missing imports
- Module resolution errors
- State management issues
- API communication issues
- React rendering errors
- Data structure inconsistencies

### Fullstack Development

Learned how:

```text
React
↓
Fetch API
↓
Express API
↓
Data source
```

works together as a complete application.

---

## Future Improvements

Planned improvements:

- PostgreSQL database
- Docker support
- User authentication
- Save progress updates
- Create/Edit/Delete studies
- User accounts
- Dark mode
- Deployment to Vercel and Render

---

## Author

Created as a fullstack learning project to practice React, Node.js, Express, filtering, pagination, and scalable application architecture.

## Live Demo

Frontend:
https://...

Backend API:
https://...
