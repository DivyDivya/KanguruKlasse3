#!/usr/bin/env python3
"""
Update questions-data.js with correct answers - improved version
Updates answers within their year context
"""

import json
import re

SOLUTIONS_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\solutions_data.json"
QUESTIONS_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\questions-data.js"

# Load solutions
with open(SOLUTIONS_PATH, 'r', encoding='utf-8') as f:
    solutions = json.load(f)

# Read questions-data.js
with open(QUESTIONS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

print("="*70)
print("Updating Correct Answers in questions-data.js (Context-Aware)")
print("="*70)
print()

updates = 0
total_checked = 0

for year_str, year_solutions in sorted(solutions.items()):
    print(f"Year {year_str}:")

    # Find the year section
    year_pattern = rf"{year_str}:\s*\{{"
    year_match = re.search(year_pattern, content)

    if not year_match:
        print(f"  ERROR: Could not find year {year_str} section")
        continue

    # Get approximate bounds of this year's section
    year_start = year_match.start()

    # Find next year or end of file
    next_year_pattern = r"\d{4}:\s*\{"
    next_years = list(re.finditer(next_year_pattern, content[year_start + 10:]))
    if next_years:
        year_end = year_start + 10 + next_years[0].start()
    else:
        year_end = len(content)

    year_section = content[year_start:year_end]

    # Now find and replace answers within this year section
    for question_id, correct_answer in year_solutions.items():
        # Find the question and its correctAnswer within this section
        pattern = rf"id:\s*'{question_id}'[\s\S]*?correctAnswer:\s*'([A-E])'"

        match = re.search(pattern, year_section)

        if match:
            old_answer = match.group(1)
            if old_answer != correct_answer:
                # Replace in the full content by finding it in context
                full_match_text = match.group(0)
                new_match_text = full_match_text.replace(
                    f"correctAnswer: '{old_answer}'",
                    f"correctAnswer: '{correct_answer}'"
                )

                # Replace in the full content (only the first occurrence in this year)
                before_year = content[:year_start]
                after_year = content[year_end:]
                year_section_updated = year_section.replace(full_match_text, new_match_text, 1)
                content = before_year + year_section_updated + after_year

                # Update the year section reference
                year_section = year_section_updated
                year_end = year_start + len(year_section)

                print(f"  {question_id}: {old_answer} -> {correct_answer}")
                updates += 1
            else:
                print(f"  {question_id}: OK ({correct_answer})")
            total_checked += 1
        else:
            print(f"  {question_id}: NOT FOUND in year section")

    print()

# Write updated content
with open(QUESTIONS_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("="*70)
print(f"Checked {total_checked} answers")
print(f"Updated {updates} answers")
print(f"File saved: {QUESTIONS_PATH}")
print("="*70)
