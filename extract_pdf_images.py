#!/usr/bin/env python3
"""
Extract images from Kanguru PDF files
Creates one image per page for each question
"""

import os
import sys
from pathlib import Path

try:
    from pdf2image import convert_from_path
    from PIL import Image
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pdf2image', 'Pillow'])
    from pdf2image import convert_from_path
    from PIL import Image

# Configuration
PDF_DIR = r"C:\Users\I046576\Downloads\kanguru"
OUTPUT_DIR = r"C:\temp\kanguru-practice\KanguruKlasse3\images"

def extract_year_from_filename(filename):
    """Extract year from filename"""
    import re
    match = re.search(r'(\d{4})_34\.pdf$', filename)
    if match:
        return int(match.group(1))

    match = re.search(r'(\d{2})_34\.pdf$', filename)
    if match:
        year_suffix = int(match.group(1))
        return 2000 + year_suffix

    return None

def extract_images_from_pdf(pdf_path, year):
    """Convert PDF pages to images"""
    output_folder = os.path.join(OUTPUT_DIR, str(year))
    os.makedirs(output_folder, exist_ok=True)

    try:
        print(f"Converting PDF to images for year {year}...")
        # Convert PDF to images (200 DPI for good quality)
        images = convert_from_path(pdf_path, dpi=200)

        print(f"  Extracted {len(images)} pages")

        for i, image in enumerate(images, 1):
            # Save full page
            full_page_path = os.path.join(output_folder, f"page_{i}.png")
            image.save(full_page_path, 'PNG', optimize=True)
            print(f"  Saved: {full_page_path}")

        return len(images)

    except Exception as e:
        print(f"  Error: {e}")
        return 0

def main():
    """Main extraction function"""
    print("Kanguru PDF Image Extractor")
    print("=" * 50)

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
    for pdf_file in pdf_files:
        year = extract_year_from_filename(pdf_file)
        if not year:
            continue

        pdf_path = os.path.join(PDF_DIR, pdf_file)
        pages = extract_images_from_pdf(pdf_path, year)
        total_pages += pages
        print()

    print(f"\nExtraction complete!")
    print(f"Total pages extracted: {total_pages}")
    print(f"Images saved to: {OUTPUT_DIR}")

    # Check for poppler
    try:
        import subprocess
        result = subprocess.run(['pdftoppm', '-h'], capture_output=True)
        print("\n✓ Poppler is installed")
    except FileNotFoundError:
        print("\n⚠ Warning: Poppler not found!")
        print("  Install poppler-utils to enable PDF to image conversion:")
        print("  - Windows: Download from https://github.com/oschwartz10612/poppler-windows/releases/")
        print("  - Add to PATH or place in project directory")

if __name__ == '__main__':
    main()
