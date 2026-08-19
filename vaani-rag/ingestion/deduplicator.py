from typing import Dict, Any
from ingestion.schemas import Passage
from ingestion.logging_config import logger

class Deduplicator:
    """
    Tracks seen passage text hashes to perform global and intra-batch deduplication.
    Ensures identical passages (especially English text extracted from multiple Indic config records)
    are only stored once.
    """
    def __init__(self):
        # Set of unique content hashes
        self.seen_hashes = set()
        self.raw_count = 0
        self.duplicate_count = 0

    def is_duplicate(self, passage: Passage) -> bool:
        """
        Registers a passage and checks if its hash has already been seen.
        
        Args:
            passage: The Passage object.
            
        Returns:
            True if duplicate, False if unique.
        """
        self.raw_count += 1
        h = passage.content_hash
        
        if h in self.seen_hashes:
            self.duplicate_count += 1
            return True
        
        self.seen_hashes.add(h)
        return False

    def get_stats(self) -> Dict[str, Any]:
        """
        Computes and returns deduplication metrics.
        """
        unique_count = len(self.seen_hashes)
        duplicate_percentage = (self.duplicate_count / self.raw_count * 100.0) if self.raw_count > 0 else 0.0
        
        return {
            "raw_passages": self.raw_count,
            "duplicates": self.duplicate_count,
            "unique_passages": unique_count,
            "duplicate_percentage": round(duplicate_percentage, 2)
        }
