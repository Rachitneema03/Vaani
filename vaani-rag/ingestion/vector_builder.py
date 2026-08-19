from typing import List
from ingestion.schemas import Chunk, VectorRecord

def build_vector_record(chunk: Chunk, embedding: List[float]) -> VectorRecord:
    """
    Compiles a Chunk object and its corresponding embedding vector into a Pinecone-ready VectorRecord.
    
    Args:
        chunk: The source Chunk object.
        embedding: A list of floats representing the chunk's 1024-dimensional embedding vector.
        
    Returns:
        A VectorRecord object.
    """
    # Build core metadata dictionary
    metadata = {
        "language": chunk.language,
        "text": chunk.text,
        "chunk_id": chunk.chunk_id,
        "parent_passage_id": chunk.parent_passage_id,
        "strategy": chunk.strategy,
        "content_hash": chunk.content_hash,
        "token_count": chunk.token_count
    }

    # Add optional evaluation/relevance metadata if present
    if chunk.query_id:
        metadata["query_id"] = chunk.query_id
    if chunk.query_type:
        metadata["query_type"] = chunk.query_type
    if chunk.is_selected is not None:
        metadata["is_selected"] = chunk.is_selected

    return VectorRecord(
        id=chunk.chunk_id,
        values=embedding,
        metadata=metadata
    )
