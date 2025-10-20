import sqlite3 from 'sqlite3';
import { Flashcard } from './types';

const DBSOURCE = 'grimorio.db';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS flashcards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      hint TEXT,
      difficulty INTEGER NOT NULL DEFAULT 0,
      category TEXT,
      type TEXT NOT NULL,
      options TEXT,
      codeSnippet TEXT,
      missingParts TEXT,
      draggableItems TEXT,
      droppableAreas TEXT
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela flashcards:', err.message);
      } else {
        console.log('Tabela "flashcards" criada ou já existente.');
      }
    });
  }
});

export default db;

