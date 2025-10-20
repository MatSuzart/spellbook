import db from './database';
import { Flashcard, QuestionType } from './types';

const flashcards: Flashcard[] = [
  // Python - Iniciante
  {
    question: "Qual palavra-chave é usada para definir uma função em Python?",
    answer: "def",
    hint: "São as três primeiras letras de 'define'.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para criar uma lista vazia em Python",
    answer: "[]",
    hint: "Use um par de símbolos que denotam uma coleção ordenada e mutável.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "minha_lista = ____",
    missingParts: ["[]"],
  },
  {
    question: "Qual é o resultado de `2 + 3 * 4` em Python?",
    answer: "14",
    hint: "Lembre-se da ordem das operações (PEMDAS/BODMAS).",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Qual destes tipos de dados é imutável em Python?",
    answer: "Tuple",
    hint: "É uma sequência ordenada que não pode ser alterada após a criação.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "multiple_choice",
    options: ["List", "Dictionary", "Set", "Tuple"],
  },
  {
    question: "Arraste as palavras para formar a estrutura correta de um loop for em Python",
    answer: JSON.stringify(["for", "in"]),
    hint: "As palavras-chave para iterar sobre uma sequência.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "drag_and_drop",
    draggableItems: ["in", "for", "while"],
    droppableAreas: ["Palavra 1", "Palavra 2"],
  },
  {
    question: "Qual é a função para obter o comprimento de uma lista em Python?",
    answer: "len",
    hint: "É uma função embutida que retorna o número de elementos.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para converter uma string em maiúsculas",
    answer: "upper()",
    hint: "Use o método que transforma todos os caracteres em maiúsculas.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "resultado = minha_string.____",
    missingParts: ["upper()"],
  },
  {
    question: "Qual é o resultado de `'Python' * 3` em Python?",
    answer: "PythonPythonPython",
    hint: "O operador * com strings repete a string.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Qual destes é um tipo de dado mutável em Python?",
    answer: "List",
    hint: "Você pode modificar seus elementos após a criação.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "multiple_choice",
    options: ["String", "Tuple", "List", "Integer"],
  },
  {
    question: "Como você declara uma variável em Python?",
    answer: "Você simplesmente atribui um valor a um nome usando o operador =. Não há necessidade de declarar o tipo.",
    hint: "Python usa atribuição dinâmica de tipos.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para atribuir um valor a uma variável",
    answer: "x = 10",
    hint: "Use o operador de atribuição =.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ = 10",
    missingParts: ["x"],
  },
  {
    question: "Qual é o resultado de `5 // 2` em Python?",
    answer: "2",
    hint: "O operador // realiza divisão inteira (floor division).",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Qual é o resultado de `5 % 2` em Python?",
    answer: "1",
    hint: "O operador % retorna o resto da divisão.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Como você incrementa uma variável x em 1 em Python?",
    answer: "x += 1",
    hint: "Use o operador de atribuição composto +=.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para criar um loop for que itera de 0 a 4",
    answer: "for i in range(5):",
    hint: "Use range(5) para gerar números de 0 a 4.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ i ____ range(5):",
    missingParts: ["for", "in"],
  },
  {
    question: "Qual é a diferença entre um loop for e um loop while em Python?",
    answer: "Um loop for itera sobre uma sequência conhecida, enquanto um loop while continua enquanto uma condição for verdadeira.",
    hint: "Um é determinístico, o outro é condicional.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para criar um loop while que continua enquanto x < 5",
    answer: "while x < 5:",
    hint: "Use a palavra-chave while com uma condição.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ x < 5:",
    missingParts: ["while"],
  },
  {
    question: "Como você lança uma exceção em Python?",
    answer: "Use a palavra-chave raise seguida do tipo de exceção e uma mensagem.",
    hint: "Exemplo: raise ValueError('mensagem')",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para lançar uma exceção ValueError",
    answer: "raise ValueError('Valor inválido')",
    hint: "Use raise seguido do tipo de exceção.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ ValueError('Valor inválido')",
    missingParts: ["raise"],
  },
  {
    question: "Como você trata uma exceção em Python?",
    answer: "Use um bloco try-except para capturar e tratar exceções.",
    hint: "Exemplo: try: ... except Exception: ...",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para um bloco try-except básico",
    answer: "try:\n    # código\nexcept Exception:\n    # tratamento",
    hint: "Use try para o código que pode gerar erro e except para tratá-lo.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ :\n    # código\n____ Exception:\n    # tratamento",
    missingParts: ["try", "except"],
  },
  {
    question: "Como você abre um arquivo em Python?",
    answer: "Use a função open() com o nome do arquivo e o modo ('r' para leitura, 'w' para escrita, 'a' para append).",
    hint: "Exemplo: open('arquivo.txt', 'r')",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para abrir um arquivo em modo de leitura",
    answer: "f = open('arquivo.txt', 'r')",
    hint: "Use open() com o modo 'r' para leitura.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "f = open('arquivo.txt', '____')",
    missingParts: ["r"],
  },
  {
    question: "Qual é a melhor forma de trabalhar com arquivos em Python?",
    answer: "Use a declaração with para garantir que o arquivo seja fechado automaticamente.",
    hint: "Exemplo: with open('arquivo.txt') as f: ...",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para usar a declaração with para ler um arquivo",
    answer: "with open('arquivo.txt', 'r') as f:\n    conteudo = f.read()",
    hint: "Use with para gerenciamento automático de contexto.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ open('arquivo.txt', 'r') ____ f:\n    conteudo = f.read()",
    missingParts: ["with", "as"],
  },
  {
    question: "Como você escreve em um arquivo em Python?",
    answer: "Use o método write() em um arquivo aberto em modo de escrita ('w' ou 'a').",
    hint: "Exemplo: f.write('texto')",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "text",
  },
  {
    question: "Complete o código para escrever em um arquivo",
    answer: "with open('arquivo.txt', 'w') as f:\n    f.write('Olá, mundo!')",
    hint: "Use o modo 'w' para escrita.",
    difficulty: 0,
    category: "Python - Iniciante",
    type: "fill_in_the_code",
    codeSnippet: "____ open('arquivo.txt', 'w') ____ f:\n    f.____('Olá, mundo!')",
    missingParts: ["with", "as", "write"],
  },

  // Python - Intermediário
  {
    question: "Explique a diferença entre `==` e `is` em Python.",
    answer: "`==` verifica se os valores dos objetos são iguais, enquanto `is` verifica se os objetos são o mesmo objeto na memória (mesma identidade).",
    hint: "Um compara valor, o outro compara identidade.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "text",
  },
  {
    question: "Complete o código para usar um list comprehension para criar uma lista de quadrados dos números pares de 0 a 9",
    answer: "for, in, if",
    hint: "Pense na sintaxe básica de um list comprehension com uma condição.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "fill_in_the_code",
    codeSnippet: "quadrados_pares = [x**2 ____ x ____ range(10) ____ x % 2 == 0]",
    missingParts: ["for", "in", "if"],
  },
  {
    question: "Qual é a finalidade principal do decorator @property em Python?",
    answer: "Permite acessar métodos como atributos, encapsulando o acesso a dados e adicionando lógica sem alterar a interface de uso.",
    hint: "Transforma um método em um atributo de leitura (e opcionalmente escrita/deleção).",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "text",
  },
  {
    question: "Qual módulo Python é comumente usado para trabalhar com expressões regulares?",
    answer: "re",
    hint: "É um módulo embutido, abreviação de 'regular expression'.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "multiple_choice",
    options: ["os", "sys", "math", "re"],
  },
  {
    question: "Arraste as partes para montar a declaração de uma classe que herda de object",
    answer: JSON.stringify(["(", "object)"]),
    hint: "Como se indica herança em Python?",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "drag_and_drop",
    draggableItems: ["object)", "(", ")object"],
    droppableAreas: ["Abre parênteses", "Fecha parênteses"],
  },
  {
    question: "Complete o código para usar enumerate() em um loop",
    answer: "indice, in",
    hint: "enumerate() retorna índice e valor. Use a sintaxe de desempacotamento.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "fill_in_the_code",
    codeSnippet: "for ____, item ____ enumerate(lista):",
    missingParts: ["indice", "in"],
  },
  {
    question: "Qual é a diferença entre `append()` e `extend()` em listas Python?",
    answer: "`append()` adiciona um único elemento, enquanto `extend()` adiciona todos os elementos de um iterável.",
    hint: "Um adiciona um objeto, o outro adiciona múltiplos elementos.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "text",
  },
  {
    question: "Qual módulo Python é usado para trabalhar com datas e horas?",
    answer: "datetime",
    hint: "É um módulo embutido para manipulação de data e hora.",
    difficulty: 1,
    category: "Python - Intermediário",
    type: "multiple_choice",
    options: ["time", "date", "datetime", "calendar"],
  },

  // Python - Sênior
  {
    question: "Descreva o Global Interpreter Lock (GIL) em Python e seu impacto na concorrência.",
    answer: "O GIL é um mutex que protege o acesso a objetos Python, impedindo que múltiplas threads nativas executem bytecodes Python simultaneamente. Isso significa que, mesmo em máquinas multi-core, apenas uma thread Python pode executar por vez, limitando o paralelismo real para tarefas intensivas em CPU. Para contornar isso, usa-se multiprocessing ou operações I/O-bound com asyncio.",
    hint: "Pense em threads e paralelismo real vs. concorrência.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "text",
  },
  {
    question: "Complete o código para criar um asyncio.Task e executá-lo",
    answer: "_, await",
    hint: "Como se cria uma tarefa e como se espera por ela?",
    difficulty: 2,
    category: "Python - Sênior",
    type: "fill_in_the_code",
    codeSnippet: "async def main():\n    ____ task = asyncio.create_task(minha_corrotina())\n    ____ task",
    missingParts: ["_", "await"],
  },
  {
    question: "Qual é o propósito do método __slots__ em classes Python?",
    answer: "__slots__ permite declarar explicitamente os atributos de dados (variáveis de instância) que uma instância de classe pode ter. Isso otimiza o uso de memória, pois impede a criação de um dicionário __dict__ para cada instância, e pode acelerar o acesso aos atributos.",
    hint: "Pense em otimização de memória e acesso a atributos.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "text",
  },
  {
    question: "Qual destas afirmações sobre geradores em Python é verdadeira?",
    answer: "Eles usam a palavra-chave `yield` para produzir uma sequência de valores de forma preguiçosa.",
    hint: "Pense em como eles diferem das funções normais e listas.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "multiple_choice",
    options: [
      "Eles armazenam todos os valores gerados em memória de uma vez.",
      "Eles usam a palavra-chave `yield` para produzir uma sequência de valores de forma preguiçosa.",
      "Eles são criados usando a palavra-chave `return` em vez de `yield`.",
      "Eles só podem ser iterados uma única vez e não mantêm o estado."
    ],
  },
  {
    question: "Arraste os termos para descrever corretamente um closure em Python",
    answer: JSON.stringify(["aninhada", "envolvente"]),
    hint: "Pense em funções dentro de funções e seus ambientes.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "drag_and_drop",
    draggableItems: ["global", "aninhada", "local", "envolvente"],
    droppableAreas: ["Tipo de função", "Tipo de escopo"],
  },
  {
    question: "Explique o conceito de 'duck typing' em Python.",
    answer: "Duck typing é um estilo de programação onde o tipo de um objeto importa menos do que os métodos que ele possui. Se um objeto caminha como um pato e grasna como um pato, ele é tratado como um pato, independentemente de sua classe real.",
    hint: "Pense em 'se parece com um pato, é um pato'.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "text",
  },
  {
    question: "Qual é a principal diferença entre `*args` e `**kwargs` em Python?",
    answer: "`*args` permite passar um número variável de argumentos posicionais como uma tupla, enquanto `**kwargs` permite passar argumentos nomeados como um dicionário.",
    hint: "Um é para argumentos posicionais, o outro para argumentos nomeados.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "text",
  },
  {
    question: "Qual destas afirmações sobre metaclasses em Python é verdadeira?",
    answer: "Metaclasses são classes cujas instâncias são classes.",
    hint: "Pense em 'dados sobre dados'.",
    difficulty: 2,
    category: "Python - Sênior",
    type: "multiple_choice",
    options: [
      "Metaclasses são apenas para programação funcional.",
      "Metaclasses são classes cujas instâncias são classes.",
      "Metaclasses não podem ser customizadas em Python.",
      "Metaclasses são obsoletas no Python 3."
    ],
  },
];

db.serialize(() => {
  db.run("DELETE FROM flashcards"); // Limpa os dados existentes

  const stmt = db.prepare(
    "INSERT INTO flashcards (question, answer, hint, difficulty, category, type, options, codeSnippet, missingParts, draggableItems, droppableAreas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  flashcards.forEach((card) => {
    stmt.run(
      card.question,
      card.answer,
      card.hint || null,
      card.difficulty,
      card.category || null,
      card.type,
      card.options ? JSON.stringify(card.options) : null,
      card.codeSnippet || null,
      card.missingParts ? JSON.stringify(card.missingParts) : null,
      card.draggableItems ? JSON.stringify(card.draggableItems) : null,
      card.droppableAreas ? JSON.stringify(card.droppableAreas) : null,
      (err: Error | null) => {
        if (err) {
          console.error("Erro ao inserir flashcard:", err.message);
        }
      }
    );
  });

  stmt.finalize((err) => {
    if (err) {
      console.error("Erro ao finalizar statement:", err.message);
    } else {
      console.log(`Seed completo. ${flashcards.length} flashcards inseridos.`);
    }
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Conexão com o banco de dados fechada.");
  }
});

