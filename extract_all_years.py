#!/usr/bin/env python3
"""
Extract all questions from Kanguru PDFs (2000-2025)
For 2010-2025: Standard extraction from question ID to question ID
For before 2010: Start halfway through previous question's answer choices
"""

import fitz  # PyMuPDF
import os
import re

# Configuration
PDF_DIR = r"C:\Users\I046576\Downloads\kanguru"
OUTPUT_BASE = r"C:\temp\kanguru-practice\KanguruKlasse3\images"

def extract_year_from_filename(filename):
    """Extract year from filename"""
    match = re.search(r'(\d{4})_34\.pdf$', filename)
    if match:
        return int(match.group(1))

    match = re.search(r'(\d{2})_34\.pdf$', filename)
    if match:
        year_suffix = int(match.group(1))
        return 2000 + year_suffix

    return None

def find_question_positions(page, question_ids):
    """
    Find y-positions for all question IDs on a page
    Returns dict: {question_id: y_position}
    """
    positions = {}

    for q_id in question_ids:
        rects = page.search_for(q_id)
        if rects:
            # Use first occurrence (should be the question label box)
            positions[q_id] = rects[0].y0

    return positions

def extract_questions_modern(pdf_path, year):
    """
    Extract questions for years 2010-2025
    Method: From top of question ID box to top of next question ID box
    """
    output_dir = os.path.join(OUTPUT_BASE, str(year))
    os.makedirs(output_dir, exist_ok=True)

    pdf = fitz.open(pdf_path)
    extracted = []

    # All question IDs
    all_questions = []
    for section in ['A', 'B', 'C']:
        for num in range(1, 9):
            all_questions.append(f"{section}{num}")

    # Process each page to find questions
    page_questions = {}
    for page_num in range(len(pdf)):
        page = pdf[page_num]
        positions = find_question_positions(page, all_questions)

        for q_id, y_pos in positions.items():
            page_questions[q_id] = (page_num, y_pos)

    # Sort questions by their appearance
    sorted_questions = sorted(page_questions.items(), key=lambda x: (x[1][0], x[1][1]))

    # Extract each question
    for i, (q_id, (page_num, y_start)) in enumerate(sorted_questions):
        # Find next question's position
        if i + 1 < len(sorted_questions):
            next_q_id, (next_page_num, y_end) = sorted_questions[i + 1]

            # Only extract if next question is on same page
            if page_num == next_page_num:
                page = pdf[page_num]
                page_width = page.rect.width

                # Crop from top of current question to top of next question
                crop_rect = fitz.Rect(0, y_start - 3, page_width, y_end - 3)

                mat = fitz.Matrix(2.0, 2.0)
                pix = page.get_pixmap(matrix=mat, clip=crop_rect)

                output_path = os.path.join(output_dir, f"{q_id}.png")
                pix.save(output_path)
                extracted.append(q_id)
                print(f"  [OK] {q_id}")
        else:
            # Last question on last page - use reasonable height
            page = pdf[page_num]
            page_width = page.rect.width
            page_height = page.rect.height

            # Estimate end position
            y_end = min(y_start + 150, page_height)

            crop_rect = fitz.Rect(0, y_start - 3, page_width, y_end)

            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat, clip=crop_rect)

            output_path = os.path.join(output_dir, f"{q_id}.png")
            pix.save(output_path)
            extracted.append(q_id)
            print(f"  [OK] {q_id} (last)")

    pdf.close()
    return extracted

def extract_questions_legacy(pdf_path, year):
    """
    Extract questions for years before 2010
    Method: Start halfway through previous question's answer choices
    Find (A), (B), (C), (D), (E) pattern, go to middle of that region
    """
    output_dir = os.path.join(OUTPUT_BASE, str(year))
    os.makedirs(output_dir, exist_ok=True)

    pdf = fitz.open(pdf_path)
    extracted = []

    # For legacy format, we need to find the answer choices pattern
    # and use midpoint of answer region as separator

    all_questions = []
    for section in ['A', 'B', 'C']:
        for num in range(1, 9):
            all_questions.append(f"{section}{num}")

    # Find all question positions
    page_questions = {}
    for page_num in range(len(pdf)):
        page = pdf[page_num]
        positions = find_question_positions(page, all_questions)

        for q_id, y_pos in positions.items():
            page_questions[q_id] = (page_num, y_pos)

    sorted_questions = sorted(page_questions.items(), key=lambda x: (x[1][0], x[1][1]))

    # Extract each question with legacy method
    for i, (q_id, (page_num, q_start)) in enumerate(sorted_questions):
        if i + 1 < len(sorted_questions):
            next_q_id, (next_page_num, next_q_start) = sorted_questions[i + 1]

            if page_num == next_page_num:
                page = pdf[page_num]
                page_width = page.rect.width

                # For legacy: Start from midpoint between questions
                # Assumes answer choices are in the lower half of question region
                midpoint = (next_q_start + q_start) / 2

                # Start current question at its label
                # End at midpoint (middle of previous question's answers)
                crop_rect = fitz.Rect(0, q_start - 3, page_width, midpoint)

                mat = fitz.Matrix(2.0, 2.0)
                pix = page.get_pixmap(matrix=mat, clip=crop_rect)

                output_path = os.path.join(output_dir, f"{q_id}.png")
                pix.save(output_path)
                extracted.append(q_id)
                print(f"  [OK] {q_id} (legacy)")
        else:
            # Last question
            page = pdf[page_num]
            page_width = page.rect.width
            y_end = min(q_start + 150, page.rect.height)

            crop_rect = fitz.Rect(0, q_start - 3, page_width, y_end)
            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat, clip=crop_rect)

            output_path = os.path.join(output_dir, f"{q_id}.png")
            pix.save(output_path)
            extracted.append(q_id)
            print(f"  [OK] {q_id} (last, legacy)")

    pdf.close()
    return extracted

def process_all_years():
    """Process all years from 2000-2025"""

    # Get all PDF files
    pdf_files = []
    for f in os.listdir(PDF_DIR):
        if f.endswith('_34.pdf') and 'loesungen' not in f.lower():
            year = extract_year_from_filename(f)
            if year:
                pdf_files.append((year, f))

    pdf_files.sort()

    print(f"Found {len(pdf_files)} PDF files\n")

    total_extracted = 0

    for year, filename in pdf_files:
        print(f"Year {year}: {filename}")
        pdf_path = os.path.join(PDF_DIR, filename)

        try:
            if year >= 2010:
                extracted = extract_questions_modern(pdf_path, year)
            else:
                extracted = extract_questions_legacy(pdf_path, year)

            print(f"  Extracted: {len(extracted)} questions")
            total_extracted += len(extracted)
        except Exception as e:
            print(f"  ERROR: {e}")

        print()

    print("=" * 70)
    print(f"Total extracted: {total_extracted} questions")
    print(f"Output directory: {OUTPUT_BASE}")

if __name__ == '__main__':
    print("=" * 70)
    print("Kanguru Question Extractor - All Years (2000-2025)")
    print("=" * 70)
    print()

    process_all_years()
