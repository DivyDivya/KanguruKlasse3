#!/bin/bash
# Add templateId to numeric questions

# Q12: Addition word problem  
sed -i '/id: 12,/a\    templateId: '\''word_problem_addition'\'',' questions-data.js

# Q13: Subtraction
sed -i '/^    id: 13,$/a\    templateId: '\''subtraction_basic'\'',' questions-data.js

# Q15: Multiplication
sed -i '/^    id: 15,$/a\    templateId: '\''multiplication_basic'\'',' questions-data.js

# Q16: Addition
sed -i '/^    id: 16,$/a\    templateId: '\''addition_basic'\'',' questions-data.js

# Q17: Skip counting pattern
sed -i '/^    id: 17,$/a\    templateId: '\''pattern_skip_counting'\'',' questions-data.js

# Q18: Subtraction
sed -i '/^    id: 18,$/a\    templateId: '\''subtraction_basic'\'',' questions-data.js

# Q19: Multiplication
sed -i '/^    id: 19,$/a\    templateId: '\''multiplication_basic'\'',' questions-data.js

# Q20: Word problem addition
sed -i '/^    id: 20,$/a\    templateId: '\''word_problem_addition'\'',' questions-data.js

echo "Templates added successfully!"
