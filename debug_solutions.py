#!/usr/bin/env python3
"""
Debug script to see the actual text structure from solutions PDF
"""

import fitz

PDF_PATH = r"C:\Users\I046576\Downloads\kanguru\kaenguru_loesungen_alle.pdf"

pdf = fitz.open(PDF_PATH)

# Look at page 1 (2025)
page = pdf[0]
text = page.get_text()

print("="*70)
print("Page 1 (2025) - Raw Text:")
print("="*70)
print(text)
print()
print("="*70)

pdf.close()
