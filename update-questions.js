// Script to merge extracted questions into questions-data.js
const fs = require('fs');

// Load extracted questions
const extracted = JSON.parse(fs.readFileSync('extracted_all_questions.json', 'utf8'));

// Load existing questions data
const questionsDataPath = 'questions-data.js';
let questionsFileContent = fs.readFileSync(questionsDataPath, 'utf8');

// Function to update a question in the data
function updateQuestion(year, questionId, extractedQ) {
    const searchPattern = new RegExp(
        `(\\s+{\\s+id: '${questionId}',\\s+section: '[ABC]',\\s+number: \\d+,\\s+year: ${year},\\s+points: [345],\\s+)` +
        `questionTextDE: '[^']*',\\s+questionTextEN: '[^']*',([^}]*?options: \\[[^\\]]*\\])`,
        'gs'
    );

    // Build replacement
    let optionsStr = '';
    if (extractedQ.hasTextOptions && extractedQ.options) {
        const opts = extractedQ.options.map(opt =>
            `{ id: '${opt.id}', textDE: '${opt.textDE.replace(/'/g, "\\'")}', textEN: '${opt.textEN.replace(/'/g, "\\'")}' }`
        ).join(',\n                    ');
        optionsStr = `\n                options: [\n                    ${opts}\n                ],`;
    }

    const replacement = `$1questionTextDE: '${extractedQ.questionTextDE.replace(/'/g, "\\'")}',\n                questionTextEN: '${extractedQ.questionTextEN.replace(/'/g, "\\'")}',${optionsStr}`;

    questionsFileContent = questionsFileContent.replace(searchPattern, replacement);
}

// Update questions for each year
for (const [year, questions] of Object.entries(extracted)) {
    if (year === 'metadata') continue;

    console.log(`Updating year ${year}...`);
    for (const [questionId, questionData] of Object.entries(questions)) {
        if (questionData.questionTextDE) {
            updateQuestion(year, questionId, questionData);
        }
    }
}

// Save updated file
fs.writeFileSync(questionsDataPath, questionsFileContent, 'utf8');
console.log('Questions data updated successfully!');
