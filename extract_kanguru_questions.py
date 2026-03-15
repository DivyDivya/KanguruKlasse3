#!/usr/bin/env python3
"""
Kanguru Math Competition Question Extractor
Extracts questions, images, and answers from Kanguru PDF files
"""

import os
import re
import json
from pathlib import Path

try:
    import PyPDF2
    from pdf2image import convert_from_path
    from PIL import Image
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'PyPDF2', 'pdf2image', 'Pillow'])
    import PyPDF2
    from pdf2image import convert_from_path
    from PIL import Image

# Configuration
PDF_DIR = r"C:\Users\I046576\Downloads\kanguru"
OUTPUT_DIR = r"C:\temp\kanguru-practice\KanguruKlasse3"
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")
ANSWER_KEY_FILE = os.path.join(PDF_DIR, "kaenguru_loesungen_alle.pdf")

# Create directories
os.makedirs(IMAGES_DIR, exist_ok=True)

def extract_year_from_filename(filename):
    """Extract year from filename (e.g., kaenguru2025_34.pdf -> 2025)"""
    match = re.search(r'(\d{4})_34\.pdf$', filename)
    if match:
        return int(match.group(1))

    # Handle 00_34.pdf format (2000-2019)
    match = re.search(r'(\d{2})_34\.pdf$', filename)
    if match:
        year_suffix = int(match.group(1))
        return 2000 + year_suffix

    return None

def extract_text_from_pdf(pdf_path):
    """Extract all text from PDF"""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text

def convert_pdf_to_images(pdf_path, year):
    """Convert PDF pages to images"""
    output_folder = os.path.join(IMAGES_DIR, str(year))
    os.makedirs(output_folder, exist_ok=True)

    try:
        # Convert PDF to images (one image per page)
        images = convert_from_path(pdf_path, dpi=200)

        image_paths = []
        for i, image in enumerate(images):
            image_path = os.path.join(output_folder, f"page_{i+1}.png")
            image.save(image_path, 'PNG')
            image_paths.append(image_path)

        return image_paths
    except Exception as e:
        print(f"Error converting PDF to images for year {year}: {e}")
        return []

def parse_questions_from_text(text, year):
    """Parse questions from extracted text"""
    questions = []

    # Find question sections (A1-A8, B1-B8, C1-C8)
    question_pattern = r'([ABC])(\d+)\s+(.*?)(?=\s*\([ABCDE]\)|\n[ABC]\d+|\Z)'

    # Split by question sections
    lines = text.split('\n')
    current_question = None

    for line in lines:
        # Check if line starts with question ID (A1, B1, C1, etc.)
        match = re.match(r'^([ABC])(\d+)\s+(.+)', line.strip())
        if match:
            if current_question:
                questions.append(current_question)

            section = match.group(1)
            num = int(match.group(2))
            question_text = match.group(3)

            # Determine difficulty/points
            points = {'A': 3, 'B': 4, 'C': 5}[section]

            current_question = {
                'id': f"{section}{num}",
                'year': year,
                'section': section,
                'number': num,
                'points': points,
                'questionText': question_text,
                'options': [],
                'hasImage': True,  # Most Kanguru questions have images
                'imagePath': f"images/{year}/page_1.png"  # Will be refined later
            }

    if current_question:
        questions.append(current_question)

    return questions

def extract_answer_key(answer_pdf_path):
    """Extract answer key from solution PDF"""
    text = extract_text_from_pdf(answer_pdf_path)

    # Parse answers in format like: 2025: A1-B, A2-C, ...
    answers = {}

    # Look for patterns like "2025" followed by question IDs and answers
    year_pattern = r'(\d{4})[:\s]+(.*?)(?=\d{4}[:\s]+|\Z)'
    matches = re.findall(year_pattern, text, re.DOTALL)

    for year_str, answer_section in matches:
        year = int(year_str)
        answers[year] = {}

        # Extract individual answers (A1-B, A2-C, etc.)
        answer_pattern = r'([ABC]\d+)[\s\-:]+([A-E])'
        question_answers = re.findall(answer_pattern, answer_section)

        for q_id, answer in question_answers:
            answers[year][q_id] = answer

    return answers

def generate_questions_data():
    """Main function to generate questions data"""
    all_questions = []

    # Get all PDF files
    pdf_files = [f for f in os.listdir(PDF_DIR) if f.endswith('_34.pdf') and 'loesungen' not in f]
    pdf_files.sort()

    print(f"Found {len(pdf_files)} PDF files")

    # Extract answer key
    print("Extracting answer key...")
    answer_key = extract_answer_key(ANSWER_KEY_FILE)
    print(f"Extracted answers for {len(answer_key)} years")

    # Process each PDF
    for pdf_file in pdf_files:
        year = extract_year_from_filename(pdf_file)
        if not year:
            continue

        print(f"\nProcessing year {year}...")
        pdf_path = os.path.join(PDF_DIR, pdf_file)

        # Extract text
        text = extract_text_from_pdf(pdf_path)

        # Convert to images
        print(f"  Converting PDF to images...")
        image_paths = convert_pdf_to_images(pdf_path, year)

        # Parse questions (basic structure)
        print(f"  Parsing questions...")
        questions = parse_questions_from_text(text, year)

        # Add answers
        if year in answer_key:
            for question in questions:
                q_id = question['id']
                if q_id in answer_key[year]:
                    question['correctAnswer'] = answer_key[year][q_id]

        all_questions.extend(questions)
        print(f"  Found {len(questions)} questions for year {year}")

    return all_questions

def create_manual_data_structure():
    """Create a simplified data structure that can be manually populated"""
    # For now, create a template structure based on known format
    years_data = {}

    for year in range(2000, 2026):
        years_data[year] = {
            'year': year,
            'title': f'Känguru {year} - Klasse 3/4',
            'questions': []
        }

        # Template for 24 questions (A1-A8, B1-B8, C1-C8)
        for section in ['A', 'B', 'C']:
            points = {'A': 3, 'B': 4, 'C': 5}[section]
            for num in range(1, 9):
                question = {
                    'id': f"{section}{num}",
                    'section': section,
                    'number': num,
                    'points': points,
                    'questionTextDE': '',  # To be filled
                    'questionTextEN': '',  # To be translated
                    'options': [
                        {'id': 'A', 'textDE': '', 'textEN': ''},
                        {'id': 'B', 'textDE': '', 'textEN': ''},
                        {'id': 'C', 'textDE': '', 'textEN': ''},
                        {'id': 'D', 'textDE': '', 'textEN': ''},
                        {'id': 'E', 'textDE': '', 'textEN': ''}
                    ],
                    'correctAnswer': '',  # A, B, C, D, or E
                    'hasImage': True,
                    'imagePath': f'images/{year}/{section}{num}.png',
                    'reasoningDE': '',  # Explanation in German
                    'reasoningEN': ''   # Explanation in English
                }
                years_data[year]['questions'].append(question)

    return years_data

if __name__ == '__main__':
    print("Kanguru Question Extractor")
    print("=" * 50)

    # For now, create a template structure
    # Full extraction requires poppler/pdftoppm which may not be available
    print("\nCreating template data structure...")
    years_data = create_manual_data_structure()

    # Save template
    output_file = os.path.join(OUTPUT_DIR, 'questions-data-template.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(years_data, f, ensure_ascii=False, indent=2)

    print(f"\nTemplate saved to: {output_file}")
    print("\nNote: This template needs to be populated with actual question content.")
    print("Consider using a PDF library with OCR or manual data entry for accuracy.")
