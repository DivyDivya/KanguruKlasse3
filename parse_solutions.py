#!/usr/bin/env python3
"""Parse Kanguru solutions and generate questions-data.js"""

# Read solutions
with open('kanguru/solutions.txt', 'r') as f:
    lines = [line.strip() for line in f.readlines() if line.strip()]

# Parse solutions by year
solutions = {}
i = 0
while i < len(lines):
    if lines[i].isdigit() and len(lines[i]) == 4:  # Year
        year = lines[i]
        solutions[year] = []
        i += 1

        # Read questions until next year
        while i < len(lines) and not (lines[i].isdigit() and len(lines[i]) == 4):
            if lines[i] == 'Aufgabe':
                i += 1
                questions = []
                while i < len(lines) and lines[i] not in ['Antwort', 'Aufgabe'] and not (lines[i].isdigit() and len(lines[i]) == 4):
                    questions.append(lines[i])
                    i += 1

                if i < len(lines) and lines[i] == 'Antwort':
                    i += 1
                    answers = []
                    while i < len(lines) and lines[i] not in ['Aufgabe'] and not (lines[i].isdigit() and len(lines[i]) == 4):
                        if lines[i] in ['A', 'B', 'C', 'D', 'E']:
                            answers.append(lines[i])
                        i += 1

                    for q, a in zip(questions, answers):
                        solutions[year].append({'question': q, 'answer': a})
            else:
                i += 1
    else:
        i += 1

# Generate JavaScript file
output = """// Kanguru Math Contest Questions - Generated from PDFs
// Each test contains 24 questions from a specific year
// Questions are displayed as images with radio button answers (A-E)

const tests = {
"""

for year in sorted(solutions.keys()):
    if len(solutions[year]) >= 24:  # Only include years with full tests
        output += f'  "{year}": [\n'
        for i, item in enumerate(solutions[year][:24]):  # Take first 24 questions
            q_id = item['question']
            answer = item['answer']
            answer_index = ord(answer) - ord('A')  # Convert A-E to 0-4

            # Determine difficulty based on question ID
            if q_id.startswith('A') or (q_id.isdigit() and int(q_id) <= 8):
                difficulty = 'easy'
                points = 3
            elif q_id.startswith('B') or (q_id.isdigit() and 9 <= int(q_id) <= 16):
                difficulty = 'medium'
                points = 4
            elif q_id.startswith('C') or (q_id.isdigit() and int(q_id) >= 17):
                difficulty = 'hard'
                points = 5
            else:
                difficulty = 'easy'
                points = 3

            output += f'    {{\n'
            output += f'      id: "{year}_{q_id}",\n'
            output += f'      year: {year},\n'
            output += f'      questionId: "{q_id}",\n'
            output += f'      difficulty: "{difficulty}",\n'
            output += f'      points: {points},\n'
            output += f'      imageFile: "kanguru/kaenguru{year}_questions_with_sections.docx",\n'
            output += f'      correctAnswer: {answer_index},\n'
            output += f'      correctAnswerLetter: "{answer}"\n'
            output += f'    }}'
            if i < len(solutions[year][:24]) - 1:
                output += ','
            output += '\n'
        output += '  ]'
        if year != sorted(solutions.keys())[-1]:
            output += ','
        output += '\n'

output += "};\n\n"
output += "// Array of all available test years\n"
output += "const availableYears = " + str(sorted([y for y in solutions.keys() if len(solutions[y]) >= 24])).replace("'", '"') + ";\n"

print(f"Parsed {len(solutions)} years")
for year in sorted(solutions.keys()):
    print(f"  {year}: {len(solutions[year])} questions")

# Write output
with open('tests-data.js', 'w', encoding='utf-8') as f:
    f.write(output)

print("\nGenerated tests-data.js successfully!")
