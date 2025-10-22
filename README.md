# 🧙‍♂️ Project Documentation: *The Programmer's Spellbook*

## 1. Overview

**The Programmer's Spellbook** is a full-stack application designed to support programming learning through interactive flashcards.  
The project consists of three main parts:

- **Backend (Node.js + Express):**  
  Manages the SQLite database, applies business logic (such as adaptive difficulty), and exposes a **REST API** for the frontend.

- **Frontend (React):**  
  Presents a dark-fantasy themed UI, consumes the backend API, and handles user interactions (showing cards, revealing answers, and collecting feedback).

- **Database (SQLite):**  
  Stores flashcards, categories, and difficulty level. Using SQLite simplifies setup since it's a file-based database (`grimorio.db`).

**Data Flow:**  
`Frontend (React)` ⟷ `REST API (Node.js / Express)` ⟷ `SQLite (grimorio.db)`

---

## 2. Project Structure

```
grimorio-projeto/
├── backend/
│   ├── database.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── DOCUMENTATION.md
```

---

## 3. Backend — Node.js, Express and SQLite

### 3.1 Installation

1. Open a terminal and go to the backend folder:
   ```bash
   cd grimorio-projeto/backend
   ```
2. Install dependencies (important — this step is required before running the server):
   ```bash
   npm install
   ```
   or, if you prefer to install specific packages:
   ```bash
   npm install express sqlite3 cors
   ```

---

### 3.2 Database (`database.js`)

This file creates and initializes `grimorio.db` and the `flashcards` table (if not present). Each flashcard has:
- `pergunta` (question), `resposta` (answer), `dica` (hint),
- `categoria` (category: Basic, Intermediate, Advanced, etc.),
- `dificuldade` (difficulty counter used to adjust card selection).

---

### 3.3 Seed Script (`seed.js`)

`seed.js` populates the database with initial flashcards. It clears the `flashcards` table before inserting to avoid duplicates.

**Customization:**  
You are free to edit questions, answers, hints, and categories to fit your study needs. Change or add cards in `seed.js` as you learn new topics (algorithms, SQL, APIs, data structures, etc.).

To run the seed script:
```bash
node seed.js
```

After running it, `grimorio.db` will contain the flashcards defined in the script.

---

## 4. Run the Backend Server

1. In the backend folder, install dependencies if not done:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. By default, the server will run at:
   ```
   http://localhost:3001
   ```

The frontend will call this endpoint to fetch and update flashcards.

---

## 5. Frontend — React

### 5.1 Setup & Run

1. Open a terminal and go to the frontend folder:
   ```bash
   cd grimorio-projeto/frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

This will run the React app (usually at `http://localhost:3000`) and connect to the backend API.

---

## 6. Final Notes

The Spellbook was built as a practice and review tool for programmers. It's modular and easy to extend — add new routes, categories, or learning modes as needed.

✨ **Tip:** Keep `seed.js` updated with your own flashcards to tailor the tool to your study goals — it's your personal learning grimorium.

---

If you'd like, I can also add a short section showing how to add flashcards via the API (`POST /flashcards`) or generate a downloadable `DOCUMENTATION.md` in the project root.
