#!/usr/bin/env python3
"""
Generate complete questions-data.js with all years (2012-2025)
Uses extracted solutions and creates placeholder text for all questions
"""

import json

SOLUTIONS_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\solutions_data.json"
OUTPUT_PATH = r"C:\temp\kanguru-practice\KanguruKlasse3\questions-data.js"

# Load solutions
with open(SOLUTIONS_PATH, 'r', encoding='utf-8') as f:
    solutions = json.load(f)

def get_points(question_id):
    """Return points for a question based on section"""
    section = question_id[0]
    if section == 'A':
        return 3
    elif section == 'B':
        return 4
    elif section == 'C':
        return 5
    return 3

def generate_question_object(question_id, year, correct_answer):
    """Generate a complete question object"""
    section = question_id[0]
    number = int(question_id[1])
    points = get_points(question_id)

    question = {
        'id': question_id,
        'section': section,
        'number': number,
        'year': year,
        'points': points,
        'questionTextDE': f'Aufgabe {question_id}',
        'questionTextEN': f'Question {question_id}',
        'hasImage': True,
        'imagePath': f'images/{year}/{question_id}.png',
        'options': [
            {'id': 'A', 'textDE': 'Antwort A', 'textEN': 'Answer A'},
            {'id': 'B', 'textDE': 'Antwort B', 'textEN': 'Answer B'},
            {'id': 'C', 'textDE': 'Antwort C', 'textEN': 'Answer C'},
            {'id': 'D', 'textDE': 'Antwort D', 'textEN': 'Answer D'},
            {'id': 'E', 'textDE': 'Antwort E', 'textEN': 'Answer E'}
        ],
        'correctAnswer': correct_answer,
        'reasoningDE': f'Die richtige Antwort ist {correct_answer}.',
        'reasoningEN': f'The correct answer is {correct_answer}.'
    }

    return question

def generate_js_object(data, indent=0):
    """Convert Python dict to JavaScript object string"""
    lines = []
    spaces = '    ' * indent

    if isinstance(data, dict):
        lines.append('{')
        items = list(data.items())
        for i, (key, value) in enumerate(items):
            comma = ',' if i < len(items) - 1 else ''

            # Handle different key types
            if isinstance(key, str) and key.isidentifier():
                key_str = key
            else:
                key_str = str(key)

            value_str = generate_js_object(value, indent + 1)
            lines.append(f'{spaces}    {key_str}: {value_str}{comma}')

        lines.append(f'{spaces}}}')

    elif isinstance(data, list):
        if not data:
            return '[]'

        lines.append('[')
        for i, item in enumerate(data):
            comma = ',' if i < len(data) - 1 else ''
            item_str = generate_js_object(item, indent + 1)
            lines.append(f'{spaces}    {item_str}{comma}')
        lines.append(f'{spaces}]')

    elif isinstance(data, str):
        # Escape single quotes
        escaped = data.replace("'", "\\'")
        return f"'{escaped}'"

    elif isinstance(data, bool):
        return 'true' if data else 'false'

    elif isinstance(data, (int, float)):
        return str(data)

    else:
        return str(data)

    return '\n'.join(lines)

def generate_questions_data():
    """Generate complete questions data for all years"""

    print("="*70)
    print("Generating Complete Questions Data")
    print("="*70)
    print()

    all_data = {}
    total_questions = 0

    for year_str in sorted(solutions.keys()):
        year = int(year_str)
        year_solutions = solutions[year_str]

        questions = []

        # Generate all 24 questions (A1-A8, B1-B8, C1-C8)
        for section in ['A', 'B', 'C']:
            for num in range(1, 9):
                q_id = f'{section}{num}'
                correct_answer = year_solutions.get(q_id, 'A')  # Default to A if missing
                question = generate_question_object(q_id, year, correct_answer)
                questions.append(question)

        all_data[year] = {
            'year': year,
            'title': f'Känguru {year} - Klasse 3/4',
            'questions': questions
        }

        total_questions += len(questions)
        print(f"  Year {year}: {len(questions)} questions")

    print()
    print(f"Total: {total_questions} questions generated")
    print()

    # Generate JavaScript file
    print("Writing JavaScript file...")

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("// Känguru Math Quiz - Complete Questions Data\n")
        f.write("// Auto-generated with all years (2012-2025)\n")
        f.write("\n")
        f.write("const questionsData = {\n")

        years = sorted(all_data.keys())
        for i, year in enumerate(years):
            year_data = all_data[year]
            comma = ',' if i < len(years) - 1 else ''

            f.write(f"    {year}: {{\n")
            f.write(f"        year: {year},\n")
            f.write(f"        title: '{year_data['title']}',\n")
            f.write(f"        questions: [\n")

            questions = year_data['questions']
            for j, q in enumerate(questions):
                q_comma = ',' if j < len(questions) - 1 else ''

                f.write(f"            {{\n")
                f.write(f"                id: '{q['id']}',\n")
                f.write(f"                section: '{q['section']}',\n")
                f.write(f"                number: {q['number']},\n")
                f.write(f"                year: {q['year']},\n")
                f.write(f"                points: {q['points']},\n")
                f.write(f"                questionTextDE: '{q['questionTextDE']}',\n")
                f.write(f"                questionTextEN: '{q['questionTextEN']}',\n")
                f.write(f"                hasImage: {str(q['hasImage']).lower()},\n")
                f.write(f"                imagePath: '{q['imagePath']}',\n")
                f.write(f"                options: [\n")

                for k, opt in enumerate(q['options']):
                    opt_comma = ',' if k < len(q['options']) - 1 else ''
                    f.write(f"                    {{ id: '{opt['id']}', textDE: '{opt['textDE']}', textEN: '{opt['textEN']}' }}{opt_comma}\n")

                f.write(f"                ],\n")
                f.write(f"                correctAnswer: '{q['correctAnswer']}',\n")
                f.write(f"                reasoningDE: '{q['reasoningDE']}',\n")
                f.write(f"                reasoningEN: '{q['reasoningEN']}'\n")
                f.write(f"            }}{q_comma}\n")

            f.write(f"        ]\n")
            f.write(f"    }}{comma}\n")

        f.write("};\n")

    print(f"File saved: {OUTPUT_PATH}")
    print()
    print("="*70)

if __name__ == '__main__':
    generate_questions_data()
