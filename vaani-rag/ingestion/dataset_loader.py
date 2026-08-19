from typing import Iterator, Dict, Any
from datasets import load_dataset
from ingestion.logging_config import logger

def load_dataset_stream(lang: str, split: str = "train") -> Any:
    """
    Loads a streaming connection to the Hugging Face dataset.
    If English (en) is requested, we stream from the 'hi' config because
    English text is stored inside the 'English_passages' field of the Indic configs.
    
    Args:
        lang: The target language ('en', 'hi', or 'mr').
        split: The dataset split (e.g., 'train', 'validation').
        
    Returns:
        A streaming HF Dataset object.
    """
    dataset_id = "ai4bharat/MSMARCO-XI"
    config_name = lang
    
    if lang == "en":
        # English is stored as source passages in Indic configurations.
        # We use 'hi' config to extract English passages.
        config_name = "hi"
        logger.info("Language 'en' requested. Streaming from 'hi' configuration to extract original English passages.")
    
    logger.info(f"Initializing HF stream for {dataset_id} (config: {config_name}, split: {split})")
    try:
        # Load dataset in streaming mode
        dataset = load_dataset(dataset_id, name=config_name, split=split, streaming=True)
        return dataset
    except Exception as e:
        logger.critical(f"Failed to stream dataset configuration '{config_name}': {e}")
        raise e

def get_row_generator(lang: str, max_rows: int, split: str = "train", skip: int = 0) -> Iterator[Dict[str, Any]]:
    """
    Yields rows up to max_rows from the dataset stream, optionally skipping the first N.
    
    Args:
        lang: The language to load.
        max_rows: Maximum rows to return.
        split: The split to query.
        skip: Number of rows to skip before yielding.
        
    Yields:
        Dictionary representations of dataset rows.
    """
    try:
        dataset = load_dataset_stream(lang, split=split)
    except Exception as e:
        logger.error(f"Error loading stream for {lang}: {e}")
        return

    count = 0
    skipped = 0
    for row in dataset:
        if skipped < skip:
            skipped += 1
            continue
        if count >= max_rows:
            logger.info(f"Reached row limit of {max_rows} for language '{lang}'")
            break
        yield row
        count += 1

