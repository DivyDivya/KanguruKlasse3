// Question Templates System for Regenerating Quiz Questions
// Each template can generate multiple variations of the same question type

// Utility Functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultipleChoice(correctAnswer, count = 5) {
  const options = [correctAnswer];
  const used = new Set([correctAnswer]);

  // Generate wrong options (different by ±1 to ±5)
  while (options.length < count) {
    const offset = randomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
    const option = correctAnswer + offset;
    if (option > 0 && !used.has(option)) {
      options.push(option);
      used.add(option);
    }
  }

  // Sort and return as strings
  options.sort((a, b) => a - b);
  return {
    de: options.map(String),
    en: options.map(String)
  };
}

// Difficulty multipliers affect number ranges
// easy: smaller numbers, normal: more challenging, hard: larger numbers (all under 1000 for grade 3)
const difficultyRanges = {
  easy: { multiplier: 0.7, maxValue: 50 },
  normal: { multiplier: 1.2, maxValue: 150 },  // Increased from 1.0 and 100
  hard: { multiplier: 1.8, maxValue: 300 }      // Increased from 1.5 and 200
};

function adjustRange(min, max, difficultyLevel = 'normal') {
  const config = difficultyRanges[difficultyLevel] || difficultyRanges.normal;
  const newMin = Math.max(1, Math.floor(min * config.multiplier));
  const newMax = Math.min(config.maxValue, Math.floor(max * config.multiplier));
  return { min: newMin, max: newMax };
}

// Question Templates
const questionTemplates = {
  // Addition - Basic (Easy)
  addition_basic: {
    difficulty: 'easy',
    points: 3,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(10, 20, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(Math.max(5, Math.floor(5 * difficultyRanges[difficultyLevel].multiplier)),
                          Math.min(15, Math.floor(15 * difficultyRanges[difficultyLevel].multiplier)));
      const answer = a + b;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} + ${b}?`,
          en: `What is ${a} + ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} + ${b} = ${answer}. Du kannst ${a} und ${b} zusammenzählen.`,
          en: `${a} + ${b} = ${answer}. You can add ${a} and ${b} together.`
        }
      };
    }
  },

  // Subtraction - Basic (Easy)
  subtraction_basic: {
    difficulty: 'easy',
    points: 3,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(15, 30, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(Math.max(3, Math.floor(5 * difficultyRanges[difficultyLevel].multiplier)),
                          Math.min(a - 1, Math.floor(12 * difficultyRanges[difficultyLevel].multiplier)));
      const answer = a - b;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} - ${b}?`,
          en: `What is ${a} - ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} - ${b} = ${answer}. Du ziehst ${b} von ${a} ab.`,
          en: `${a} - ${b} = ${answer}. You subtract ${b} from ${a}.`
        }
      };
    }
  },

  // Multiplication - Basic (Easy)
  multiplication_basic: {
    difficulty: 'easy',
    points: 3,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(2, 9, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(range.min, range.max);
      const answer = a * b;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} × ${b}?`,
          en: `What is ${a} × ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} × ${b} = ${answer}. Das ist das ${a}-fache von ${b}.`,
          en: `${a} × ${b} = ${answer}. That's ${a} times ${b}.`
        }
      };
    }
  },

  // Multiplication - Medium
  multiplication_medium: {
    difficulty: 'medium',
    points: 4,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(7, 12, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(range.min, range.max);
      const answer = a * b;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} × ${b}?`,
          en: `What is ${a} × ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} × ${b} = ${answer}. Eine größere Multiplikationsaufgabe.`,
          en: `${a} × ${b} = ${answer}. A larger multiplication problem.`
        }
      };
    }
  },

  // Division - Simple (Medium)
  division_simple: {
    difficulty: 'medium',
    points: 4,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(2, 9, difficultyLevel);
      const b = randomInt(range.min, range.max);
      const answerRange = adjustRange(3, 12, difficultyLevel);
      const answer = randomInt(answerRange.min, answerRange.max);
      const a = b * answer; // Ensure clean division
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} ÷ ${b}?`,
          en: `What is ${a} ÷ ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} ÷ ${b} = ${answer}. ${b} passt ${answer}-mal in ${a}.`,
          en: `${a} ÷ ${b} = ${answer}. ${b} goes into ${a} exactly ${answer} times.`
        }
      };
    }
  },

  // Pattern Recognition - Arithmetic Sequence (Easy)
  pattern_arithmetic_easy: {
    difficulty: 'easy',
    points: 3,
    topic: 'patterns',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(2, 10, difficultyLevel);
      const start = randomInt(range.min, range.max);
      const stepRange = adjustRange(2, 5, difficultyLevel);
      const step = randomInt(stepRange.min, stepRange.max);
      const seq = [start, start + step, start + 2*step, start + 3*step];
      const answer = start + 4*step;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Welche Zahl kommt als nächstes: ${seq.join(', ')}, ?`,
          en: `What number comes next: ${seq.join(', ')}, ?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Das Muster erhöht sich jeweils um ${step}. ${seq[3]} + ${step} = ${answer}.`,
          en: `The pattern increases by ${step} each time. ${seq[3]} + ${step} = ${answer}.`
        }
      };
    }
  },

  // Pattern Recognition - Skip Counting (Easy)
  pattern_skip_counting: {
    difficulty: 'easy',
    points: 3,
    topic: 'patterns',
    generate: (difficultyLevel = 'normal') => {
      const stepRange = adjustRange(2, 5, difficultyLevel);
      const step = randomInt(stepRange.min, stepRange.max) * 2; // Even steps
      const range = adjustRange(5, 15, difficultyLevel);
      const start = randomInt(range.min, range.max);
      const seq = [start, start + step, start + 2*step];
      const answer = start + 3*step;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Setze das Muster fort: ${seq.join(', ')}, ?`,
          en: `Continue the pattern: ${seq.join(', ')}, ?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Jede Zahl ist ${step} größer als die vorherige. ${seq[2]} + ${step} = ${answer}.`,
          en: `Each number is ${step} more than the previous. ${seq[2]} + ${step} = ${answer}.`
        }
      };
    }
  },

  // Word Problem - Addition (Medium)
  word_problem_addition: {
    difficulty: 'medium',
    points: 4,
    topic: 'word_problems',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(10, 25, difficultyLevel);
      const initial = randomInt(range.min, range.max);
      const addedRange = adjustRange(5, 15, difficultyLevel);
      const added = randomInt(addedRange.min, addedRange.max);
      const answer = initial + added;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Anna hat ${initial} Äpfel. Sie bekommt ${added} weitere Äpfel. Wie viele Äpfel hat sie jetzt?`,
          en: `Anna has ${initial} apples. She gets ${added} more apples. How many apples does she have now?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${initial} + ${added} = ${answer}. Anna hat insgesamt ${answer} Äpfel.`,
          en: `${initial} + ${added} = ${answer}. Anna has ${answer} apples in total.`
        }
      };
    }
  },

  // Word Problem - Subtraction (Medium)
  word_problem_subtraction: {
    difficulty: 'medium',
    points: 4,
    topic: 'word_problems',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(20, 35, difficultyLevel);
      const initial = randomInt(range.min, range.max);
      const removedRange = adjustRange(8, 15, difficultyLevel);
      const removed = randomInt(removedRange.min, Math.min(removedRange.max, initial - 5));
      const answer = initial - removed;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Tom hat ${initial} Bonbons. Er gibt ${removed} Bonbons an seine Freunde. Wie viele Bonbons hat er noch?`,
          en: `Tom has ${initial} candies. He gives ${removed} candies to his friends. How many candies does he have left?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${initial} - ${removed} = ${answer}. Tom hat noch ${answer} Bonbons übrig.`,
          en: `${initial} - ${removed} = ${answer}. Tom has ${answer} candies left.`
        }
      };
    }
  },

  // Comparing Numbers (Easy)
  comparing_numbers: {
    difficulty: 'easy',
    points: 3,
    topic: 'comparison',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(15, 40, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(range.min, range.max);
      const larger = Math.max(a, b);
      const options = {
        de: [String(a), String(b), String(a + b), String(Math.abs(a - b)), String(Math.min(a, b))],
        en: [String(a), String(b), String(a + b), String(Math.abs(a - b)), String(Math.min(a, b))]
      };
      return {
        question: {
          de: `Welche Zahl ist größer: ${a} oder ${b}?`,
          en: `Which number is larger: ${a} or ${b}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(larger)),
        explanation: {
          de: `${larger} ist größer als ${larger === a ? b : a}.`,
          en: `${larger} is larger than ${larger === a ? b : a}.`
        }
      };
    }
  },

  // Simple Fractions (Medium)
  fractions_simple: {
    difficulty: 'medium',
    points: 4,
    topic: 'fractions',
    generate: (difficultyLevel = 'normal') => {
      const denominator = randomInt(2, 4) * 2; // 2, 4, 6, or 8
      const numerator = randomInt(1, denominator - 1);
      const range = adjustRange(8, 20, difficultyLevel);
      const total = randomInt(range.min, range.max);
      const answer = Math.floor((numerator / denominator) * total);
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${numerator}/${denominator} von ${total}?`,
          en: `What is ${numerator}/${denominator} of ${total}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${numerator}/${denominator} von ${total} = ${answer}. Teile ${total} durch ${denominator} und nimm ${numerator} davon.`,
          en: `${numerator}/${denominator} of ${total} = ${answer}. Divide ${total} by ${denominator} and take ${numerator} of it.`
        }
      };
    }
  },

  // Two-Step Word Problem (Hard)
  word_problem_two_step: {
    difficulty: 'hard',
    points: 5,
    topic: 'word_problems',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(15, 30, difficultyLevel);
      const initial = randomInt(range.min, range.max);
      const boughtRange = adjustRange(8, 15, difficultyLevel);
      const bought = randomInt(boughtRange.min, boughtRange.max);
      const gaveRange = adjustRange(5, 10, difficultyLevel);
      const gave_away = randomInt(gaveRange.min, gaveRange.max);
      const answer = initial + bought - gave_away;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Lisa hat ${initial} Stifte. Sie kauft ${bought} neue Stifte und gibt ${gave_away} Stifte an ihre Schwester. Wie viele Stifte hat Lisa jetzt?`,
          en: `Lisa has ${initial} pens. She buys ${bought} new pens and gives ${gave_away} pens to her sister. How many pens does Lisa have now?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${initial} + ${bought} - ${gave_away} = ${answer}. Lisa hat am Ende ${answer} Stifte.`,
          en: `${initial} + ${bought} - ${gave_away} = ${answer}. Lisa has ${answer} pens in the end.`
        }
      };
    }
  },

  // Multiplication by 10 (Easy)
  multiplication_by_ten: {
    difficulty: 'easy',
    points: 3,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(3, 15, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const answer = a * 10;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} × 10?`,
          en: `What is ${a} × 10?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} × 10 = ${answer}. Hänge einfach eine Null an ${a} an.`,
          en: `${a} × 10 = ${answer}. Just add a zero to ${a}.`
        }
      };
    }
  },

  // Rounding Numbers (Medium)
  rounding_numbers: {
    difficulty: 'medium',
    points: 4,
    topic: 'rounding',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(2, 8, difficultyLevel);
      const tens = randomInt(range.min, range.max) * 10;
      const ones = randomInt(1, 9);
      const number = tens + ones;
      const answer = ones >= 5 ? tens + 10 : tens;
      const options = generateMultipleChoice(answer, 5);
      return {
        question: {
          de: `Runde ${number} auf die nächste Zehnerstelle.`,
          en: `Round ${number} to the nearest ten.`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${number} wird auf ${answer} gerundet. Die Einerstelle ist ${ones}, also runden wir ${ones >= 5 ? 'auf' : 'ab'}.`,
          en: `${number} rounds to ${answer}. The ones digit is ${ones}, so we round ${ones >= 5 ? 'up' : 'down'}.`
        }
      };
    }
  },

  // Three-number addition (Medium)
  addition_three_numbers: {
    difficulty: 'medium',
    points: 4,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(5, 15, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(range.min, range.max);
      const c = randomInt(range.min, range.max);
      const answer = a + b + c;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} + ${b} + ${c}?`,
          en: `What is ${a} + ${b} + ${c}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} + ${b} + ${c} = ${answer}. Du kannst zuerst ${a} + ${b} = ${a + b} rechnen, dann ${a + b} + ${c} = ${answer}.`,
          en: `${a} + ${b} + ${c} = ${answer}. You can first calculate ${a} + ${b} = ${a + b}, then ${a + b} + ${c} = ${answer}.`
        }
      };
    }
  },

  // Mixed operations (Medium)
  mixed_operations: {
    difficulty: 'medium',
    points: 4,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(10, 20, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      const answer = a + b - c;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist ${a} + ${b} - ${c}?`,
          en: `What is ${a} + ${b} - ${c}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `${a} + ${b} - ${c} = ${answer}. Rechne von links nach rechts: ${a} + ${b} = ${a + b}, dann ${a + b} - ${c} = ${answer}.`,
          en: `${a} + ${b} - ${c} = ${answer}. Calculate left to right: ${a} + ${b} = ${a + b}, then ${a + b} - ${c} = ${answer}.`
        }
      };
    }
  },

  // Double/Halve (Easy)
  double_number: {
    difficulty: 'easy',
    points: 3,
    topic: 'arithmetic',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(5, 25, difficultyLevel);
      const a = randomInt(range.min, range.max);
      const answer = a * 2;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist das Doppelte von ${a}?`,
          en: `What is double ${a}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Das Doppelte von ${a} ist ${a} × 2 = ${answer}.`,
          en: `Double ${a} is ${a} × 2 = ${answer}.`
        }
      };
    }
  },

  // Finding missing number in sequence (Medium)
  missing_in_sequence: {
    difficulty: 'medium',
    points: 4,
    topic: 'patterns',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(3, 8, difficultyLevel);
      const start = randomInt(range.min, range.max);
      const step = randomInt(2, 4);
      const position = randomInt(2, 4); // Which position is missing
      const seq = [start, start + step, start + 2*step, start + 3*step, start + 4*step];
      const answer = seq[position];
      seq[position] = '?';
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Welche Zahl fehlt? ${seq.join(', ')}`,
          en: `What number is missing? ${seq.join(', ')}`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Das Muster erhöht sich jeweils um ${step}. Die fehlende Zahl ist ${answer}.`,
          en: `The pattern increases by ${step} each time. The missing number is ${answer}.`
        }
      };
    }
  },

  // Simple equations (Medium)
  simple_equation: {
    difficulty: 'medium',
    points: 4,
    topic: 'algebra',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(5, 15, difficultyLevel);
      const answer = randomInt(range.min, range.max);
      const b = randomInt(3, 10);
      const result = answer + b;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Was ist x, wenn x + ${b} = ${result}?`,
          en: `What is x when x + ${b} = ${result}?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `x + ${b} = ${result}, also ist x = ${result} - ${b} = ${answer}.`,
          en: `x + ${b} = ${result}, so x = ${result} - ${b} = ${answer}.`
        }
      };
    }
  },

  // Area/Perimeter (Hard)
  rectangle_perimeter: {
    difficulty: 'hard',
    points: 5,
    topic: 'geometry',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(4, 12, difficultyLevel);
      const length = randomInt(range.min, range.max);
      const width = randomInt(range.min, Math.floor(length * 0.8));
      const answer = 2 * (length + width);
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Was ist der Umfang?`,
          en: `A rectangle is ${length} cm long and ${width} cm wide. What is the perimeter?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Umfang = 2 × (Länge + Breite) = 2 × (${length} + ${width}) = 2 × ${length + width} = ${answer} cm.`,
          en: `Perimeter = 2 × (length + width) = 2 × (${length} + ${width}) = 2 × ${length + width} = ${answer} cm.`
        }
      };
    }
  },

  // Money problems (Medium)
  money_change: {
    difficulty: 'medium',
    points: 4,
    topic: 'word_problems',
    generate: (difficultyLevel = 'normal') => {
      const range = adjustRange(20, 50, difficultyLevel);
      const paid = randomInt(range.min, range.max);
      const cost = randomInt(Math.floor(paid * 0.6), paid - 5);
      const answer = paid - cost;
      const options = generateMultipleChoice(answer);
      return {
        question: {
          de: `Du kaufst etwas für ${cost}€ und bezahlst mit ${paid}€. Wie viel Wechselgeld bekommst du?`,
          en: `You buy something for ${cost}€ and pay with ${paid}€. How much change do you get?`
        },
        options: options,
        correctAnswer: options.de.indexOf(String(answer)),
        explanation: {
          de: `Wechselgeld = ${paid}€ - ${cost}€ = ${answer}€.`,
          en: `Change = ${paid}€ - ${cost}€ = ${answer}€.`
        }
      };
    }
  }
};
