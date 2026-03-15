#!/usr/bin/env python3
"""
Map question IDs to image numbers based on Word document structure.
From the XML, we know the structure is:
- Section header image (3-Punkte-Aufgaben)
- A1 label + A1 image
- A2 label + A2 image
... etc
"""

# Starting from 2012, the format is: header, then pairs of (label, question_image)
# Images are: 1=header3pt, 2=A1, 3=header4pt, 4=A2, etc.

mapping = {
    # For 2012-2025 (A1-A8, B1-B8, C1-C8 format)
    # Pattern: header(1), A1(2), A2(3), A3(4), A4(5), A5(6), A6(7), header(8), A7(9), A8(10), B1(11), B2(12), B3(13), B4(14), header(15), B5(16), B6(17), B7(18), B8(19), C1(20), C2(21), C3(22), C4(23), C5(24), C6(25), C7(26), C8(27)

    'A1': 2, 'A2': 4, 'A3': 6, 'A4': 8, 'A5': 10,
    'A6': 12, 'A7': 14, 'A8': 16,
    'B1': 18, 'B2': 20, 'B3': 22, 'B4': 24,
    'B5': 26, 'B6': 28, 'B7': 30, 'B8': 32,
    'C1': 34, 'C2': 36, 'C3': 38, 'C4': 40,
    'C5': 42, 'C6': 44, 'C7': 46, 'C8': 48
}

# Generate updated tests-data.js
with open('tests-data.js', 'r') as f:
    content = f.read()

# Add mapping at the end
content += '\n// Question ID to image number mapping\n'
content += 'const questionImageMap = ' + str(mapping).replace("'", '"') + ';\n'

with open('tests-data.js', 'w') as f:
    f.write(content)

print("Updated tests-data.js with image mapping")
