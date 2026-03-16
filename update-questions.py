import json
import re

# Read extracted questions
with open('extracted_all_questions.json', 'r', encoding='utf-8') as f:
    extracted = json.load(f)

# Read questions-data.js
with open('questions-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def escape_quotes(text):
    return text.replace("'", "\\'")

# Update each year's questions
for year, questions in extracted.items():
    if year == 'metadata':
        continue

    print(f"Processing year {year}...")

    for qid, qdata in questions.items():
        if not qdata.get('questionTextDE'):
            continue

        # Find and replace question text
        pattern = rf"(id: '{qid}',\s+section: '[ABC]',\s+number: \d+,\s+year: {year},\s+points: [345],\s+)questionTextDE: '[^']*',\s+questionTextEN: '[^']*',"

        replacement = (
            r"\1"
            f"questionTextDE: '{escape_quotes(qdata['questionTextDE'])}',\n"
            f"                questionTextEN: '{escape_quotes(qdata['questionTextEN'])}',"
        )

        content = re.sub(pattern, replacement, content)

        # Update options if they have text
        if qdata.get('hasTextOptions') and qdata.get('options'):
            options_str = "[\n"
            for opt in qdata['options']:
                options_str += f"                    {{ id: '{opt['id']}', textDE: '{escape_quotes(opt['textDE'])}', textEN: '{escape_quotes(opt['textEN'])}' }},\n"
            options_str += "                ]"

            # Replace options array
            opt_pattern = rf"(year: {year},.*?id: '{qid}'.*?options: )\[[^\]]*\]"
            content = re.sub(opt_pattern, r"\1" + options_str, content, flags=re.DOTALL)

# Write back
with open('questions-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Questions data updated successfully!")
