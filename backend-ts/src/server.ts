import express from 'express';
import cors from 'cors';
import db from './database';
import * as sqlite3 from 'sqlite3';
import { Flashcard, QuestionType } from './types';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Endpoint para buscar o próximo card de estudo
app.get("/api/cards/next", (req, res) => {
  const sql = "SELECT * FROM flashcards";
  db.all(sql, [], (err, rows: Flashcard[]) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }

    // Desserializa campos JSON
    const parsedRows = rows.map(row => ({
      ...row,
      options: row.options ? JSON.parse(row.options as any) : undefined,
      missingParts: row.missingParts ? JSON.parse(row.missingParts as any) : undefined,
      draggableItems: row.draggableItems ? JSON.parse(row.draggableItems as any) : undefined,
      droppableAreas: row.droppableAreas ? JSON.parse(row.droppableAreas as any) : undefined,
    }));

    // Lógica de seleção ponderada
    const pool: Flashcard[] = [];
    parsedRows.forEach(card => {
      const weight = (card.difficulty || 0) + 1;
      for (let i = 0; i < weight; i++) {
        pool.push(card);
      }
    });

    const selectedCard = pool[Math.floor(Math.random() * pool.length)];

    res.json({
      message: "success",
      data: selectedCard
    });
  });
});

// Endpoint para atualizar a dificuldade de um card
app.post("/api/cards/:id/answer", (req, res) => {
  const { status } = req.body; // 'easy' ou 'hard'
  const cardId = req.params.id;

  const getSql = "SELECT difficulty FROM flashcards WHERE id = ?";
  db.get(getSql, [cardId], (err, row: { difficulty: number }) => {
    if (err || !row) {
      return res.status(400).json({ "error": "Card não encontrado." });
    }

    let newDifficulty = row.difficulty;
    if (status === 'hard') {
      newDifficulty++;
    } else if (status === 'easy' && newDifficulty > 0) {
      newDifficulty--;
    }

    const updateSql = "UPDATE flashcards SET difficulty = ? WHERE id = ?";
    db.run(updateSql, [newDifficulty, cardId], function(this: sqlite3.RunResult, err) {
      if (err) {
        return res.status(400).json({ "error": err.message });
      }
      res.json({
        message: "success",
        newDifficulty: newDifficulty,
        changes: this.changes
      });
    });
  });
});

// Endpoint para adicionar um novo card
app.post("/api/cards", (req, res) => {
  const { question, answer, hint, difficulty, category, type, options, codeSnippet, missingParts, draggableItems, droppableAreas } = req.body;

  if (!question || !answer || !type) {
    return res.status(400).json({ error: "Campos 'question', 'answer' e 'type' são obrigatórios." });
  }

  // Validação específica para cada tipo de pergunta
  switch (type) {
    case 'text':
      // Não requer campos adicionais específicos além de question e answer
      break;
    case 'fill_in_the_code':
      if (!codeSnippet || !missingParts || missingParts.length === 0) {
        return res.status(400).json({ error: "Para 'fill_in_the_code', 'codeSnippet' e 'missingParts' são obrigatórios." });
      }
      break;
    case 'multiple_choice':
      if (!options || options.length < 2) {
        return res.status(400).json({ error: "Para 'multiple_choice', 'options' deve ser uma array com pelo menos duas opções." });
      }
      break;
    case 'drag_and_drop':
      if (!draggableItems || draggableItems.length === 0 || !droppableAreas || droppableAreas.length === 0) {
        return res.status(400).json({ error: "Para 'drag_and_drop', 'draggableItems' e 'droppableAreas' são obrigatórios." });
      }
      break;
    default:
      return res.status(400).json({ error: "Tipo de pergunta inválido." });
  }

  const insertSql = `INSERT INTO flashcards (
    question, answer, hint, difficulty, category, type, options, codeSnippet, missingParts, draggableItems, droppableAreas
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    insertSql,
    [
      question,
      answer,
      hint || null,
      difficulty || 0,
      category || null,
      type,
      options ? JSON.stringify(options) : null,
      codeSnippet || null,
      missingParts ? JSON.stringify(missingParts) : null,
      draggableItems ? JSON.stringify(draggableItems) : null,
      droppableAreas ? JSON.stringify(droppableAreas) : null,
    ],
    function(this: sqlite3.RunResult, err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        message: "Card adicionado com sucesso",
        id: this.lastID,
      });
    }
  );
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});

