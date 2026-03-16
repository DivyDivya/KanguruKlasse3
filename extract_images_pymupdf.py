#!/usr/bin/env python3
"""
Extract images from Kanguru PDF files using PyMuPDF (fitz)
No external dependencies like poppler needed!
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

def extract_images_from_pdf(pdf_path, year):
    """Extract images from PDF using PyMuPDF"""
    output_folder = os.path.join(OUTPUT_DIR, str(year))
    os.makedirs(output_folder, exist_ok=True)

    try:
        # Open PDF
        pdf_document = fitz.open(pdf_path)
        print(f"  PDF has {len(pdf_document)} pages")

        # Extract each page as an image
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]

            # Render page to image (matrix increases resolution)
            # Scale factor: 2.0 = 144 DPI (good quality)
            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat)

            # Save as PNG
            output_path = os.path.join(output_folder, f"page_{page_num + 1}.png")
            pix.save(output_path)
            print(f"    Page {page_num + 1} -> {output_path}")

        pdf_document.close()
        return len(pdf_document)

    except Exception as e:
        print(f"  Error: {e}")
        return 0

def main():
    """Main extraction function"""
    print("=" * 60)
    print("Kanguru PDF Image Extractor (PyMuPDF)")
    print("=" * 60)

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get all PDF files
    pdf_files = []
    for f in os.listdir(PDF_DIR):
        if f.endswith('_34.pdf') and 'loesungen' not in f.lower():
            pdf_files.append(f)

    pdf_files.sort()
    print(f"\nFound {len(pdf_files)} PDF files to process\n")

    # Process each PDF
    total_pages = 0
    processed_years = []

    for pdf_file in pdf_files:
        year = extract_year_from_filename(pdf_file)
        if not year:
            continue

        print(f"Processing year {year}: {pdf_file}")
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        pages = extract_images_from_pdf(pdf_path, year)

        if pages > 0:
            total_pages += pages
            processed_years.append(year)
        print()

    print("=" * 60)
    print(f"Extraction complete!")
    print(f"  Years processed: {len(processed_years)} ({min(processed_years) if processed_years else 'N/A'}-{max(processed_years) if processed_years else 'N/A'})")
    print(f"  Total pages extracted: {total_pages}")
    print(f"  Images saved to: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == '__main__':
    main()
