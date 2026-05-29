import json, re
import pdfplumber

def parse_questions(text, points):
    questions = []
    lines = text.strip().split("\n")
    
    def find_answer_split(content):
        """Find where the answer begins within accumulated content.
        
        Returns (question_continuation, answer) or (None, content) if no split found.
        """
        # Pattern 1: question ends with ?
        idx = content.find('?')
        if idx >= 0:
            before = content[:idx + 1].strip()
            after = content[idx + 1:].strip()
            if before:
                return before, after
        
        # Pattern 2: imperative questions ending with . followed by a Bible reference
        # e.g., "the purpose of the Lord's supper. 1 Corinthians 11:26 ..."
        m = re.match(
            r'^(.+?\.)\s+'
            r'(?:\d+\s+)?[A-Z][a-z]+(?:\s+(?:\d+|chapter|verse))',
            content
        )
        if m:
            before = m.group(1).strip()
            after = content[m.end(1):].strip()
            return before, after
        
        return None, content
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        m = re.match(r'^(\d+)\.\s*(.*)', line)
        if m:
            num = int(m.group(1))
            q_text = m.group(2)
            i += 1
            
            # Collect all non-empty content lines until next question
            content_lines = []
            while i < len(lines):
                next_line = lines[i].strip()
                if re.match(r'^\d+\.\s*', next_line):
                    break
                if next_line:
                    content_lines.append(next_line)
                i += 1
            
            content = " ".join(content_lines)
            continuation, answer = find_answer_split(content)
            
            if continuation:
                q_text = q_text + ' ' + continuation
            
            is_quotation = "QUOTATION QUESTION" in q_text
            q_text_clean = q_text.replace("QUOTATION QUESTION. ", "").replace("QUOTATION QUESTION ", "")
            
            questions.append({
                "number": num,
                "text": q_text_clean.strip(),
                "answer": answer.strip(),
                "isQuotation": is_quotation,
                "points": points
            })
        else:
            i += 1
    
    return questions

all_questions = []

for pdf_file, points in [
    ("JBQ-10pt-Spaced-final.pdf", 10),
    ("JBQ-20pt-Spaced-final.pdf", 20),
    ("JBQ-30pt-Spaced-final.pdf", 30),
]:
    with pdfplumber.open(pdf_file) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
    
    qs = parse_questions(full_text, points)
    all_questions.extend(qs)
    print(f"{pdf_file}: {len(qs)} questions parsed ({points}pt)")

with open("app/data/jbq-questions.json", "w") as f:
    json.dump(all_questions, f, indent=2)

print(f"\nTotal: {len(all_questions)} questions")
print(f"  10pt: {len([q for q in all_questions if q['points'] == 10])}")
print(f"  20pt: {len([q for q in all_questions if q['points'] == 20])}")
print(f"  30pt: {len([q for q in all_questions if q['points'] == 30])}")
