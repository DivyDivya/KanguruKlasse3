#!/usr/bin/env python3
"""
Extract individual question images from Kanguru PDF files
Crops each question (A1-A8, B1-B8, C1-C8) as separate images
"""

import os
import sys
import re
from pathlib import Path

try:
    import fitz  # PyMuPDF
    from PIL import Image
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'PyMuPDF', 'Pillow'])
    import fitz
    from PIL import Image

# Configuration
PDF_DIR = r"C:\Users\I046576\Downloads\kanguru"
OUTPUT_DIR = r"C:\temp\kanguru-practice\KanguruKlasse3\images"

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

def find_question_boxes(page):
    """
    Find question bounding boxes on a page
    Look for question IDs like A1, A2, B1, etc.
    """
    questions = []
    text_instances = page.search_for("A1")
    text_instances += page.search_for("A2")
    text_instances += page.search_for("A3")
    text_instances += page.search_for("A4")
    text_instances += page.search_for("A5")
    text_instances += page.search_for("A6")
    text_instances += page.search_for("A7")
    text_instances += page.search_for("A8")
    text_instances += page.search_for("B1")
    text_instances += page.search_for("B2")
    text_instances += page.search_for("B3")
    text_instances += page.search_for("B4")
    text_instances += page.search_for("B5")
    text_instances += page.search_for("B6")
    text_instances += page.search_for("B7")
    text_instances += page.search_for("B8")
    text_instances += page.search_for("C1")
    text_instances += page.search_for("C2")
    text_instances += page.search_for("C3")
    text_instances += page.search_for("C4")
    text_instances += page.search_for("C5")
    text_instances += page.search_for("C6")
    text_instances += page.search_for("C7")
    text_instances += page.search_for("C8")

    return text_instances

def extract_question_image(page, question_rect, question_id, output_path, scale=2.0):
    """
    Extract a specific question region from a page
    """
    # Get full page dimensions
    page_rect = page.rect

    # Capture full width from edge to edge (with minimal margins)
    x0 = 5  # Very small left margin (just border)
    y0 = max(0, question_rect.y0 - 5)  # Slightly above question ID
    x1 = page_rect.width - 5  # Very small right margin

    # Calculate height based on question type
    # Questions typically need more vertical space
    height = 150  # Default height for most questions

    y1 = min(page_rect.height, y0 + height)

    crop_rect = fitz.Rect(x0, y0, x1, y1)

    # Create matrix for high resolution
    mat = fitz.Matrix(scale, scale)

    # Render the cropped area
    pix = page.get_pixmap(matrix=mat, clip=crop_rect)

    # Save
    pix.save(output_path)
    return True

def extract_questions_from_pdf(pdf_path, year):
    """Extract individual question images from PDF"""
    output_folder = os.path.join(OUTPUT_DIR, str(year))
    os.makedirs(output_folder, exist_ok=True)

    try:
        pdf_document = fitz.open(pdf_path)
        print(f"  PDF has {len(pdf_document)} pages")

        extracted_questions = []

        # Process each page
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]

            # Search for all question IDs (A1-A8, B1-B8, C1-C8)
            for section in ['A', 'B', 'C']:
                for num in range(1, 9):
                    question_id = f"{section}{num}"

                    # Search for question ID
                    rects = page.search_for(question_id)

                    if rects:
                        # Take the first occurrence (usually the question label)
                        rect = rects[0]

                        # Output path
                        output_path = os.path.join(output_folder, f"{question_id}.png")

                        # Extract question image
                        success = extract_question_image(page, rect, question_id, output_path)

                        if success:
                            extracted_questions.append(question_id)
                            print(f"    [OK] {question_id} -> {question_id}.png")

        pdf_document.close()
        print(f"  Extracted {len(extracted_questions)} questions")
        return len(extracted_questions)

    except Exception as e:
        print(f"  Error: {e}")
        import traceback
        traceback.print_exc()
        return 0

def main():
    """Main extraction function"""
    print("=" * 60)
    print("Kanguru Individual Question Extractor")
    print("=" * 60)

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get PDF files
    pdf_files = []
    for f in os.listdir(PDF_DIR):
        if f.endswith('_34.pdf') and 'loesungen' not in f.lower():
            pdf_files.append(f)

    pdf_files.sort()
    print(f"\nFound {len(pdf_files)} PDF files to process\n")

    # Process each PDF
    total_questions = 0
    processed_years = []

    for pdf_file in pdf_files:
        year = extract_year_from_filename(pdf_file)
        if not year:
            continue

        print(f"Processing year {year}: {pdf_file}")
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        questions = extract_questions_from_pdf(pdf_path, year)

        if questions > 0:
            total_questions += questions
            processed_years.append(year)
        print()

    print("=" * 60)
    print(f"Extraction complete!")
    print(f"  Years processed: {len(processed_years)}")
    print(f"  Total questions extracted: {total_questions}")
    print(f"  Images saved to: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == '__main__':
    main()
