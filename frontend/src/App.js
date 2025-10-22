import React, { useState, useEffect, useCallback } from 'react';
import FlashcardDisplay from './components/FlashcardDisplay';
import './App.css';

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints, setMaxHints] = useState(3);
  const [cardStats, setCardStats] = useState({
    totalCards: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });

  const API_BASE_URL = 'http://localhost:4000/api';

  const fetchNextCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsAnswerRevealed(false);
    setUserAnswerInput('');
    setFeedbackMessage(null);
    setHintsUsed(0);
    setMaxHints(3);
    try {
      const response = await fetch(`${API_BASE_URL}/cards/next`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentCard(data.data);
      setCardStats(prev => ({
        ...prev,
        totalCards: prev.totalCards + 1,
      }));
    } catch (e) {
      setError('Falha ao carregar o flashcard. Verifique se o backend está rodando.');
      console.error('Erro ao buscar card:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const validateAnswer = (userAnswer, correctAnswer, cardType) => {
    const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, ' ');
    
    switch (cardType) {
      case 'text':
        return normalize(userAnswer) === normalize(correctAnswer);
      case 'fill_in_the_code':
        return normalize(userAnswer) === normalize(correctAnswer) ||
               userAnswer.trim() === correctAnswer.trim();
      default:
        return false;
    }
  };

  const handleDifficultyUpdate = async (status) => {
    if (!currentCard) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cards/${currentCard.id}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (status === 'easy') {
        setCardStats(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
        }));
      } else {
        setCardStats(prev => ({
          ...prev,
          incorrectAnswers: prev.incorrectAnswers + 1,
        }));
      }
      
      fetchNextCard();
    } catch (e) {
      setError('Falha ao registrar a resposta.');
      console.error('Erro ao enviar resposta:', e);
    }
  };

  const handleUserAnswerSubmit = (answerOrStatus) => {
    if (answerOrStatus === 'easy' || answerOrStatus === 'hard') {
      handleDifficultyUpdate(answerOrStatus);
    } else {
      const isCorrect = validateAnswer(answerOrStatus, currentCard.answer, currentCard.type);
      setUserAnswerInput(answerOrStatus);
      
      if (isCorrect) {
        setFeedbackMessage({ type: 'correct', text: 'Resposta correta! 🎉' });
        setTimeout(() => {
          handleDifficultyUpdate('easy');
        }, 1500);
      } else {
        setFeedbackMessage({ type: 'incorrect', text: 'Resposta incorreta. Tente novamente ou use uma dica.' });
      }
      
      setIsAnswerRevealed(true);
    }
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
  };

  const handleHintUsed = () => {
    setHintsUsed(prev => prev + 1);
  };

  useEffect(() => {
    fetchNextCard();
  }, [fetchNextCard]);

  if (loading) {
    return (
      <div className="grimorio-container">
        <h1 className="title">Carregando Grimório...</h1>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grimorio-container">
        <h1 className="title">Erro</h1>
        <p className="error-message">{error}</p>
        <button className="btn" onClick={fetchNextCard}>Tentar Novamente</button>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="grimorio-container">
        <h1 className="title">Nenhum card encontrado.</h1>
        <button className="btn" onClick={fetchNextCard}>Carregar Card</button>
      </div>
    );
  }

  return (
    <div className="grimorio-container">
      <div className="grimorio-header">
        <h1 className="title">Spellbook</h1>
        <div className="stats-bar">
          <span className="stat">📚 Total: {cardStats.totalCards}</span>
          <span className="stat correct">✓ Corretas: {cardStats.correctAnswers}</span>
          <span className="stat incorrect">✗ Incorretas: {cardStats.incorrectAnswers}</span>
        </div>
      </div>
      
      <div className="card-page">
        <FlashcardDisplay 
          card={currentCard} 
          onAnswerSubmit={handleUserAnswerSubmit}
          hintsUsed={hintsUsed}
          maxHints={maxHints}
          onRevealHint={handleHintUsed}
          isAnswerRevealed={isAnswerRevealed}
          userAnswerInput={userAnswerInput}
          feedbackMessage={feedbackMessage}
          onDifficultyUpdate={handleDifficultyUpdate}
          onRevealAnswer={handleRevealAnswer}
        />
      </div>
    </div>
  );
}

export default App;

