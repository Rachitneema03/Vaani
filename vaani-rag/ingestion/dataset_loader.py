import os
from typing import Any
from datasets import load_dataset
from ingestion.logging_config import logger

def load_dataset_stream(split: str = "train") -> Any:
    """
    Loads a streaming connection to the Hugging Face dataset.
    Uses the 'default' configuration as the dataset has a single stream.
    """
    if not os.getenv("HF_TOKEN"):
        logger.warning("HF_TOKEN environment variable is not set. HF downloads will be unauthenticated and may be rate-limited.")

    dataset_id = "ai4bharat/MSMARCO-XI"
    config_name = "default"
    
    logger.info(f"Loading MSMARCO-XI {config_name} configuration")
    logger.info(f"Streaming split={split}")
    
    try:
        dataset = load_dataset(dataset_id, name=config_name, split=split, streaming=True)
        return dataset
    except Exception as e:
        logger.critical(f"Failed to stream dataset configuration '{config_name}': {e}")
        raise e
