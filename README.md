# 🎙️ वाणी.
### *Voice is the new Interface , VAANI is the new Intelligence.*

### *A voice-first multilingual AI assistant that understands your language and responds with grounded answers*

🌐 **Live Demo:** https://vaani-rag-lime.vercel.app/

---

## ✨ What is VAANI?

### **What if you didn't have to learn the language of technology?**

You simply **speak** — in the language you're comfortable with — and VAANI does the rest.

**VAANI** is a multilingual, voice-first AI assistant designed to make information more accessible through **speech, language, and AI**.

Simply speak your query in **English, Hindi, or Marathi**. VAANI converts your voice into text, understands the query, retrieves the most relevant information from its knowledge base, and generates an **evidence-grounded response**.

No typing.
No complicated interfaces.
No language barrier.

> 🎙️ **Speak naturally. Ask freely. Understand instantly.**

---

## 🚀 How It Works

VAANI combines **Speech-to-Text, multilingual embeddings, vector retrieval, and Generative AI** into a Retrieval-Augmented Generation (RAG) pipeline.

```text
🎤 Your Voice
      ↓
🗣️ Sarvam Speech-to-Text
      ↓
🧠 BAAI BGE-M3 Embeddings
      ↓
🔎 Qdrant Top-5 Retrieval
      ↓
📚 Relevant Context
      ↓
✨ Gemini Generation
      ↓
💬 Grounded Answer
```

### The Pipeline

**1. 🎤 Voice Input**
The user speaks their question naturally.

**2. 🗣️ Speech-to-Text**
Sarvam AI converts the spoken query into text.

**3. 🧠 Semantic Embeddings**
The query is converted into a multilingual vector representation using **BAAI BGE-M3**.

**4. 🔎 Knowledge Retrieval**
Qdrant performs a semantic search and retrieves the **Top-5 most relevant pieces of information**.

**5. 📚 Context Formation**
The retrieved information is provided as evidence for the response.

**6. ✨ Response Generation**
Gemini generates an answer based on the retrieved context.

**7. 💬 Grounded Response**
VAANI returns a response grounded in the available evidence.

---

## 🧠 Why RAG?

Large Language Models can sometimes generate information that sounds convincing but isn't supported by the available knowledge.

VAANI addresses this using **Retrieval-Augmented Generation (RAG)**.

Instead of asking the LLM to answer purely from its internal knowledge:

```text
User Query
    ↓
Retrieve Evidence
    ↓
Provide Context
    ↓
Generate Answer
```

This allows VAANI to generate responses based on **retrieved evidence from its knowledge base**, helping reduce unsupported or hallucinated responses.

### 🛡️ Evidence-Aware Fallback

If the retrieved information isn't sufficient to confidently answer a question, VAANI can return an **insufficient-evidence response** rather than confidently inventing an answer.

> **When the system doesn't know, it should say it doesn't know.**

---

## 🌍 Multilingual by Design

VAANI is built with multilingual interaction at its core.

### Currently Supported

| Language     | Support |
| ------------ | ------- |
| 🇬🇧 English | ✅       |
| 🇮🇳 Hindi   | ✅       |
| 🇮🇳 Marathi | ✅       |

The system uses **BAAI BGE-M3**, a multilingual embedding model, enabling semantic retrieval across supported languages.

This means users can interact with VAANI in languages they are naturally comfortable speaking.

---

## 🔥 Why VAANI?

### 🎙️ Voice First

No need to type.

Ask questions naturally using your voice.

### 🌐 Multilingual

Communicate in languages you are comfortable with instead of adapting to a single language.

### 📚 Grounded Responses

VAANI retrieves relevant knowledge before generating an answer.

### ⚡ Efficient AI

BGE-M3 embeddings run locally using **OpenVINO**, reducing dependence on external embedding APIs.

### 🛡️ Safe Fallback

When retrieved evidence isn't sufficient, VAANI can acknowledge the lack of evidence rather than fabricate an answer.

### 🧩 Modular Architecture

The system separates speech recognition, retrieval, generation, and serving into distinct components, making the pipeline easier to extend and improve.

---

## 📊 RAG Performance

VAANI's retrieval system was evaluated on its **specific knowledge corpus and evaluation setup**.

| Metric        |      Score |
| ------------- | ---------: |
| **Recall@5**  | **63.34%** |
| **Recall@10** | **75.46%** |
| **Recall@20** | **83.15%** |
| **MRR**       | **0.4457** |

### What these metrics tell us

**Recall@K** measures how often the relevant information appears within the top K retrieved results.

**MRR (Mean Reciprocal Rank)** measures how highly the first relevant result tends to appear.

> ⚠️ These results are specific to the VAANI knowledge corpus and evaluation methodology and should not be interpreted as general benchmark results.

---

## 🏗️ System Architecture

```text
                         ┌─────────────────┐
                         │    VAANI UI     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     FastAPI     │
                         └────────┬────────┘
                                  │
                           🎤 Voice Input
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Sarvam STT   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     BGE-M3      │
                         │    Embeddings   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Qdrant      │
                         │   Top-5 Search  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Gemini      │
                         │    Generation   │
                         └────────┬────────┘
                                  │
                                  ▼
                         💬 Grounded Answer
```

---

## 🧠 Tech Stack

| Layer                  | Technology                     |
| ---------------------- | ------------------------------ |
| 🎨 **Frontend**        | HTML, CSS, JavaScript          |
| ⚡ **Backend**          | FastAPI                        |
| 🎤 **Speech-to-Text**  | Sarvam AI                      |
| 🧠 **Embeddings**      | BAAI BGE-M3                    |
| ⚙️ **Local Inference** | OpenVINO                       |
| 🔎 **Vector Database** | Qdrant                         |
| ✨ **LLM**              | Gemini                         |
| 🔗 **Architecture**    | Retrieval-Augmented Generation |

---

## 📁 Project Structure

```text
vaani-rag/
│
├── backend/              # FastAPI backend
│
├── ingestion/            # Dataset processing & ingestion
│
├── evaluation/           # RAG evaluation & metrics
│
├── scripts/              # Utility scripts
│
├── models/               # Local BGE-M3 model
│
├── data/                 # Dataset / processed data
│
├── docs/                 # Documentation
│
├── requirements.txt      # Python dependencies
├── .env.example          # Environment variable template
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd vaani-rag
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file and add the required API credentials.

```bash
cp .env.example .env
```

> ⚠️ **Never commit API keys, tokens, or other secrets to GitHub.**

### 4. Start the backend

```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

### 5. Check the API

Health check:

```text
GET /health
```

Then test the query endpoint:

```text
POST /api/v1/query
```

It is recommended to verify the text-query endpoint before testing the voice endpoint.

---

## 🛣️ Roadmap

### ✅ Completed

* [x] Multilingual RAG
* [x] Local BGE-M3 embeddings
* [x] Qdrant retrieval
* [x] Gemini-powered generation
* [x] FastAPI backend foundation

### 🚧 In Progress / Planned

* [ ] Complete voice integration
* [ ] Improved response latency
* [ ] Expanded language support
* [ ] Production deployment
* [ ] Real-time voice interaction

---

## 🌱 Future Possibilities

VAANI can evolve beyond a simple question-answering system.

Potential directions include:

* 🗣️ **Real-time voice conversations**
* 🔊 **Text-to-Speech responses**
* 🇮🇳 **More Indian languages and dialects**
* 📱 **Mobile application**
* 📴 **Low-connectivity / offline capabilities**
* 🧠 **Conversational memory**
* 🏛️ **Government and public-service knowledge bases**
* 🎓 **Education and learning assistants**
* 🏥 **Accessible information systems**
* 🧑‍🌾 **Agricultural and rural assistance**

---

## 🎯 Potential Use Cases

### 🏛️ Government & Public Services

Make public information accessible through natural voice interaction.

### 🎓 Education

Allow students to ask questions in their preferred language.

### 🏥 Information Access

Provide easier access to knowledge through voice-based interaction.

### 🧑‍🌾 Rural Assistance

Reduce language and literacy barriers when accessing digital information.

### 🗺️ Tourism

Help users interact with information about destinations in their preferred language.

---

## 💡 Our Vision

Technology should not ask people:

> **"Do you speak my language?"**

It should ask:

> **"How can I help?"**

VAANI is built around a simple idea:

### **Technology should understand people in the language they naturally speak.**

We want to move from:

**"Learn the language of technology."**

to:

**"Let technology understand your language."**


**Speak. Ask. Understand.**

*Your voice. Your language. Your knowledge.*

</div>


## 🏆 Built With

**AI • RAG • Voice • Multilingual NLP • FastAPI • Qdrant • OpenVINO • Gemini • Sarvam**

Built with the goal of making **AI more accessible, multilingual, and grounded in reliable information.**

---

<div align="center">

# 🎙️ VAANI

### Rooted in Goa. Powered by AI.**

**Your voice. Your language. Your knowledge.**

🌐 [Live Demo](https://vaani-rag-lime.vercel.app/)

</div>
