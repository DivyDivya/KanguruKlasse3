#!/usr/bin/env python3
"""
Extract individual question images from Kanguru PDF - MANUAL MODE
For year 2025, manually define question boundaries
"""

import os
import sys
import fitz  # PyMuPDF

# Configuration
PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru2025_34.pdf"
OUTPUT_DIR = r"C:\temp\kanguru-practice\KanguruKlasse3\images\2025"

# Manual question boundaries for 2025 (y-coordinates from visual inspection)
# Format: question_id: (page_num, y_start, y_end)
QUESTION_POSITIONS_2025 = {
    # Page 1
    'A1': (0, 395, 545),   # Windrad question
    'A2': (0, 545, 670),   # Handschuh question
    'A3': (0, 670, 800),   # Zahnputzbecher
    'A4': (0, 800, 920),   # Number calculation
    'A5': (0, 920, 1050),  # Würfel photos

    # Page 2
    'A6': (1, 50, 200),    # Igel Ingmar
    'A7': (1, 200, 330),   # Seil knot
    'A8': (1, 330, 430),   # Dice total
    'B1': (1, 490, 640),   # Stäbe sternförmig
    'B2': (1, 640, 780),   # Schneckenhäuser
    'B3': (1, 780, 920),   # Schachbrett
    'B4': (1, 920, 1050),  # Karten

    # Page 3
    'B5': (2, 50, 220),    # Kekse verteilen
    'B6': (2, 220, 400),   # Pizza teilen
    'B7': (2, 400, 530),   # Schafe füttern
    'B8': (2, 530, 650),   # Rosen strauß
    'C1': (2, 710, 900),   # Marienkäfer
    'C2': (2, 900, 1050),  # Paper folding

    # Page 4
    'C3': (3, 50, 250),    # Zahlen in Kreise
    'C4': (3, 250, 430),   # Murmeln und Wasser
    'C5': (3, 430, 600),   # Würfelpyramide
    'C6': (3, 600, 720),   # Knöpfe in Schatulle
    'C7': (3, 720, 900),   # Bausteine
    'C8': (3, 900, 1050),  # Waagen
}

def extract_questions_2025():
    """Extract all questions from 2025 PDF"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    try:
        pdf = fitz.open(PDF_PATH)
        print(f"Extracting questions from 2025 PDF...")
        print(f"PDF has {len(pdf)} pages\n")

        for question_id, (page_num, y_start, y_end) in sorted(QUESTION_POSITIONS_2025.items()):
            page = pdf[page_num]
            page_rect = page.rect

            # Full width, specified height
            crop_rect = fitz.Rect(
                0,  # Left edge
                y_start,  # Top
                page_rect.width,  # Right edge
                y_end  # Bottom
            )

            # Render at 2x resolution for quality
            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat, clip=crop_rect)

            # Save
            output_path = os.path.join(OUTPUT_DIR, f"{question_id}.png")
            pix.save(output_path)
            print(f"  [OK] {question_id} -> {question_id}.png")

        pdf.close()
        print(f"\nExtracted {len(QUESTION_POSITIONS_2025)} questions successfully!")
        print(f"Images saved to: {OUTPUT_DIR}")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    extract_questions_2025()
