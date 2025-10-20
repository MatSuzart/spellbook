# 🧙‍♂️ Documentação do Projeto: *O Spellbook do Programador*

## 1. Visão Geral

**O Spellbook do Programador** é uma aplicação *Full-Stack* projetada para ajudar no aprendizado de programação por meio de flashcards interativos.  
A arquitetura é composta por três partes principais:

- **Backend (Node.js + Express):**  
  Gerencia o banco de dados SQLite, aplica a lógica de negócios (como a dificuldade adaptativa dos cards) e fornece uma **API REST** para o frontend.

- **Frontend (React):**  
  Exibe a interface *dark fantasy*, interage com a API e controla a navegação entre perguntas, respostas e feedback de acertos/erros.

- **Banco de Dados (SQLite):**  
  Armazena os flashcards, suas categorias e níveis de dificuldade. O uso de SQLite facilita o setup por ser baseado em arquivo (`grimorio.db`).

**Fluxo de Dados:**  
`Frontend (React)` ⟷ `API REST (Node.js / Express)` ⟷ `Banco de Dados (SQLite)`

---

## 2. Estrutura do Projeto

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
└── DOCUMENTACAO.md
```

---

## 3. Backend — Node.js, Express e SQLite

### 3.1 Instalação

1. No terminal, acesse a pasta do backend:
   ```bash
   cd grimorio-projeto/backend
   ```
2. Instale as dependências:
   ```bash
   npm install express sqlite3 cors
   ```

---

### 3.2 Banco de Dados (`database.js`)

Cria e inicializa o banco `grimorio.db`, contendo a tabela `flashcards`.  
Cada card possui:
- `pergunta`, `resposta`, `dica`,  
- `categoria` (Básico, Intermediário, Avançado, etc.)  
- `dificuldade` (contador de erros, usado para ajustar a seleção de cards).

---

### 3.3 Script de População (`seed.js`)

O arquivo `seed.js` é responsável por **popular o banco de dados com flashcards iniciais**.  
Ele **limpa a tabela** antes de inserir novos dados, garantindo que não haja duplicações.

💡 **Personalização:**  
Você pode editar livremente as perguntas, respostas, dicas e categorias conforme seus **objetivos de estudo**.  
Isso permite adaptar o *spellbook* para diferentes linguagens, temas ou níveis de aprendizado (por exemplo: algoritmos, SQL, APIs, estruturas de dados).

Para executar o script:
```bash
node seed.js
```

Após a execução, o banco `grimorio.db` estará preenchido com os flashcards definidos no arquivo.

---

## 4. Execução do Servidor

1. Ainda dentro da pasta `backend`, execute:
   ```bash
   node server.js
   ```
2. O servidor iniciará (por padrão) em:
   ```
   http://localhost:3001
   ```

O frontend se comunicará com esse endpoint para buscar e registrar dados dos flashcards.

---

## 5. Frontend — React

O frontend é responsável pela interface do usuário. Ele:
- Consulta o backend para buscar cards.
- Mostra perguntas, revela respostas e envia feedback.
- Aplica uma identidade visual inspirada em *dark fantasy*.

Para iniciar o frontend:
```bash
cd grimorio-projeto/frontend
npm start
```

---

## 6. Considerações Finais

O *Spellbook do Programador* foi pensado como um **ambiente de prática e revisão** para quem estuda programação.  
Por ser modular e simples, ele pode ser facilmente expandido com novas rotas, categorias e modos de aprendizado.

✨ **Dica:** personalize seus flashcards no `seed.js` sempre que quiser revisar um novo tema — é como criar o seu próprio grimório de estudos.
