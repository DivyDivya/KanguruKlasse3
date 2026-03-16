#!/usr/bin/env python3
"""
Extract question A1 from Kanguru 2025 PDF
Start: Top edge of the A1 box (where the red box starts in your example)
End: Top edge of the A2 box (where A2 starts)
"""

import fitz  # PyMuPDF

# Configuration
PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru2025_34.pdf"
OUTPUT_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\images\2025\A1.png"

def extract_a1():
    """
    Extract question A1:
    - Find the A1 text box
    - Start from the TOP of the A1 box (including the box border)
    - End at the TOP of the A2 box
    - Full page width
    """

    try:
        # Open PDF
        pdf = fitz.open(PDF_PATH)
        page = pdf[0]  # First page

        # Find "A1" text - this returns the bounding box of the text
        a1_rects = page.search_for("A1")
        if not a1_rects:
            print("ERROR: Could not find 'A1' on the page")
            return False

        # Find "A2" text
        a2_rects = page.search_for("A2")
        if not a2_rects:
            print("ERROR: Could not find 'A2' on the page")
            return False

        # The search_for returns the bounding box of the text itself
        # a1_rects[0] gives us the rectangle containing "A1" text
        # We need the TOP of this rectangle (y0) as our starting point

        # For A1: Start at the top of the A1 box
        # The box with "A1" in it - we want to include the box, so start slightly above
        a1_box_top = a1_rects[0].y0 - 3  # Include the top border of the A1 box

        # For A2: End at the top of the A2 box
        a2_box_top = a2_rects[0].y0 - 3  # Stop at top border of A2 box

        # Full page width (edge to edge)
        page_width = page.rect.width

        # Define crop rectangle
        crop_rect = fitz.Rect(
            0,            # Left edge (x0)
            a1_box_top,   # Top (y0) - top of A1 box
            page_width,   # Right edge (x1)
            a2_box_top    # Bottom (y1) - top of A2 box
        )

        print(f"Page dimensions: {page_width:.1f} x {page.rect.height:.1f} points")
        print(f"")
        print(f"A1 text found at: y={a1_rects[0].y0:.1f} (using top edge at y={a1_box_top:.1f})")
        print(f"A2 text found at: y={a2_rects[0].y0:.1f} (using top edge at y={a2_box_top:.1f})")
        print(f"")
        print(f"Crop box:")
        print(f"  X: 0 to {page_width:.1f} (full width)")
        print(f"  Y: {a1_box_top:.1f} to {a2_box_top:.1f}")
        print(f"  Height: {a2_box_top - a1_box_top:.1f} points")

        # Render at 2x resolution
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat, clip=crop_rect)

        # Save
        pix.save(OUTPUT_PATH)

        # Get file info
        import os
        file_size = os.path.getsize(OUTPUT_PATH) / 1024

        print(f"")
        print(f"SUCCESS!")
        print(f"Output: {OUTPUT_PATH}")
        print(f"Size: {file_size:.1f} KB")
        print(f"Pixels: {pix.width} x {pix.height}")

        pdf.close()
        return True

    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    print("=" * 70)
    print("Kanguru 2025 - Extract Question A1")
    print("=" * 70)
    print()

    success = extract_a1()

    print()
    if success:
        print("Please check A1.png to validate it matches your red box example.")
    else:
        print("Extraction failed.")
