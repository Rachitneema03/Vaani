import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Project root path (vaani-rag/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Output directories setup
OUTPUT_DIR = PROJECT_ROOT / "outputs"
# CHUNKS_DIR = OUTPUT_DIR / "chunks"
# MANIFESTS_DIR = OUTPUT_DIR / "manifests"
# CHECKPOINTS_DIR = OUTPUT_DIR / "checkpoints"
# LOGS_DIR = OUTPUT_DIR / "logs"
CHUNKS_DIR = OUTPUT_DIR / "chunks"
EMBEDDINGS_DIR = OUTPUT_DIR / "embeddings"
MANIFESTS_DIR = OUTPUT_DIR / "manifests"
CHECKPOINTS_DIR = OUTPUT_DIR / "checkpoints"
LOGS_DIR = OUTPUT_DIR / "logs"

# Ensure all outputs directories exist locally
# for directory in [OUTPUT_DIR, CHUNKS_DIR, MANIFESTS_DIR, CHECKPOINTS_DIR, LOGS_DIR]:
for directory in [
    OUTPUT_DIR,
    CHUNKS_DIR,
    EMBEDDINGS_DIR,
    MANIFESTS_DIR,
    CHECKPOINTS_DIR,
    LOGS_DIR,
]:
    directory.mkdir(parents=True, exist_ok=True)

# Pinecone Credentials and settings
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "vaani-rag")
PINECONE_CLOUD = os.getenv("PINECONE_CLOUD", "aws")
PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")

# Embedding Configuration
# Embedding Configuration
EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "BAAI/bge-m3"
)

EMBEDDING_BACKEND = os.getenv(
    "EMBEDDING_BACKEND",
    "openvino"
).lower()

EMBEDDING_DEVICE = os.getenv(
    "EMBEDDING_DEVICE",
    "GPU"
).upper()

EMBEDDING_MODEL_PATH = os.getenv(
    "EMBEDDING_MODEL_PATH",
    str(PROJECT_ROOT / "models" / "bge-m3-openvino")
)

EMBEDDING_BATCH_SIZE = int(
    os.getenv("EMBEDDING_BATCH_SIZE", "32")
)

EMBEDDING_MAX_LENGTH = int(
    os.getenv("EMBEDDING_MAX_LENGTH", "8192")
)

# Languages to parse
LANGUAGES = [lang.strip() for lang in os.getenv("LANGUAGES", "en,hi,mr").split(",") if lang.strip()]

# Limits
MAX_ROWS_PER_LANGUAGE = int(os.getenv("MAX_ROWS_PER_LANGUAGE", "1000000"))

# Chunking Strategy settings
CHUNKING_STRATEGY = os.getenv("CHUNKING_STRATEGY", "adaptive").lower()

# Dry Run Controls
DRY_RUN = os.getenv("DRY_RUN", "true").lower() == "true"
UPLOAD_TO_PINECONE = os.getenv("UPLOAD_TO_PINECONE", "false").lower() == "true"

# Checkpointing & Upload settings
CHECKPOINT_INTERVAL = int(os.getenv("CHECKPOINT_INTERVAL", "1000"))
PINECONE_UPSERT_BATCH_SIZE = int(os.getenv("PINECONE_UPSERT_BATCH_SIZE", "100"))
EMBED_UPLOAD_BATCH_SIZE = int(os.getenv("EMBED_UPLOAD_BATCH_SIZE", "64"))

# Cost Safety Configuration
CONFIRM_LARGE_UPLOAD = os.getenv("CONFIRM_LARGE_UPLOAD", "false").lower() == "true"


# Embedding Configuration
EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "BAAI/bge-m3"
)

EMBEDDING_BACKEND = os.getenv(
    "EMBEDDING_BACKEND",
    "openvino"
).lower()

EMBEDDING_DEVICE = os.getenv(
    "EMBEDDING_DEVICE",
    "GPU"
).upper()

EMBEDDING_MODEL_PATH = os.getenv(
    "EMBEDDING_MODEL_PATH",
    str(PROJECT_ROOT / "models" / "bge-m3-openvino")
)

EMBEDDING_BATCH_SIZE = int(
    os.getenv("EMBEDDING_BATCH_SIZE", "32")
)

EMBEDDING_MAX_LENGTH = int(
    os.getenv("EMBEDDING_MAX_LENGTH", "8192")
)


# Qdrant Configuration
QDRANT_URL = os.getenv("QDRANT_URL", "")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", "")
QDRANT_COLLECTION_NAME = os.getenv(
    "QDRANT_COLLECTION_NAME",
    "vaani_rag",
)