import json
from pathlib import Path

RESULTS_FILE = Path("c:/Users/HP/OneDrive/Desktop/Vaani/vaani-rag/evaluation/results/stage3_final_results.jsonl")

def parse():
    if not RESULTS_FILE.exists():
        print("Results file not found!")
        return

    queries_attempted = 0
    queries_completed = 0
    queries_failed = 0
    
    langs = {"en": {"comp": 0, "fail": 0}, "hi": {"comp": 0, "fail": 0}, "mr": {"comp": 0, "fail": 0}}
    
    rate_limits = 0
    retrieval_successes = 0
    fallback_count = 0
    
    retrieval_latencies = []
    gemini_latencies = []
    total_latencies = []
    
    with open(RESULTS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            data = json.loads(line)
            queries_attempted += 1
            lang = data["language"]
            
            # Check success
            if data["success"]:
                queries_completed += 1
                langs[lang]["comp"] += 1
                
                # Check fallback
                # The fallback string is: "I could not find enough relevant information in the available knowledge base to answer confidently."
                if "I could not find enough relevant information" in data["answer"]:
                    fallback_count += 1
            else:
                queries_failed += 1
                langs[lang]["fail"] += 1
                
                err = data.get("error", "")
                if err and "429" in err:
                    rate_limits += 1
            
            # Retrieval success (checks if we retrieved chunks)
            if len(data["retrieved_candidates"]) > 0:
                retrieval_successes += 1
                
            # Latencies
            t = data.get("telemetry", {})
            retrieval_latencies.append(t.get("retrieval_ms", 0.0))
            gemini_latencies.append(t.get("gemini_generation_ms", 0.0))
            total_latencies.append(t.get("total_ms", 0.0))

    print(f"1. Number of queries attempted: {queries_attempted}")
    print(f"2. Number completed successfully: {queries_completed}")
    print(f"3. Number failed: {queries_failed}")
    print(f"4. English: completed {langs['en']['comp']} / failed {langs['en']['fail']}")
    print(f"5. Hindi: completed {langs['hi']['comp']} / failed {langs['hi']['fail']}")
    print(f"6. Marathi: completed {langs['mr']['comp']} / failed {langs['mr']['fail']}")
    print(f"7. Gemini quota/rate-limit errors: {rate_limits}")
    print(f"8. Retrieval success rate: {retrieval_successes / queries_attempted * 100:.2f}%")
    print(f"9. Fallback count: {fallback_count}")
    
    # Calculate averages
    avg_ret = sum(retrieval_latencies) / len(retrieval_latencies) if retrieval_latencies else 0.0
    avg_gem = sum(gemini_latencies) / len(gemini_latencies) if gemini_latencies else 0.0
    avg_tot = sum(total_latencies) / len(total_latencies) if total_latencies else 0.0
    
    print(f"11. Average retrieval latency: {avg_ret:.2f} ms")
    print(f"12. Average Gemini latency: {avg_gem:.2f} ms")
    print(f"13. Average total latency: {avg_tot:.2f} ms")

if __name__ == "__main__":
    parse()
