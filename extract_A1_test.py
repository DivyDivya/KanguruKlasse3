#!/usr/bin/env python3
"""
Extract ONLY question A1 from Kanguru 2025 PDF
Clean, simple approach - extract from A1 label to just before A2 label
"""

import fitz  # PyMuPDF

# Configuration
PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru2025_34.pdf"
OUTPUT_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\images\2025\A1.png"

def extract_a1_only():
    """
    Extract question A1 image:
    - Start: Where "A1" text appears (the question label in the box)
    - End: Just before "A2" text appears
    - Width: Full page width (edge to edge)
    """

    try:
        # Open PDF
        pdf = fitz.open(PDF_PATH)
        page = pdf[0]  # First page

        # Find "A1" text location
        a1_rects = page.search_for("A1")
        if not a1_rects:
            print("ERROR: Could not find 'A1' on the page")
            return False

        # Find "A2" text location
        a2_rects = page.search_for("A2")
        if not a2_rects:
            print("ERROR: Could not find 'A2' on the page")
            return False

        # Get coordinates
        # Use fixed positions as specified
        a1_top = 260  # Start at y=260
        a2_top = 379  # End at y=379 (where A2 starts)

        # Full page width
        page_width = page.rect.width

        # Define crop rectangle (full width, from A1 to A2)
        crop_rect = fitz.Rect(
            0,           # Left edge (x0)
            a1_top,      # Top (y0) - start at A1
            page_width,  # Right edge (x1)
            a2_top       # Bottom (y1) - stop before A2
        )

        print(f"Page dimensions: {page_width:.1f} x {page.rect.height:.1f} points")
        print(f"A1 found at y={a1_rects[0].y0:.1f}")
        print(f"A2 found at y={a2_rects[0].y0:.1f}")
        print(f"Extracting crop box: x=0-{page_width:.1f}, y={a1_top:.1f}-{a2_top:.1f}")
        print(f"Height of extracted region: {a2_top - a1_top:.1f} points")

        # Render at 2x resolution for quality
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat, clip=crop_rect)

        # Save
        pix.save(OUTPUT_PATH)

        # Get file size
        import os
        file_size = os.path.getsize(OUTPUT_PATH) / 1024

        print(f"\nSUCCESS!")
        print(f"Saved: {OUTPUT_PATH}")
        print(f"Size: {file_size:.1f} KB")
        print(f"Dimensions: {pix.width} x {pix.height} pixels")

        pdf.close()
        return True

    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    print("=" * 60)
    print("Kanguru 2025 - Extract Question A1 ONLY")
    print("=" * 60)
    print()

    success = extract_a1_only()

    if success:
        print("\nPlease validate the extracted A1.png image.")
        print("If correct, we'll proceed with the remaining questions.")
    else:
        print("\nExtraction failed. Please check the errors above.")
