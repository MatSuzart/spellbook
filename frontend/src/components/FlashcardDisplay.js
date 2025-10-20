import React, { useState } from 'react';

const FlashcardDisplay = ({ card, onAnswerSubmit, hintsUsed, maxHints, onRevealHint }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [draggedItems, setDraggedItems] = useState(card.draggableItems || []);
  const [droppableAreas, setDroppableAreas] = useState(
    card.droppableAreas ? card.droppableAreas.map(area => ({ id: area, content: null })) : []
  );
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const handleTextAnswerSubmit = () => {
    onAnswerSubmit(userAnswer);
  };

  const handleMultipleChoiceAnswer = (option) => {
    setSelectedOption(option);
    if (option === card.answer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setTimeout(() => {
      onAnswerSubmit(option === card.answer ? 'easy' : 'hard');
      setSelectedOption(null);
      setFeedback(null);
    }, 1500);
  };

  const handleFillInTheCodeAnswer = () => {
    onAnswerSubmit(userAnswer);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetAreaId) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    setDraggedItems(prev => prev.filter(item => item !== draggedItem));
    setDroppableAreas(prev =>
      prev.map(area =>
        area.id === targetAreaId && area.content === null ? { ...area, content: draggedItem } : area
      )
    );
  };

  const handleDragDropSubmit = () => {
    const currentOrder = droppableAreas.map(area => area.content).filter(Boolean);
    const expectedOrder = JSON.parse(card.answer);

    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(expectedOrder);

    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      onAnswerSubmit(isCorrect ? 'easy' : 'hard');
      setFeedback(null);
    }, 1500);
  };

  const handleRevealHint = () => {
    if (hintLevel < maxHints) {
      setHintLevel(hintLevel + 1);
      setShowHint(true);
      onRevealHint();
    }
  };

  const getProgressiveHint = () => {
    if (!card.hint) return null;

    const hints = card.hint.split('|');
    if (hintLevel === 0) return null;
    if (hintLevel === 1) return hints[0] || card.hint;
    if (hintLevel === 2) return hints[1] || card.hint;
    if (hintLevel >= 3) return card.hint;
  };

  const handleCodeInputChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);
  };

  const handleCodeKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = userAnswer.substring(0, start) + '  ' + userAnswer.substring(end);
      setUserAnswer(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const beforeCursor = userAnswer.substring(0, start);
      const afterCursor = userAnswer.substring(end);
      
      // Detectar indentação da linha anterior
      const lines = beforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      const indentation = currentLine.match(/^(\s*)/)[0];
      
      const newValue = beforeCursor + '\n' + indentation + afterCursor;
      setUserAnswer(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1 + indentation.length;
      }, 0);
    }
  };

  const renderQuestionContent = () => {
    switch (card.type) {
      case 'text':
        return (
          <div className="question-type-text">
            <p className="question-text">{card.question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="> "
              className="grimorio-input"
              onKeyPress={(e) => e.key === 'Enter' && handleTextAnswerSubmit()}
            />
            <button className="btn" onClick={handleTextAnswerSubmit}>
              Enviar
            </button>
          </div>
        );

      case 'fill_in_the_code':
        const codeParts = card.codeSnippet.split('____');
        return (
          <div className="question-type-code">
            <p className="question-text">{card.question}</p>
            <div className="code-editor-container">
              <textarea
                value={userAnswer}
                onChange={handleCodeInputChange}
                onKeyDown={handleCodeKeyDown}
                placeholder="# Digite seu código aqui..."
                className="code-editor"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            <button className="btn" onClick={handleFillInTheCodeAnswer}>
              Enviar
            </button>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="question-type-multiple-choice">
            <p className="question-text">{card.question}</p>
            <div className="options-grid">
              {card.options.map((option, index) => (
                <button
                  key={index}
                  className={`btn option-btn ${
                    selectedOption === option
                      ? feedback === 'correct'
                        ? 'btn-success'
                        : 'btn-fail'
                      : ''
                  }`}
                  onClick={() => handleMultipleChoiceAnswer(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && (
              <div className={`feedback-message ${feedback}`}>
                {feedback === 'correct' ? '> CORRETO' : '> INCORRETO'}
              </div>
            )}
          </div>
        );

      case 'drag_and_drop':
        return (
          <div className="question-type-drag-drop">
            <p className="question-text">{card.question}</p>
            <div className="drag-items-container">
              {draggedItems.map((item, index) => (
                <div
                  key={index}
                  className="draggable-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="droppable-areas-container">
              {droppableAreas.map((area, index) => (
                <div
                  key={index}
                  className={`droppable-area ${area.content ? 'has-item' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, area.id)}
                >
                  {area.content ? (
                    <div className="draggable-item">{area.content}</div>
                  ) : (
                    <span className="drop-placeholder">[ ]</span>
                  )}
                </div>
              ))}
            </div>
            <button className="btn" onClick={handleDragDropSubmit}>
              Verificar
            </button>
            {feedback && (
              <div className={`feedback-message ${feedback}`}>
                {feedback === 'correct' ? '> CORRETO' : '> INCORRETO'}
              </div>
            )}
          </div>
        );

      default:
        return <p>Tipo de pergunta desconhecido.</p>;
    }
  };

  return (
    <div className="flashcard-display">
      {renderQuestionContent()}

      <div className="hints-section">
        {card.hint && (
          <div className="hint-container">
            <button
              className="btn-hint"
              onClick={handleRevealHint}
              disabled={hintLevel >= maxHints}
            >
              [?] Dica ({hintLevel}/{maxHints})
            </button>
            {showHint && getProgressiveHint() && (
              <div className="hint-text">
                > {getProgressiveHint()}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="controls">
        <button className="btn btn-fail" onClick={() => onAnswerSubmit('hard')}>
          Errei
        </button>
        <button className="btn btn-success" onClick={() => onAnswerSubmit('easy')}>
          Acertei
        </button>
        <button className="btn" onClick={() => onAnswerSubmit('reveal')}>
          Revelar
        </button>
      </div>
    </div>
  );
};

export default FlashcardDisplay;

