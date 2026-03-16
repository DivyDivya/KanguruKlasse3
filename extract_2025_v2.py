#!/usr/bin/env python3
"""
Extract individual question images from Kanguru 2025 PDF
Using measured pixel coordinates from page inspection
"""

import os
import fitz  # PyMuPDF

PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru2025_34.pdf"
OUTPUT_DIR = r"C:\temp\kanguru-practice\KanguruKlasse3\images\2025"

# Measured coordinates in PDF points
# Each question box: from question ID to just before next question
# Format: (page_num, y_top, y_bottom)
QUESTIONS = {
    # Page 1 (index 0) - 3-Punkte-Aufgaben section
    'A1': (0, 280, 395),   # Windrad - ID through all 5 options
    'A2': (0, 395, 510),   # Handschuh - ice rink tracks
    'A3': (0, 510, 630),   # Zahnputzbecher - toothbrush cups
    'A4': (0, 630, 730),   # Number boxes calculation
    'A5': (0, 730, 860),   # Würfel construction photos

    # Page 2 (index 1)
    'A6': (1, 40, 160),    # Igel Ingmar path
    'A7': (1, 160, 270),   # Rope knot
    'A8': (1, 270, 360),   # Dice sum (text only, short)
    # 4-Punkte-Aufgaben starts around 420
    'B1': (1, 420, 540),   # Three bars star pattern
    'B2': (1, 540, 670),   # Snail shells payment
    'B3': (1, 670, 800),   # Checkerboard pieces
    'B4': (1, 800, 930),   # Card sequence

    # Page 3 (index 2)
    'B5': (2, 40, 190),    # Cookie distribution
    'B6': (2, 190, 350),   # Pizza division with tomatoes
    'B7': (2, 350, 480),   # Sheep feeding
    'B8': (2, 480, 590),   # Rose bouquet combinations
    # 5-Punkte-Aufgaben starts around 650
    'C1': (2, 650, 820),   # Ladybugs with dots
    'C2': (2, 820, 970),   # Paper folding pattern

    # Page 4 (index 3)
    'C3': (3, 40, 220),    # Numbers in circles
    'C4': (3, 220, 395),   # Marbles and water containers
    'C5': (3, 395, 560),   # Cube pyramid from above
    'C6': (3, 560, 675),   # Buttons in box
    'C7': (3, 675, 850),   # Building blocks measurement
    'C8': (3, 850, 1020),  # Balance scales puzzle
}

def extract_all_questions():
    """Extract all 24 questions from 2025 PDF"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    try:
        pdf = fitz.open(PDF_PATH)
        print(f"Extracting {len(QUESTIONS)} questions from 2025 PDF\n")

        for q_id in sorted(QUESTIONS.keys()):
            page_num, y_top, y_bottom = QUESTIONS[q_id]
            page = pdf[page_num]
            page_width = page.rect.width

            # Full width crop
            crop_rect = fitz.Rect(0, y_top, page_width, y_bottom)

            # High resolution (2x)
            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat, clip=crop_rect)

            # Save
            output_path = os.path.join(OUTPUT_DIR, f"{q_id}.png")
            pix.save(output_path)

            # Calculate size in KB
            file_size = os.path.getsize(output_path) / 1024
            print(f"  [OK] {q_id}: page {page_num+1}, y={y_top}-{y_bottom} ({file_size:.1f} KB)")

        pdf.close()
        print(f"\n✓ Successfully extracted all {len(QUESTIONS)} questions!")
        print(f"  Output: {OUTPUT_DIR}")

    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    extract_all_questions()
