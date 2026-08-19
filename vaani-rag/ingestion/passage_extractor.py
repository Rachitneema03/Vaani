import hashlib
from typing import Iterator, Dict, Any, List, Tuple
from ingestion.schemas import Passage
from ingestion.logging_config import logger

def calculate_hash(text: str) -> str:
    """Calculates SHA-256 hash of text."""
    return hashlib.sha256(text.strip().encode("utf-8")).hexdigest()

def extract_passages_from_row(
    row: Dict[str, Any], 
    language: str, 
    record_index: int
) -> Iterator[Passage]:
    """
    Parses a raw dataset row and extracts individual Passage objects.
    Safely adapts to both dict-of-lists and list-of-dicts formats inside the 'passages' field.
    
    Args:
        row: A raw dataset dictionary.
        language: The target language ('en', 'hi', or 'mr').
        record_index: Index of the row in the dataset stream.
        
    Yields:
        Individual Passage Pydantic objects.
    """
    query_id = str(row.get("query_id", ""))
    query_type = row.get("query_type", "")
    source_lang = row.get("source_lang", "")
    target_lang = row.get("target_lang", "")
    
    passages_field = row.get("passages")
    if passages_field is None:
        logger.warning(f"Row {record_index} has no 'passages' field. Skipping.")
        return

    extracted_items: List[Tuple[str, str, Any]] = []

    # 1. Adapt to different schemas dynamically
    if isinstance(passages_field, dict):
        # Column-oriented format (dict of lists)
        is_selected_list = passages_field.get("is_selected", [])
        english_list = passages_field.get("English_passages", passages_field.get("english_passages", []))
        translated_list = passages_field.get("Translated_passages", passages_field.get("translated_passages", []))
        
        num_passages = max(len(english_list), len(translated_list))
        for i in range(num_passages):
            eng_text = english_list[i] if i < len(english_list) else ""
            trans_text = translated_list[i] if i < len(translated_list) else ""
            sel = is_selected_list[i] if i < len(is_selected_list) else 0
            extracted_items.append((eng_text, trans_text, sel))
            
    elif isinstance(passages_field, list):
        # Row-oriented format (list of dicts)
        for p in passages_field:
            if isinstance(p, dict):
                eng_text = p.get("English_passages", p.get("english_passages", ""))
                trans_text = p.get("Translated_passages", p.get("translated_passages", ""))
                sel = p.get("is_selected", 0)
                extracted_items.append((eng_text, trans_text, sel))
    else:
        logger.error(f"Row {record_index}: 'passages' field is of unsupported type: {type(passages_field)}")
        return

    # 2. Yield individual passages based on target language
    for idx, (eng_text, trans_text, sel) in enumerate(extracted_items):
        if language == "en":
            text_content = eng_text
        elif language in ("hi", "mr"):
            # Use translation if available, otherwise fall back to English
            text_content = trans_text if (isinstance(trans_text, str) and trans_text.strip()) else eng_text
        else:
            logger.error(f"Unsupported language code '{language}' requested during extraction.")
            continue
            
        if not isinstance(text_content, str):
            continue
            
        cleaned_raw = text_content.strip()
        if not cleaned_raw:
            continue

        # Generate deterministic Passage ID and Hash using raw extracted text
        content_hash = calculate_hash(cleaned_raw)
        passage_id = f"{language}_passage_{content_hash[:16]}_{record_index}_{idx}"

        yield Passage(
            passage_id=passage_id,
            text=cleaned_raw,
            language=language,
            query_id=query_id,
            query_type=query_type,
            source_lang=source_lang,
            target_lang=target_lang,
            is_selected=bool(sel),
            original_record_index=record_index,
            content_hash=content_hash
        )
