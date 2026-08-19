import hashlib
from typing import List
from ingestion.schemas import Passage, Chunk
from ingestion.strategies import count_tokens
from ingestion.logging_config import logger

def chunk_original(passage: Passage) -> List[Chunk]:
    """
    Keeps the original passage as a single chunk unit.
    Safe limit: BGE-M3 max input is 8192 tokens.
    """
    text = passage.text
    token_count = count_tokens(text)
    
    # BGE-M3 maximum sequence length is 8192.
    if token_count > 8192:
        logger.warning(
            f"Passage {passage.passage_id} has {token_count} tokens which exceeds the safe model limit of 8192. Truncating."
        )
        # Simple truncation for ORIGINAL strategy if it exceeds max model length
        # (ponytail principle: simple, correct fallback)
        tokenizer = get_tokenizer()
        if tokenizer is not None:
            tokens = tokenizer.encode(text, add_special_tokens=False)[:8192]
            text = tokenizer.decode(tokens)
            token_count = len(tokens)
        else:
            text = text[:32000] # Rough character fallback
            token_count = 8192

    chunk_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]
    chunk_id = f"{passage.language}_original_{chunk_hash}_0"
    
    chunk = Chunk(
        chunk_id=chunk_id,
        parent_passage_id=passage.passage_id,
        text=text,
        language=passage.language,
        strategy="original",
        chunk_index=0,
        token_count=token_count,
        content_hash=hashlib.sha256(text.encode("utf-8")).hexdigest(),
        query_id=passage.query_id,
        query_type=passage.query_type,
        is_selected=passage.is_selected
    )
    
    return [chunk]

# Import tokenizer helper dynamically to avoid circular dependencies
from ingestion.strategies import get_tokenizer
