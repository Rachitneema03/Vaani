import os
import pytest
from unittest.mock import patch, MagicMock
from ingestion.schemas import Passage
from ingestion.chunker import chunk_passage
from ingestion.pipeline import run_pipeline

def test_chunk_id_determinism_and_collision_prevention():
    passage = Passage(
        passage_id="en_p_1",
        text="This is a test passage content for verifying chunk ID determinism and collision prevention.",
        language="en",
        original_record_index=0,
        content_hash="hash123"
    )
    
    # 1. Determinism check: calling it twice with same inputs must yield identical IDs
    chunks1 = chunk_passage(passage, strategy="original")
    chunks2 = chunk_passage(passage, strategy="original")
    assert chunks1[0].chunk_id == chunks2[0].chunk_id
    
    # 2. Strategy collision prevention check: different strategies must yield different chunk IDs
    chunks_sentence = chunk_passage(passage, strategy="sentence", target_size=100)
    
    # Chunk IDs should contain strategy to prevent collisions
    assert chunks1[0].chunk_id != chunks_sentence[0].chunk_id
    assert "original" in chunks1[0].chunk_id
    assert "sentence" in chunks_sentence[0].chunk_id

@patch("ingestion.pipeline.load_dataset_stream")
@patch("ingestion.pipeline.BGEM3Embedder")
@patch("ingestion.pipeline.Deduplicator")
def test_pipeline_dry_run_without_pinecone_credentials(
    mock_dedup_cls,
    mock_embedder_cls,
    mock_stream_loader
):
    # Set up mock deduplicator
    mock_dedup = MagicMock()
    mock_dedup.is_duplicate.return_value = False
    mock_dedup_cls.return_value = mock_dedup
    
    # Set up mock embedder
    mock_embedder = MagicMock()
    mock_embedder.embed_texts.return_value = [[0.1] * 1024] # Mocked 1024-dim embedding
    mock_embedder.dimension = 1024
    mock_embedder_cls.return_value = mock_embedder
    
    # Set up mock stream row generator
    mock_row = {
        "query_id": "1",
        "query_type": "description",
        "source_lang": "en",
        "target_lang": "hi_IN",
        "passages": {
            "English_passages": ["This is a test English passage."],
            "Translated_passages": ["यह एक परीक्षण हिंदी गद्यांश है।"],
            "is_selected": [1]
        }
    }
    mock_stream_loader.return_value = [mock_row]
    
    # Run the pipeline in dry-run mode (without Pinecone upload)
    # PINECONE_API_KEY environment variable is temporarily cleared/mocked
    with patch.dict(os.environ, {"PINECONE_API_KEY": ""}):
        metrics = run_pipeline(
            languages=["en", "hi"],
            max_rows=1,
            strategy="original",
            dry_run=True,
            upload=False
        )
        
        # Verify execution and validation metrics
        assert metrics.valid_vectors > 0
        assert metrics.invalid_vectors == 0
        assert metrics.uploaded_vectors == 0 # Upload skipped in dry run
