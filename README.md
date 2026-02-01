# Slide Generator

Gerador de slides para professores. A partir de um tema, nível de ensino e contexto, a API gera um plano de aula e um deck de slides pronto para uso.

Vídeo de Demonstração: https://youtu.be/q8HzxYJ1ilU

## Pré-requisitos

### Backend
- Python 3.10+
- Chaves de API:
  - Google AI (Gemini)
  - Tavily

### Frontend
- Node.js 18+
- pnpm

## 🚀 Como rodar o projeto

### 🔧 Backend (FastAPI)
1. **Entre na pasta do backend e crie o ambiente virtual:**

   ```bash
   cd slide-generator/backend
   python -m venv venv
   ```

2. **Ative o ambiente virtual:**

   - Windows (PowerShell): `.\venv\Scripts\Activate.ps1`
   - Windows (CMD): `venv\Scripts\activate.bat`
   - Linux/macOS: `source venv/bin/activate`

3. **Instale as dependências:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**

   Crie um arquivo `credentials.env` a partir do arquivo `credentials.env.example` e defina:

   - `GOOGLE_API_KEY` — Chave da API Google AI (Gemini)
   - `TAVILY_API_KEY` — Chave da API Tavily (busca web)
   - `ALLOWED_ORIGINS` — URLs permitidas para acessar a API, separadas por vírgula. Caso não definida, o valor padrão é `http://localhost:5173`.

5. **Inicie a API** (a partir da pasta `backend`):

   ```bash
   uvicorn src.main:app --reload
   ```

   A API estará disponível em `http://localhost:8000`.

### 🎨 Frontend (React + Vite)

1. **Entre na pasta do frontend**:

   ```bash
   cd slide-generator/frontend
   ```

2. **Instale as dependências**:

   ```bash
   pnpm install
   ```

2. **Inicie o servidor de desenvolvimento**:

   ```bash
   pnpm dev
   ```

   O frontend estará disponível em `http://localhost:5173`.

## 📡 Endpoints da API

1. `POST /slide`

Gera o deck de slides em uma única requisição.

**Corpo da requisição (JSON):**

| Campo      | Tipo   | Descrição                          |
|------------|--------|------------------------------------|
| `topic`    | string | Tema da aula                       |
| `grade`    | string | Nível/ano dos alunos               |
| `context`  | string | Instruções adicionais (opcional)   |
| `n_slides` | int    | Número de slides de conteúdo (30)  |

**Resposta:** lista de slides, cada um com `type`, `title`, `content` e, quando houver, `image`.


2. `POST /streaming`

Gera o deck de slides por meio de streaming, retornando slide por slide de forma incremental.

**Corpo da requisição (JSON):**

| Campo      | Tipo   | Descrição                          |
|------------|--------|------------------------------------|
| `topic`    | string | Tema da aula                       |
| `grade`    | string | Nível/ano dos alunos               |
| `context`  | string | Instruções adicionais (opcional)   |
| `n_slides` | int    | Número de slides de conteúdo (30)  |

**Resposta:**
A resposta é enviada como stream de texto, contendo blocos nos formatos:
- `|OPTIONAL_QUESTION: {dicionário da questão}|` para retornar a questão opcional. (Tipo: `OptionalQuestion`)
- `|NEW_SLIDE: {dicionário do slide}|` para retornar o conteúdo de um slide. (Tipo: `Slide`)

## Estrutura do projeto

```
slide-generator/
├── backend/
│   ├── generator/        # Lógica de geração (LLM, templates)
│   ├── models/           # Tipos Pydantic (Slide, SlideRequest)
│   ├── src/              # Entrada da API (FastAPI, main, logger)
│   ├── credentials.env.example
│   ├── credentials.env   # (não versionado – criar a partir do .example)
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── lib/          # Comunicação com a API e helpers
│       ├── pages/
│       ├── styles/
│       ├── templates/    # Templates de slides usados como referência
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
└── README.md
```

## Como funciona o processo de geração?
1. **Criação do plano de aula**: Um plano de aula é criado de acordo com o tema, o nível de ensino e eventuais instruções recebidas na requisição. (`generate_lesson_plan`)
2. **Planejamento da apresentação**: Com base nesse plano de aula, é estruturado um planejamento da apresentação: uma lista de objetos, onde cada objeto representa um slide e inclui o ID do template, o conteúdo principal do slide e, caso necessário, uma sugestão de imagem relacionada ao tema. (`generate_presentation_content`)
3. **Adaptação aos templates**: O conteúdo desses slides inicialmente pode não estar perfeitamente no formato dos templates. Por isso, cada slide passa por uma etapa de adaptação para preencher corretamente todos os campos do template correspondente. (`generate_templates_content`)
4. **Questão avaliativa opcional**: Com todos os templates devidamente preenchidos, a apresentação está praticamente pronta. Para finalizar, o conteúdo é analisado por uma LLM que avalia se faz sentido incluir uma questão avaliativa no decorrer da apresentação. Caso seja pertinente, a questão é gerada e inserida na apresentação no momento apropriado. (`generate_optional_question`)

## Possíveis Melhorias Futuras
- Implementar um tratamento mais eficiente para a criação da agenda, especialmente em casos de slides extensos. Avaliar a possibilidade de utilizar uma chamada específica à LLM para divisão em tópicos mais concisos.
- Permitir a adição de novos slides baseado nas queries de imagens geradas.
- Implementar retries em caso de falhas na geração de slides.
- Integrar com um banco de dados para armazenar os resultados das gerações.
- Aperfeiçoar os templates para garantir uma estilização 100% consistente.
- Disponibilizar funcionalidade para exportação de apresentação.
- Ajustar os prompts para evitar o uso de markdown ou adaptar o frontend para interpretar corretamente delimitadores de formatação (por exemplo, **valor** para negrito).
