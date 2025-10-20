## Documentação do Projeto: O Grimório do Programador

Este documento detalha a arquitetura, implementação e instruções de uso do sistema de flashcards "O Grimório do Programador", desenvolvido conforme as especificações de estética *dark fantasy* (roxo e preto) e lógica de repetição espaçada.

### 1. Visão Geral da Arquitetura

O projeto "O Grimório do Programador" é uma aplicação **Full-Stack** dividida em duas partes principais que se comunicam via API REST:

*   **Backend (Servidor):** Desenvolvido com **Node.js** e o framework **Express**. Suas responsabilidades incluem:
    *   Gerenciamento do banco de dados **SQLite**.
    *   Implementação da lógica de negócios para seleção de flashcards (dificuldade adaptativa).
    *   Exposição de uma **API REST** para o frontend.

*   **Frontend (Cliente):** Construído com **React**. É responsável por:
    *   Apresentar a interface visual *dark fantasy*.
    *   Consumir a API do backend para obter e enviar dados.
    *   Gerenciar a interação do usuário (exibição de cards, revelação de respostas, feedback de acerto/erro).

*   **Banco de Dados:** Um arquivo **SQLite** (`grimorio.db`) armazena os flashcards, suas categorias e o nível de dificuldade de cada um. A escolha do SQLite simplifica a configuração, pois é um banco de dados baseado em arquivo.

**Fluxo de Comunicação:** `Frontend (React) <--- API REST (Node.js/Express) ---> Banco de Dados (SQLite)`

### 2. Estrutura de Pastas do Projeto

O projeto está organizado em uma pasta raiz `grimorio-projeto`, contendo duas subpastas para o backend e o frontend, respectivamente:

```
grimorio-projeto/
├── backend/
│   ├── database.js
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
└── DOCUMENTACAO.md
```

### 3. Backend: Node.js com Express e SQLite

O backend gerencia os dados dos flashcards e a lógica de seleção.

#### 3.1. Configuração e Instalação

1.  Navegue até a pasta `grimorio-projeto/backend` no seu terminal.
2.  Instale as dependências do Node.js:
    ```bash
    npm install express sqlite3 cors
    ```

#### 3.2. Arquivos do Backend

##### `grimorio-projeto/backend/database.js`

Este arquivo configura a conexão com o banco de dados SQLite e cria a tabela `flashcards` se ela ainda não existir. A tabela armazena `id`, `pergunta`, `resposta`, `dica`, `dificuldade` (contador de erros) e `categoria`.

```javascript
const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "grimorio.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS flashcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pergunta TEXT NOT NULL,
            resposta TEXT NOT NULL,
            dica TEXT,
            dificuldade INTEGER NOT NULL DEFAULT 0,
            categoria TEXT
        )`, (err) => {
            if (err) {
                // Tabela já criada
            } else {
                console.log('Tabela "flashcards" criada ou já existente.');
            }
        });
    }
});

module.exports = db;
```

##### `grimorio-projeto/backend/seed.js`

Este script é responsável por popular o banco de dados com os 27 flashcards iniciais. Ele limpa a tabela `flashcards` antes de inserir os dados para garantir que não haja duplicatas ao ser executado múltiplas vezes.

```javascript
const db = require('./database.js');

const flashcards = [
    { id: 1, pergunta: "Crie uma função `contagem_regressiva(numero)` que use um loop `while` para imprimir uma contagem regressiva a partir do número fornecido até 0, finalizando com a mensagem 'Fogo!'.", dica: "Inicie um loop `while` com a condição de que o número seja maior ou igual a zero. Dentro do loop, imprima o número e depois o decremente em 1 (`numero -= 1`).", resposta: "def contagem_regressiva(numero):\n  while numero >= 0:\n    print(numero)\n    numero -= 1\n  print(\"Fogo!\")\n\ncontagem_regressiva(5)", categoria: "Básico" },
    { id: 2, pergunta: "Crie uma função `desenha_triangulo(linhas)` que receba um número de linhas e imprima um triângulo de asteriscos com a altura correspondente.", dica: "Use um loop `for` com `range()` para iterar de 1 até `linhas + 1`. Em cada iteração, multiplique a string `\"*\"` pelo número da iteração atual.", resposta: "def desenha_triangulo(linhas):\n  for i in range(1, linhas + 1):\n    print(\"*\" * i)\n\ndesenha_triangulo(4)", categoria: "Básico" },
    { id: 3, pergunta: "Crie uma função `eh_palindromo(palavra)` que retorne `True` se a palavra for um palíndromo e `False` caso contrário.", dica: "A sintaxe `[::-1]` inverte uma string. Compare a string original, convertida para minúsculas, com sua versão invertida.", resposta: "def eh_palindromo(palavra):\n  palavra = palavra.lower()\n  return palavra == palavra[::-1]\n\nprint(f\"arara: {eh_palindromo('arara')}\")\nprint(f\"python: {eh_palindromo('python')}\")", categoria: "Básico" },
    { id: 4, pergunta: "Crie uma função `soma_ate_n(n)` que calcule a soma de todos os números inteiros de 1 até `n` (inclusive), usando `range()` e `sum()`.", dica: "A função `range(start, stop)` gera números até `stop - 1`. Para incluir `n`, use `range(1, n + 1)`.", resposta: "def soma_ate_n(n):\n  return sum(range(1, n + 1))\n\nprint(f\"A soma de 1 a 10 é: {soma_ate_n(10)}\")", categoria: "Básico" },
    { id: 5, pergunta: "Crie uma função `contar_vogais(texto)` que retorne o número de vogais (a, e, i, o, u) que ela contém, sem diferenciar maiúsculas de minúsculas.", dica: "Converta o texto para minúsculas com `.lower()`. Defina uma string com as vogais e itere por cada caractere do texto, verificando se ele está no seu conjunto de vogais.", resposta: "def contar_vogais(texto):\n  vogais = \"aeiou\"\n  contador = 0\n  for caractere in texto.lower():\n    if caractere in vogais:\n      contador += 1\n  return contador\n\nprint(f\"Vogais em 'Python e Incrivel': {contar_vogais('Python e Incrivel')}\")", categoria: "Básico" },
    { id: 6, pergunta: "Crie uma função `fizzbuzz(n)` que imprima os números de 1 a `n`. Para múltiplos de 3, imprima 'Fizz'. Para múltiplos de 5, 'Buzz'. Para múltiplos de ambos, 'FizzBuzz'.", dica: "A ordem das verificações é crucial. Verifique primeiro a condição mais específica (múltiplo de 15), depois as condições para 3 e 5.", resposta: "def fizzbuzz(n):\n  for i in range(1, n + 1):\n    if i % 15 == 0:\n      print(\"FizzBuzz\")\n    elif i % 3 == 0:\n      print(\"Fizz\")\n    elif i % 5 == 0:\n      print(\"Buzz\")\n    else:\n      print(i)\n\nfizzbuzz(15)", categoria: "Básico" },
    
    { id: 7, pergunta: "Crie uma classe `ContaBancaria` com `titular` e `saldo`. Implemente os métodos `depositar(valor)`, `sacar(valor)` (com verificação de saldo) e `ver_saldo()`.", dica: "No construtor (`__init__`), inicialize o saldo como 0. No método `sacar`, use um `if` para verificar se `valor` é menor ou igual a `self.saldo`.", resposta: "class ContaBancaria:\n  def __init__(self, titular):\n    self.titular = titular\n    self.saldo = 0.0\n\n  def depositar(self, valor):\n    if valor > 0:\n      self.saldo += valor\n\n  def sacar(self, valor):\n    if valor > 0 and valor <= self.saldo:\n      self.saldo -= valor\n      return True\n    return False\n\n  def ver_saldo(self):\n    return self.saldo", categoria: "Intermediário" },
    { id: 8, pergunta: "Crie uma função `fatorial(n)` que calcule o fatorial de um número `n` (n!).", dica: "De forma iterativa, inicie um resultado com 1 e multiplique-o pelos números de 1 a `n` em um loop. Lembre-se que o fatorial de 0 é 1.", resposta: "def fatorial(n):\n  if n < 0:\n    return \"Indefinido\"\n  if n == 0:\n    return 1\n  resultado = 1\n  for i in range(1, n + 1):\n    resultado *= i\n  return resultado\n\nprint(f\"5! = {fatorial(5)}\")", categoria: "Intermediário" },
    { id: 9, pergunta: "Crie classes `Animal`, `Cachorro` e `Gato` com herança e sobrescreva o método `falar()`.", dica: "A classe base pode ter um método `falar` que levanta `NotImplementedError`. As classes filhas devem definir seu próprio método `falar(self)`.", resposta: "class Animal:\n  def __init__(self, nome):\n    self.nome = nome\n  def falar(self):\n    raise NotImplementedError(\"A classe filha deve implementar este método.\")\n\nclass Cachorro(Animal):\n  def falar(self):\n    return \"Au Au!\"\n\nclass Gato(Animal):\n  def falar(self):\n    return \"Miau!\"\n\nrex = Cachorro(\"Rex\")\nprint(f\"{rex.nome} diz: {rex.falar()}\")", categoria: "Intermediário" },
    { id: 10, pergunta: "Implemente o algoritmo Bubble Sort em uma função `bubble_sort(lista)`.", dica: "Use dois loops `for` aninhados. O loop interno compara cada elemento com o próximo, trocando-os de lugar se estiverem na ordem errada.", resposta: "def bubble_sort(lista):\n  n = len(lista)\n  for i in range(n):\n    for j in range(0, n - i - 1):\n      if lista[j] > lista[j+1]:\n        lista[j], lista[j+1] = lista[j+1], lista[j]\n  return lista\n\ndados = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(dados))", categoria: "Intermediário" },
    { id: 11, pergunta: "Implemente uma função `busca_binaria(lista_ordenada, item)`.", dica: "A lista precisa estar ordenada. Mantenha ponteiros de `inicio` e `fim`. Verifique o elemento do meio e descarte metade da lista a cada passo.", resposta: "def busca_binaria(lista_ordenada, item):\n  inicio, fim = 0, len(lista_ordenada) - 1\n  while inicio <= fim:\n    meio = (inicio + fim) // 2\n    if lista_ordenada[meio] == item:\n      return meio\n    elif lista_ordenada[meio] < item:\n      inicio = meio + 1\n    else:\n      fim = meio - 1\n  return -1\n\ndados = [11, 12, 22, 25, 34, 64, 90]\nprint(busca_binaria(dados, 22))", categoria: "Intermediário" },
    { id: 12, pergunta: "Dada uma lista de números, use `map` e `filter` com `lambda` para criar uma nova lista com o quadrado apenas dos números pares.", dica: "`filter` seleciona os itens. `map` aplica uma função a eles. Você pode encadear as chamadas.", resposta: "numeros = [1, 2, 3, 4, 5, 6]\nquadrado_dos_pares = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numeros)))\nprint(quadrado_dos_pares)", categoria: "Intermediário" },
    
    { id: 13, pergunta: "Crie um decorator `@cache_resultado` que armazene em memória o resultado de uma função.", dica: "Use um dicionário para o cache. A chave pode ser uma tupla dos argumentos (`*args`, `**kwargs`). Verifique se a chave existe no cache antes de executar a função.", resposta: "import time\n\ndef cache_resultado(func):\n  cache = {}\n  def wrapper(*args, **kwargs):\n    chave = (args, tuple(sorted(kwargs.items())))\n    if chave in cache:\n      print(\"Retornando do cache...\")\n      return cache[chave]\n    resultado = func(*args, **kwargs)\n    cache[chave] = resultado\n    return resultado\n  return wrapper\n\n@cache_resultado\ndef operacao_lenta(a, b):\n  time.sleep(2)\n  return a + b", categoria: "Avançado" },
    { id: 14, pergunta: "Crie uma função geradora `gerador_fibonacci(n)` que use `yield` para gerar os `n` primeiros números da sequência de Fibonacci.", dica: "Mantenha duas variáveis para os dois números anteriores (`a` e `b`) e atualize-as a cada iteração, usando `yield` para retornar o valor atual.", resposta: "def gerador_fibonacci(n):\n  a, b, count = 0, 1, 0\n  while count < n:\n    yield a\n    a, b = b, a + b\n    count += 1\n\nfor numero in gerador_fibonacci(10):\n  print(numero, end=\' \')", categoria: "Avançado" },
    { id: 15, pergunta: "Implemente um gerenciador de contexto com `@contextmanager` que garanta que um arquivo seja fechado.", dica: "Use o decorator `@contextmanager` do módulo `contextlib` em uma função geradora. O código antes do `yield` é o `__enter__`, e o código no bloco `finally` é o `__exit__`.", resposta: "from contextlib import contextmanager\n\n@contextmanager\ndef abrir_arquivo_seguro(caminho, modo):\n  f = None\n  try:\n    f = open(caminho, modo)\n    yield f\n  finally:\n    if f:\n      f.close()\n\nwith abrir_arquivo_seguro(\'teste.txt\', \'w\') as f:\n  f.write(\'Olá\')", categoria: "Avançado" },
    { id: 16, pergunta: "Escreva uma função `main` assíncrona que simule o download de duas URLs ao mesmo tempo usando `asyncio.gather`.", dica: "Marque as funções com `async def`. Use `await asyncio.sleep()` para pausas não bloqueantes. `asyncio.gather` executa várias corrotinas em paralelo.", resposta: "import asyncio\nimport random\n\nasync def simular_download(url):\n  delay = random.uniform(0.5, 2.0)\n  await asyncio.sleep(delay)\n  return f\"Conteúdo de {url}\"\n\nasync def main():\n  resultados = await asyncio.gather(\n    simular_download(\"site1.com\"),\n    simular_download(\"site2.com\")\n  )\n  print(resultados)\n\n# Para rodar: asyncio.run(main())", categoria: "Avançado" },
    { id: 17, pergunta: "Crie uma classe `Circulo` com um `raio`. Use `@property` para criar um atributo virtual `area` que é calculado dinamicamente.", dica: "Defina um método `area(self)` e coloque o decorator `@property` acima dele. O método deve conter a lógica para calcular a área (π * raio²).", resposta: "import math\n\nclass Circulo:\n  def __init__(self, raio):\n    self.raio = raio\n\n  @property\n  def area(self):\n    return math.pi * (self.raio ** 2)\n\nc = Circulo(10)\nprint(f\"Área: {c.area:.2f}\")", categoria: "Avançado" },
    { id: 18, pergunta: "Crie uma classe `Validador` com um método de classe `from_string_nascimento(data_str)` e um método estático `is_adulto(idade)`.", dica: "`@classmethod` recebe a classe (`cls`) como primeiro argumento. `@staticmethod` não recebe nem `self` nem `cls`.", resposta: "from datetime import datetime\n\nclass Validador:\n  def __init__(self, idade):\n    self.idade = idade\n\n  @classmethod\n  def from_string_nascimento(cls, data_str):\n    ano_nasc = datetime.strptime(data_str, \"%d-%m-%Y\").year\n    idade = datetime.now().year - ano_nasc\n    return cls(idade)\n\n  @staticmethod\n  def is_adulto(idade):\n    return idade >= 18\n\npessoa = Validador.from_string_nascimento(\"14-10-1995\")\nprint(Validador.is_adulto(pessoa.idade))", categoria: "Avançado" },
    
    { id: 19, pergunta: "Crie uma função `escrever_e_ler_log(caminho, msg)` que adicione uma mensagem a um arquivo e depois retorne todo o seu conteúdo.", dica: "Use dois blocos `with open(...)`. O primeiro com modo `\'a\'` (append) e o segundo com modo `\'r\'` (read).", resposta: "def escrever_e_ler_log(caminho, msg):\n  with open(caminho, \'a\', encoding=\'utf-8\') as f:\n    f.write(msg + \'\\n\')\n  with open(caminho, \'r\', encoding=\'utf-8\') as f:\n    return f.read()\n\nprint(escrever_e_ler_log(\'log.txt\', \'Sistema OK.\'))", categoria: "Arquivos" },
    { id: 20, pergunta: "Crie uma função que leia um arquivo CSV e retorne uma lista de dicionários.", dica: "Use o módulo `csv` e a classe `csv.DictReader`, que trata a primeira linha como cabeçalho automaticamente.", resposta: "import csv\n\ndef ler_csv_para_dicionarios(caminho_csv):\n  with open(caminho_csv, \'r\', encoding=\'utf-8\') as f:\n    return list(csv.DictReader(f))\n\n# (Requer um arquivo \'dados.csv\' para funcionar)", categoria: "Arquivos" },
    { id: 21, pergunta: "Crie uma função que receba uma lista de dicionários e a escreva em um arquivo CSV, incluindo o cabeçalho.", dica: "Use `csv.DictWriter`. Obtenha o cabeçalho das chaves do primeiro dicionário. Use `writer.writeheader()` e `writer.writerows()`.", resposta: "import csv\n\ndef escrever_dicionarios_para_csv(caminho, dados):\n  if not dados:\n    return\n  cabecalho = dados[0].keys()\n  with open(caminho, \'w\', newline=\'\', encoding=\'utf-8\') as f:\n    escritor = csv.DictWriter(f, fieldnames=cabecalho)\n    escritor.writeheader()\n    escritor.writerows(dados)", categoria: "Arquivos" },
    { id: 22, pergunta: "Crie uma função que leia um arquivo JSON e o converta em um objeto Python (dicionários/listas).", dica: "Use o módulo `json` e a função `json.load()` (não `loads`) dentro de um bloco `with open(...)`.", resposta: "import json\n\ndef carregar_config_json(caminho_json):\n  with open(caminho_json, \'r\', encoding=\'utf-8\') as f:\n    return json.load(f)\n\n# (Requer um arquivo \'config.json\' para funcionar)", categoria: "Arquivos" },
    { id: 23, pergunta: "Crie uma função que salve um objeto Python (dicionário) em um arquivo JSON formatado de forma legível.", dica: "Use `json.dump()` (não `dumps`). Para a formatação, use o argumento `indent=2` (ou 4).", resposta: "import json\n\ndef salvar_objeto_para_json(caminho, dados):\n  with open(caminho, \'w\', encoding=\'utf-8\') as f:\n    json.dump(dados, f, indent=2, ensure_ascii=False)", categoria: "Arquivos" },
    { id: 24, pergunta: "Crie uma matriz 3x3 com list comprehension. Depois, achate a matriz (transforme em uma lista única) com outra list comprehension.", dica: "Para achatar: `[item for sublista in matriz for item in sublista]`.", resposta: "matriz = [[(j * 3) + i + 1 for i in range(3)] for j in range(3)]\nlista_achatada = [item for sublista in matriz for item in sublista]\nprint(f\"Matriz: {matriz}\")\nprint(f\"Achatada: {lista_achatada}\")", categoria: "Intermediário" },
    { id: 25, pergunta: "Crie uma função `validar_cpf_formato(cpf)` que verifique se uma string de CPF tem o formato \'XXX.XXX.XXX-XX\'.", dica: "Verifique o comprimento (14), a posição dos pontos e do hífen, e se o resto são dígitos usando `isdigit()`.", resposta: "def validar_cpf_formato(cpf):\n  if len(cpf) != 14:\n    return False\n  if cpf[3] != "." or cpf[7] != "." or cpf[11] != "-":\n    return False\n  partes = cpf.replace(".", "").replace("-", "")\n  return partes.isdigit() and len(partes) == 11\n\nprint(validar_cpf_formato("123.456.789-00"))", categoria: "Básico" },
    { id: 26, pergunta: "Como criar um script Python que gere um PDF a partir de uma lista de flashcards?", dica: "Use a biblioteca `fpdf2`. Crie uma classe que herda de `FPDF`, defina cabeçalho/rodapé e use `multi_cell()` para escrever texto. Use uma fonte monoespaçada para código.", resposta: "# pip install fpdf2\nfrom fpdf import FPDF\n\n# O princípio é iterar sobre os dados e usar métodos como\n# pdf.cell() e pdf.multi_cell() para posicionar o texto.", categoria: "Meta" },
    { id: 27, pergunta: "Como criar um script Python que gere um pacote `.apkg` para o Anki?", dica: "Use a biblioteca `genanki`. Defina um `genanki.Model` (campos e template), crie um `genanki.Deck`, adicione `genanki.Note` a ele e empacote com `genanki.Package`.", resposta: "# pip install genanki\nimport genanki\n\n# O essencial é definir o modelo do cartão, criar as notas\n# com os campos preenchidos e adicionar a um baralho.", categoria: "Meta" }
];

const db = {
    data: [],
    init() {
        const savedData = localStorage.getItem("grimorioData");
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            this.data = initialFlashcards.map(card => ({ ...card, dificuldade: 0 }));
            this.save();
        }
    },
    save() {
        localStorage.setItem("grimorioData", JSON.stringify(this.data));
    },
    getNextCard() {
        const pool = [];
        this.data.forEach(card => {
            const weight = (card.dificuldade || 0) + 1;
            for (let i = 0; i < weight; i++) {
                pool.push(card);
            }
        });
        return pool[Math.floor(Math.random() * pool.length)];
    },
    updateDifficulty(cardId, status) {
        const card = this.data.find(c => c.id === cardId);
        if (!card) return;

        if (status === "hard") {
            card.dificuldade++;
        } else if (status === "easy" && card.dificuldade > 0) {
            card.dificuldade--;
        }
        this.save();
    }
};

db.init();

// ===================================================================================
// LÓGICA DO FRONTEND (REACT SIMULADO)
// ===================================================================================
const App = () => {
    const root = document.getElementById("root");
    let state = {
        currentCard: null,
        isFlipped: false,
        showHint: false,
        phase: "loading" // loading, question, feedback
    };

    const setState = (newState) => {
        state = { ...state, ...newState };
        render();
    };

    const fetchNextCard = () => {
        const card = db.getNextCard();
        setState({ currentCard: card, isFlipped: false, showHint: false, phase: "question" });
    };

    const handleShowHint = () => setState({ showHint: true });
    const handleFlip = () => setState({ isFlipped: true, phase: "feedback" });
    
    const handleAnswer = (status) => {
        db.updateDifficulty(state.currentCard.id, status);
        // Adiciona um pequeno delay para a animação de transição
        setState({ phase: "transition" });
        setTimeout(() => fetchNextCard(), 500);
    };

    const render = () => {
        if (state.phase === "loading") {
            root.innerHTML = `<div class="grimorio-container"><h1 class="title">Carregando Grimório...</h1></div>`;
            fetchNextCard();
            return;
        }

        const card = state.currentCard;
        if (!card) {
            root.innerHTML = `<div class="grimorio-container"><h1 class="title">Nenhum card encontrado.</h1></div>`;
            return;
        }

        const cardContentFront = `
            <div class="card-content">
                <h3>Pergunta:</h3>
                <p>${card.pergunta}</p>
                ${state.showHint ? `<i>Dica: ${card.dica}</i>` : ""}
            </div>
        `;

        const cardContentBack = `
            <div class="card-content">
                <h3>Resposta:</h3>
                <pre><code>${card.resposta}</code></pre>
                <p>Categoria: ${card.categoria}</p>
                <p>Dificuldade Atual: ${card.dificuldade}</p>
            </div>
        `;

        root.innerHTML = `
            <div class="grimorio-container">
                <h1 class="title">O Grimório do Programador</h1>
                <div class="card-scene">
                    <div class="card ${state.isFlipped ? "is-flipped" : ""} ${state.phase === "transition" ? "fade-out" : "fade-in"}">
                        <div class="card-face card-face-front">
                            ${cardContentFront}
                        </div>
                        <div class="card-face card-face-back">
                            ${cardContentBack}
                        </div>
                    </div>
                </div>
                <div class="controls">
                    ${state.phase === "question" ? `
                        <button class="btn btn-hint" onclick="handleShowHint()">Pedir Dica</button>
                        <button class="btn" onclick="handleFlip()">Revelar Resposta</button>
                    ` : ""}
                    ${state.phase === "feedback" ? `
                        <button class="btn btn-success" onclick="handleAnswer("easy")">Acertei</button>
                        <button class="btn btn-fail" onclick="handleAnswer("hard")">Errei</button>
                    ` : ""}
                </div>
            </div>
        `;

        // Re-attach event listeners as innerHTML replaces them
        if (state.phase === "question") {
            document.querySelector(".btn-hint")?.addEventListener("click", handleShowHint);
            document.querySelector(".btn")?.addEventListener("click", handleFlip);
        } else if (state.phase === "feedback") {
            document.querySelector(".btn-success")?.addEventListener("click", () => handleAnswer("easy"));
            document.querySelector(".btn-fail")?.addEventListener("click", () => handleAnswer("hard"));
        }
    };

    // Expose handlers to global scope for onclick attributes
    window.handleShowHint = handleShowHint;
    window.handleFlip = handleFlip;
    window.handleAnswer = handleAnswer;

    render();
};

App();
    </script>

</body>
</html>

