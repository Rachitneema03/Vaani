import sys
from pathlib import Path
from unittest.mock import patch

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from ingestion.dataset_loader import get_row_generator

@patch("ingestion.dataset_loader.load_dataset_stream")
def test_get_row_generator(mock_load_stream):
    # Setup mock row iterator
    mock_rows = [
        {"query_id": "101", "passages": {"English_passages": ["Eng Passage 1"], "Translated_passages": ["Transl Passage 1"]}},
        {"query_id": "102", "passages": {"English_passages": ["Eng Passage 2"], "Translated_passages": ["Transl Passage 2"]}},
        {"query_id": "103", "passages": {"English_passages": ["Eng Passage 3"], "Translated_passages": ["Transl Passage 3"]}}
    ]
    mock_load_stream.return_value = mock_rows

    # Verify basic streaming yields elements up to max_rows
    gen = get_row_generator(lang="hi", max_rows=2, split="train")
    results = list(gen)
    
    assert len(results) == 2
    assert results[0]["query_id"] == "101"
    assert results[1]["query_id"] == "102"

@patch("ingestion.dataset_loader.load_dataset_stream")
def test_get_row_generator_with_skip(mock_load_stream):
    mock_rows = [
        {"query_id": "101", "passages": {"English_passages": ["Eng Passage 1"], "Translated_passages": ["Transl Passage 1"]}},
        {"query_id": "102", "passages": {"English_passages": ["Eng Passage 2"], "Translated_passages": ["Transl Passage 2"]}},
        {"query_id": "103", "passages": {"English_passages": ["Eng Passage 3"], "Translated_passages": ["Transl Passage 3"]}}
    ]
    mock_load_stream.return_value = mock_rows

    # Verify skip parameter fast-forwards records correctly
    gen = get_row_generator(lang="hi", max_rows=2, split="train", skip=1)
    results = list(gen)
    
    assert len(results) == 2
    assert results[0]["query_id"] == "102"
    assert results[1]["query_id"] == "103"
