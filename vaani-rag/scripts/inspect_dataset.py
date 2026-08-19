import sys
from typing import List
# Add project root to sys.path so we can run scripts from root
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from ingestion.logging_config import logger
from ingestion.dataset_loader import load_dataset_stream

def inspect_language_schema(lang: str, max_inspect: int = 100):
    """
    Inspects columns, data structures, field types, and statistics for the dataset config of the given language.
    """
    logger.info(f"Inspecting dataset for language configuration: '{lang}'")
    
    try:
        stream = load_dataset_stream(lang, split="train")
    except Exception as e:
        logger.error(f"Failed to stream dataset configuration for '{lang}': {e}")
        return

    rows_inspected = 0
    passages_extracted = 0
    selected_passages = 0
    empty_passages = 0
    passage_lengths: List[int] = []

    for idx, row in enumerate(stream):
        if idx >= max_inspect:
            break
            
        # 1. Print detailed schema structure from the first record
        if rows_inspected == 0:
            print(f"\n============================================================")
            print(f"SCHEMA SUMMARY FOR CONFIG '{lang}'")
            print(f"============================================================")
            print(f"All columns: {list(row.keys())}")
            print("\nFields types:")
            for col, val in row.items():
                print(f"  - '{col}': {type(val).__name__}")
                if col == "passages":
                    print(f"    * Inner passages structure details:")
                    if isinstance(val, dict):
                        for inner_k, inner_v in val.items():
                            val_desc = f"list of length {len(inner_v)}" if isinstance(inner_v, list) else type(inner_v).__name__
                            print(f"      - '{inner_k}': {val_desc}")
                    elif isinstance(val, list):
                        if val:
                            print(f"      - list containing elements of type: {type(val[0]).__name__}")
                            if isinstance(val[0], dict):
                                print(f"      - inner keys: {list(val[0].keys())}")
            print("============================================================\n")

        passages_field = row.get("passages")
        if passages_field is None:
            rows_inspected += 1
            continue

        extracted_items = []
        if isinstance(passages_field, dict):
            # Column-oriented dict of lists
            is_selected_list = passages_field.get("is_selected", [])
            english_list = passages_field.get("English_passages", passages_field.get("english_passages", []))
            translated_list = passages_field.get("Translated_passages", passages_field.get("translated_passages", []))
            
            num_passages = max(len(english_list), len(translated_list))
            for i in range(num_passages):
                eng = english_list[i] if i < len(english_list) else ""
                trans = translated_list[i] if i < len(translated_list) else ""
                sel = is_selected_list[i] if i < len(is_selected_list) else 0
                extracted_items.append((eng, trans, sel))
                
        elif isinstance(passages_field, list):
            # Row-oriented list of dicts
            for p in passages_field:
                if isinstance(p, dict):
                    eng = p.get("English_passages", p.get("english_passages", ""))
                    trans = p.get("Translated_passages", p.get("translated_passages", ""))
                    sel = p.get("is_selected", 0)
                    extracted_items.append((eng, trans, sel))

        # 2. Extract passage text based on target language and inspect lengths
        for eng, trans, sel in extracted_items:
            if lang == "en":
                txt = eng
            else:
                txt = trans if (isinstance(trans, str) and trans.strip()) else eng
                
            passages_extracted += 1
            if bool(sel):
                selected_passages += 1
                
            if not isinstance(txt, str) or not txt.strip():
                empty_passages += 1
            else:
                passage_lengths.append(len(txt))

        rows_inspected += 1

    # 3. Calculate statistics
    avg_len = sum(passage_lengths) / len(passage_lengths) if passage_lengths else 0.0
    passage_lengths.sort()
    med_len = passage_lengths[len(passage_lengths) // 2] if passage_lengths else 0
    max_len = passage_lengths[-1] if passage_lengths else 0

    print("------------------------------------------------------------")
    print(f"INSPECTION REPORT: {lang.upper()}")
    print("------------------------------------------------------------")
    print(f"rows inspected: {rows_inspected}")
    print(f"passages extracted: {passages_extracted}")
    print(f"selected passages: {selected_passages}")
    print(f"empty passages: {empty_passages}")
    print(f"average passage length (chars): {round(avg_len, 2)}")
    print(f"median passage length (chars): {med_len}")
    print(f"maximum passage length (chars): {max_len}")
    print("------------------------------------------------------------\n")

if __name__ == "__main__":
    for language in ["en", "hi", "mr"]:
        inspect_language_schema(language, 100)
