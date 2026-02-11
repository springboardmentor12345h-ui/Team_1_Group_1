# Campus Event Hub

Campus Event Hub is a MERN-based inter-college event management platform where:

* Students can browse and register for events
* College admins can manage events and participants
* Feedback and interaction improve engagement

---

## 🚀 Project Status

### ✅ Initial Scaffold Completed

The following setup has been completed:

#### Backend

* Node.js + Express server initialized
* MongoDB connection configured
* Basic server running successfully
* Clean folder structure created

#### Frontend

* React app created using **Vite**
* Dependencies installed
* Default project running successfully

#### Repository

* Monorepo structure with:

  * `backend/`
  * `frontend/`
* Root `.gitignore` configured
* Ready for team branching and development

---

## 📁 Project Structure

```
campus-event-hub/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ▶️ How to Run the Project

### 1️⃣ Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧩 Current Development Phase

**Milestone 1 – Authentication System**

Upcoming work includes:

* Student & Admin registration/login
* JWT authentication
* Role-based dashboards
* Protected routes

---

## 👥 Team Workflow

* `main` branch is **protected**
* Each member must:

  1. Create their own feature branch
  2. Push code to that branch
  3. Create a Pull Request to `main`

❌ No direct pushes to `main`.



