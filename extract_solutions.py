#!/usr/bin/env python3
"""
Extract correct answers from Kanguru solutions PDF
For Klassenstufen 3 und 4 (Grades 3 and 4)
"""

import fitz  # PyMuPDF
import re
import json

PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru_loesungen_alle.pdf"
OUTPUT_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\solutions_data.json"

def extract_solutions_from_page(page, page_num):
    """
    Extract solutions for Klassenstufen 3 und 4 from a page
    Returns: (year, solutions_dict)
    """
    text = page.get_text()
    lines = [line.strip() for line in text.split('\n') if line.strip()]

    # Find year
    year = None
    for line in lines:
        match = re.search(r'20\d{2}', line)
        if match:
            year = int(match.group(0))
            break

    if not year:
        # Try to extract from header
        if '2025' in text:
            year = 2025
        elif '2024' in text:
            year = 2024
        else:
            print(f"  Page {page_num + 1}: Could not find year")
            return None, {}

    # Find "Klassenstufen 3 und 4" section
    try:
        start_idx = None
        for i, line in enumerate(lines):
            if '3 und 4' in line or '3und4' in line.replace(' ', ''):
                start_idx = i
                break

        if start_idx is None:
            print(f"  Page {page_num + 1} (Year {year}): Could not find 'Klassenstufen 3 und 4'")
            return year, {}

        # Find the next section (Klassenstufen 5 und 6) as end marker
        end_idx = len(lines)
        for i in range(start_idx + 1, len(lines)):
            if '5 und 6' in lines[i] or '5und6' in lines[i].replace(' ', ''):
                end_idx = i
                break

        # Extract section
        section = lines[start_idx:end_idx]

        # Find "Aufgabe" and "Antwort" blocks
        solutions = {}

        # Process section to find Aufgabe/Antwort pairs
        i = 0
        while i < len(section):
            if 'Aufgabe' in section[i]:
                # Collect question IDs until we hit "Antwort"
                questions = []
                i += 1
                while i < len(section) and 'Antwort' not in section[i]:
                    q_match = re.match(r'^[ABC][1-8]$', section[i])
                    if q_match:
                        questions.append(section[i])
                    i += 1

                # Now collect answers
                if i < len(section) and 'Antwort' in section[i]:
                    answers = []
                    i += 1
                    while i < len(section) and section[i] in ['A', 'B', 'C', 'D', 'E']:
                        answers.append(section[i])
                        i += 1

                    # Match questions with answers
                    for j, q_id in enumerate(questions):
                        if j < len(answers):
                            solutions[q_id] = answers[j]
            else:
                i += 1

        return year, solutions

    except Exception as e:
        print(f"  Page {page_num + 1}: Error - {e}")
        return year, {}

def extract_all_solutions():
    """Extract solutions for all years"""

    pdf = fitz.open(PDF_PATH)
    all_solutions = {}

    print(f"Processing {len(pdf)} pages from solutions PDF\n")

    for page_num in range(len(pdf)):
        page = pdf[page_num]
        year, solutions = extract_solutions_from_page(page, page_num)

        if year and solutions:
            all_solutions[str(year)] = solutions
            print(f"  Year {year}: {len(solutions)} answers - {dict(list(solutions.items())[:3])}")
        elif year:
            print(f"  Year {year}: No solutions found")

    pdf.close()

    # Save to JSON
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_solutions, f, indent=2, ensure_ascii=False)

    print(f"\n" + "="*70)
    print(f"Extracted solutions for {len(all_solutions)} years")
    print(f"Output: {OUTPUT_PATH}")

    # Show summary
    total = 0
    for year in sorted(all_solutions.keys()):
        count = len(all_solutions[year])
        total += count
        print(f"  {year}: {count} answers")

    print(f"\nTotal: {total} answers extracted")

if __name__ == '__main__':
    print("="*70)
    print("Kanguru Solutions Extractor - Grades 3/4")
    print("="*70)
    print()

    extract_all_solutions()
