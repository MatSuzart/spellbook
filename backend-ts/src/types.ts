export interface Flashcard {
  id?: number;
  question: string;
  answer: string;
  hint?: string;
  difficulty: number;
  category?: string;
  type: QuestionType;
  options?: string[]; // Para múltipla escolha
  codeSnippet?: string; // Para preencher código
  missingParts?: string[]; // Para preencher código
  draggableItems?: string[]; // Para drag and drop
  droppableAreas?: string[]; // Para drag and drop
}

export type QuestionType = 'text' | 'fill_in_the_code' | 'drag_and_drop' | 'multiple_choice';

