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
└── README.md
```
