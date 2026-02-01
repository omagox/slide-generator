# Slide Generator

Gerador de slides para professores. A partir de um tema, nível de ensino e contexto, a API gera um plano de aula e um deck de slides pronto para uso.

## Pré-requisitos

- Python
- Chaves de API (Google e Tavily)

## Como rodar?

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
   - `ALLOWED_ORIGINS` — URLs permitidas para acessar a API. Caso não definida, o valor padrão é `http://localhost:5173`.

5. **Inicie a API** (a partir da pasta `backend`):

   ```bash
   uvicorn src.main:app --reload
   ```

   A API estará disponível em `http://localhost:8000`.

## Exemplo de uso

**Endpoint:** `POST /slide`

Gera o deck de slides em uma única requisição.

**Corpo da requisição (JSON):**

| Campo      | Tipo   | Descrição                          |
|------------|--------|------------------------------------|
| `topic`    | string | Tema da aula                       |
| `grade`    | string | Nível/ano dos alunos               |
| `context`  | string | Instruções adicionais (opcional)   |
| `n_slides` | int    | Número de slides de conteúdo (30)  |

**Resposta:** lista de slides, cada um com `type`, `title`, `content` e, quando houver, `image`.

**Endpoint:** `POST /streaming`

Gera o deck de slides por meio de streaming, retornando slide por slide de forma incremental.

**Corpo da requisição (JSON):**

| Campo      | Tipo   | Descrição                          |
|------------|--------|------------------------------------|
| `topic`    | string | Tema da aula                       |
| `grade`    | string | Nível/ano dos alunos               |
| `context`  | string | Instruções adicionais (opcional)   |
| `n_slides` | int    | Número de slides de conteúdo (30)  |

**Resposta:**
Pedaços da geração em formato de string. Os pedaços podem estar nos formatos abaixo:
- "|OPTIONAL_QUESTION: {dicionário da questão}|" para retornar a questão opcional. (Tipo: OptionalQuestion)
- "|NEW_SLIDE: {dicionário do slide}|" para retornar o conteúdo de um slide. (Tipo: Slide)

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
│        ├── components/
│        ├── contexts/
│        ├── lib/             # Funções auxiliares e de comunicação com a API
│        ├── pages/
│        ├── styles/
│        ├── templates/       # Templates usados como referência para a geração da apresentação
│        ├── types/
│        ├── App.tsx
│        └── main.tsx
└── README.md
```

## Como funciona o processo de geração?
1. Um plano de aula é criado de acordo com o tema, o nível de ensino e eventuais instruções recebidas na requisição. (`generate_lesson_plan`)
2. Com base nesse plano de aula, é estruturado um planejamento da apresentação: uma lista de objetos, onde cada objeto representa um slide e inclui o ID do template, o conteúdo principal do slide e, caso necessário, uma sugestão de imagem relacionada ao tema. (`generate_presentation_content`)
3. O conteúdo desses slides inicialmente pode não estar perfeitamente no formato dos templates. Por isso, cada slide passa por uma etapa de adaptação para preencher corretamente todos os campos do template correspondente. (`generate_templates_content`)
4. Com todos os templates devidamente preenchidos, a apresentação está praticamente pronta. Para finalizar, o conteúdo é analisado por uma LLM que avalia se faz sentido incluir uma questão avaliativa no decorrer da apresentação. Caso seja pertinente, a questão é gerada e inserida na apresentação no momento apropriado. (`generate_optional_question`)