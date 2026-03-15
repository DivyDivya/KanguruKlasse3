#!/bin/bash

# Q24: Pattern (already has one at line ~573, check if square numbers or arithmetic)
# Q25: Perimeter - can use rectangle_perimeter
sed -i '/^    id: 25,$/a\    templateId: '\''rectangle_perimeter'\'',' questions-data.js

# Q26: Division
sed -i '/^    id: 26,$/a\    templateId: '\''division_simple'\'',' questions-data.js

# Q27: Multiplication  
sed -i '/^    id: 27,$/a\    templateId: '\''multiplication_medium'\'',' questions-data.js

# Q28: Word problem subtraction
sed -i '/^    id: 28,$/a\    templateId: '\''word_problem_subtraction'\'',' questions-data.js

# Q29: Addition
sed -i '/^    id: 29,$/a\    templateId: '\''addition_basic'\'',' questions-data.js

# Q30: Word problem two-step
sed -i '/^    id: 30,$/a\    templateId: '\''word_problem_two_step'\'',' questions-data.js

echo "More templates added!"
