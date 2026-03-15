// Kanguru Math Practice App - Simplified Image-Based Version
// Uses real Kanguru test questions from 2010-2025 as images

// ============================================
// CONSTANTS
// ============================================
const STARTING_BONUS = 24;
const MAX_SCORE = 120;

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  de: {
    home_title: "🦘 Känguru Mathe-Übung",
    home_subtitle: "Klasse 3/4 - Übung für den Mathe-Wettbewerb!",
    start_new_quiz: "Neuen Übungstest starten",
    quiz_details: "24 Fragen • 3-5 Punkte je Frage",
    practice_difficulty: "Nach Schwierigkeit üben",
    practice_difficulty_detail: "Übe nur leichte, mittlere oder schwere Fragen",
    review_wrong: "Falsche Antworten üben",
    review_detail: "Übe Fragen, die du falsch hattest",
    view_history: "Vergangene Tests ansehen",
    history_detail: "Sieh deinen Fortschritt und Ergebnisse",
    questions_to_practice: "Fragen zum Üben",

    back: "← Zurück",
    question_of: "Frage",
    of: "von",
    score: "Punktzahl",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    pts: "Pkt",
    submit_answer: "Antwort einreichen",
    next_question: "Nächste Frage →",
    quit_confirm: "Bist du sicher, dass du aufhören möchtest? Dein Fortschritt geht verloren.",

    select_year: "Wähle Test-Jahr",
    year_description: "Wähle ein Jahr des Känguru-Wettbewerbs:",

    select_difficulty_practice: "Wähle Schwierigkeitsgrad",
    difficulty_practice_description: "Übe Fragen eines bestimmten Schwierigkeitsgrads aus allen Jahren:",
    difficulty_easy: "Leicht",
    difficulty_easy_practice: "3 Punkte • A1-A8",
    difficulty_medium: "Mittel",
    difficulty_medium_practice: "4 Punkte • B1-B8",
    difficulty_hard: "Schwer",
    difficulty_hard_practice: "5 Punkte • C1-C8",

    correct: "Richtig!",
    not_quite: "Nicht ganz richtig",
    points_earned: "Punkte verdient! 🎉",
    correct_answer_was: "Die richtige Antwort war:",

    test_complete: "🎉 Test abgeschlossen!",
    your_score: "Deine Punktzahl",
    correct: "Richtig",
    wrong: "Falsch",
    time: "Zeit",
    questions_to_review: "Fragen zum Wiederholen",
    save_and_home: "Speichern & zum Startbildschirm",
    try_again: "Einen weiteren Test versuchen",

    excellent: "🌟 Hervorragend! Du bist ein Mathe-Star!",
    great: "🎯 Großartig! Du machst das richtig gut!",
    good: "👍 Gute Arbeit! Weiter üben!",
    keep_trying: "💪 Gut gemacht! Übung macht den Meister!",

    back_to_home: "← Zurück zum Startbildschirm",
    your_test_history: "📊 Deine Test-Historie",
    no_tests_yet: "Noch keine Tests! Starte deinen ersten Übungstest, um hier deinen Fortschritt zu sehen.",
    test_details: "Test-Details",
    all_questions: "Alle Fragen:",
    your_answer: "Deine Antwort:",

    starting_points: "Startpunkte",
    earned: "Verdient",
    penalty: "Abzug",

    no_wrong_answers: "Keine falschen Antworten zum Üben! Mache zuerst einen Übungstest."
  },
  en: {
    home_title: "🦘 Kangaroo Math Practice",
    home_subtitle: "Class 3/4 - Practice for the Math Contest!",
    start_new_quiz: "Start New Practice Test",
    quiz_details: "24 questions • 3-5 points each",
    practice_difficulty: "Practice by Difficulty",
    practice_difficulty_detail: "Practice only easy, medium, or hard questions",
    review_wrong: "Review Wrong Answers",
    review_detail: "Practice questions you got wrong",
    view_history: "View Past Tests",
    history_detail: "See your progress and scores",
    questions_to_practice: "questions to practice",

    back: "← Back",
    question_of: "Question",
    of: "of",
    score: "Score",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    pts: "pts",
    submit_answer: "Submit Answer",
    next_question: "Next Question →",
    quit_confirm: "Are you sure you want to quit? Your progress will be lost.",

    select_year: "Choose Test Year",
    year_description: "Choose a Kangaroo competition year:",

    select_difficulty_practice: "Choose Difficulty Level",
    difficulty_practice_description: "Practice questions of a specific difficulty from all years:",
    difficulty_easy: "Easy",
    difficulty_easy_practice: "3 points • A1-A8",
    difficulty_medium: "Medium",
    difficulty_medium_practice: "4 points • B1-B8",
    difficulty_hard: "Hard",
    difficulty_hard_practice: "5 points • C1-C8",

    correct: "Correct!",
    not_quite: "Not quite right",
    points_earned: "points earned! 🎉",
    correct_answer_was: "The correct answer was:",

    test_complete: "🎉 Test Complete!",
    your_score: "Your Score",
    correct: "Correct",
    wrong: "Wrong",
    time: "Time",
    questions_to_review: "Questions to Review",
    save_and_home: "Save & Go Home",
    try_again: "Try Another Test",

    excellent: "🌟 Outstanding! You're a math superstar!",
    great: "🎯 Great job! You're doing really well!",
    good: "👍 Good effort! Keep practicing!",
    keep_trying: "💪 Nice try! Practice makes perfect!",

    back_to_home: "← Back to Home",
    your_test_history: "📊 Your Test History",
    no_tests_yet: "No tests yet! Start your first practice test to see your progress here.",
    test_details: "Test Details",
    all_questions: "All Questions:",
    your_answer: "Your answer:",

    starting_points: "Starting",
    earned: "Earned",
    penalty: "Penalty",

    no_wrong_answers: "No wrong answers to review yet! Take a practice test first."
  }
};

// ============================================
// LANGUAGE MANAGER CLASS
// ============================================
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('kanguru-lang') || 'de';
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('kanguru-lang', lang);
    this.updateUI();
  }

  t(key) {
    return translations[this.currentLang][key] || key;
  }

  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = this.currentLang === 'de' ? 'EN' : 'DE';
    }
    const quizLangToggle = document.getElementById('quiz-lang-toggle');
    if (quizLangToggle) {
      quizLangToggle.textContent = this.currentLang === 'de' ? 'EN' : 'DE';
    }

    if (document.getElementById('home-view').classList.contains('active')) {
      ViewManager.updateWrongAnswersCount();
    }
  }
}

// ============================================
// QUIZ MANAGER CLASS
// ============================================
class QuizManager {
  constructor() {
    this.currentQuiz = [];
    this.currentQuestionIndex = 0;
    this.score = STARTING_BONUS;
    this.startTime = null;
    this.timerInterval = null;
    this.userAnswers = [];
    this.currentYear = null;
    this.practiceMode = null; // 'year' or 'difficulty'
    this.practiceDifficulty = null; // 'easy', 'medium', 'hard'
  }

  // Generate quiz from specific year
  generateQuiz(year) {
    this.reset();
    this.currentYear = year;
    this.practiceMode = 'year';

    if (!tests[year]) {
      alert('Test year not found!');
      return false;
    }

    this.currentQuiz = tests[year];
    this.startTime = Date.now();
    this.startTimer();
    return true;
  }

  // Generate quiz from specific difficulty level (all years)
  generateDifficultyQuiz(difficulty) {
    this.reset();
    this.practiceMode = 'difficulty';
    this.practiceDifficulty = difficulty;

    // Collect all questions of this difficulty from all years
    const allQuestions = [];
    availableYears.forEach(year => {
      if (tests[year]) {
        const filtered = tests[year].filter(q => q.difficulty === difficulty);
        allQuestions.push(...filtered);
      }
    });

    if (allQuestions.length === 0) {
      alert('No questions found for this difficulty!');
      return false;
    }

    // Shuffle and take up to 24 questions
    this.shuffleArray(allQuestions);
    this.currentQuiz = allQuestions.slice(0, Math.min(24, allQuestions.length));

    this.startTime = Date.now();
    this.startTimer();
    return true;
  }

  // Shuffle array in place
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getCurrentQuestion() {
    return this.currentQuiz[this.currentQuestionIndex];
  }

  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = answerIndex === question.correctAnswer;

    let pointsEarned = 0;
    let pointsDeducted = 0;

    if (isCorrect) {
      pointsEarned = question.points;
      this.score += question.points;
    } else {
      pointsDeducted = question.points * 0.25;
      this.score = Math.max(0, this.score - pointsDeducted);
    }

    const result = {
      questionId: question.id,
      questionImage: `images/${question.year}/image${questionImageMap[question.questionId] || 2}.png`,
      userAnswer: answerIndex,
      correctAnswer: question.correctAnswer,
      correct: isCorrect,
      pointsEarned: pointsEarned,
      pointsDeducted: pointsDeducted,
      year: question.year,
      questionNumber: question.questionId
    };

    this.userAnswers.push(result);
    return result;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.currentQuiz.length;
  }

  getResults() {
    const timeInSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const correctCount = this.userAnswers.filter(a => a.correct).length;
    const wrongCount = this.userAnswers.length - correctCount;

    const totalPenalty = this.userAnswers
      .filter(a => !a.correct)
      .reduce((sum, a) => sum + a.pointsDeducted, 0);

    const pointsEarned = this.userAnswers
      .filter(a => a.correct)
      .reduce((sum, a) => sum + a.pointsEarned, 0);

    const percentage = Math.round((this.score / MAX_SCORE) * 100);

    return {
      score: this.score,
      maxScore: MAX_SCORE,
      percentage: percentage,
      correctCount: correctCount,
      wrongCount: wrongCount,
      timeInSeconds: timeInSeconds,
      userAnswers: this.userAnswers,
      startingBonus: STARTING_BONUS,
      pointsEarned: pointsEarned,
      totalPenalty: totalPenalty,
      year: this.currentYear,
      practiceMode: this.practiceMode,
      practiceDifficulty: this.practiceDifficulty
    };
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById('timer-display').textContent = display;
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset() {
    this.currentQuiz = [];
    this.currentQuestionIndex = 0;
    this.score = STARTING_BONUS;
    this.startTime = null;
    this.userAnswers = [];
    this.currentYear = null;
    this.practiceMode = null;
    this.practiceDifficulty = null;
    this.stopTimer();
  }
}

// ============================================
// HISTORY MANAGER CLASS
// ============================================
class HistoryManager {
  constructor() {
    this.storageKey = 'kanguru-test-history';
    this.wrongAnswersKey = 'kanguru-wrong-answers';
  }

  saveTest(results) {
    const history = this.getHistory();

    const testRecord = {
      id: `test_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      score: results.score,
      maxScore: results.maxScore,
      percentage: results.percentage,
      correctCount: results.correctCount,
      wrongCount: results.wrongCount,
      timeInSeconds: results.timeInSeconds,
      userAnswers: results.userAnswers,
      year: results.year,
      practiceMode: results.practiceMode,
      practiceDifficulty: results.practiceDifficulty
    };

    history.unshift(testRecord);
    localStorage.setItem(this.storageKey, JSON.stringify(history));

    this.updateWrongAnswers(results.userAnswers);

    return testRecord;
  }

  getHistory() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getTest(id) {
    const history = this.getHistory();
    return history.find(test => test.id === id);
  }

  updateWrongAnswers(userAnswers) {
    let wrongPool = this.getWrongAnswersPool();

    userAnswers.forEach(answer => {
      if (!answer.correct) {
        if (!wrongPool.includes(answer.questionId)) {
          wrongPool.push(answer.questionId);
        }
      } else {
        wrongPool = wrongPool.filter(id => id !== answer.questionId);
      }
    });

    localStorage.setItem(this.wrongAnswersKey, JSON.stringify(wrongPool));
  }

  getWrongAnswersPool() {
    const data = localStorage.getItem(this.wrongAnswersKey);
    return data ? JSON.parse(data) : [];
  }

  clearAll() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.wrongAnswersKey);
  }
}

// ============================================
// VIEW MANAGEMENT
// ============================================
const ViewManager = {
  showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
  },

  showHome() {
    this.showView('home-view');
    this.updateWrongAnswersCount();
  },

  showQuiz() {
    this.showView('quiz-view');
  },

  showResults() {
    this.showView('results-view');
  },

  showHistory() {
    this.showView('history-view');
    renderHistory();
  },

  updateWrongAnswersCount() {
    const count = historyManager.getWrongAnswersPool().length;
    const display = document.getElementById('wrong-count-display');
    if (count > 0) {
      display.textContent = `${count} ${languageManager.t('questions_to_practice')}`;
    } else {
      display.textContent = languageManager.t('review_detail');
    }
  }
};

// ============================================
// QUIZ RENDERING
// ============================================
function renderQuestion() {
  const question = quizManager.getCurrentQuestion();

  document.getElementById('current-q-num').textContent = quizManager.currentQuestionIndex + 1;
  document.getElementById('total-q-num').textContent = quizManager.currentQuiz.length;
  document.getElementById('current-score').textContent = Math.round(quizManager.score * 100) / 100;

  const badge = document.getElementById('difficulty-badge');
  const difficultyText = languageManager.t(question.difficulty);
  const ptsText = languageManager.t('pts');
  badge.textContent = `${difficultyText.charAt(0).toUpperCase() + difficultyText.slice(1)} • ${question.points} ${ptsText}`;
  badge.className = `difficulty-badge ${question.difficulty}`;

  // Display question image
  const questionText = document.getElementById('question-text');
  const imageNum = questionImageMap[question.questionId] || 2;
  const imagePath = `images/${question.year}/image${imageNum}.png`;
  questionText.innerHTML = `<img src="${imagePath}" alt="Question ${question.questionId}" style="max-width: 100%; height: auto;" onerror="this.parentElement.innerHTML='<p>Frage ${question.questionId} (Jahr ${question.year})</p>'">`;

  // Render options (A-E radio buttons)
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  ['A', 'B', 'C', 'D', 'E'].forEach((letter, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.innerHTML = `
      <input type="radio" name="answer" id="option-${index}" value="${index}">
      <label for="option-${index}">
        <span class="option-letter">${letter}</span>
      </label>
    `;
    optionsContainer.appendChild(optionDiv);
  });

  // Add click handlers
  document.querySelectorAll('.option').forEach((option, index) => {
    option.addEventListener('click', () => {
      document.getElementById(`option-${index}`).checked = true;
      document.getElementById('submit-answer-btn').disabled = false;

      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // Reset submit button
  const submitBtn = document.getElementById('submit-answer-btn');
  submitBtn.disabled = true;
  submitBtn.style.display = '';

  // Hide feedback card
  document.getElementById('feedback-card').classList.add('hidden');
}

function showFeedback(result) {
  const feedbackCard = document.getElementById('feedback-card');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const feedbackPoints = document.getElementById('feedback-points');

  const correctLetter = String.fromCharCode(65 + result.correctAnswer); // Convert 0-4 to A-E

  if (result.correct) {
    feedbackCard.className = 'feedback-card correct';
    feedbackIcon.textContent = '✓';
    feedbackTitle.textContent = languageManager.t('correct');
    feedbackPoints.textContent = `+${result.pointsEarned} ${languageManager.t('points_earned')}`;
  } else {
    feedbackCard.className = 'feedback-card wrong';
    feedbackIcon.textContent = '✗';
    feedbackTitle.textContent = languageManager.t('not_quite');
    const penaltyText = result.pointsDeducted > 0 ? ` (-${result.pointsDeducted.toFixed(2)} ${languageManager.t('pts')})` : '';
    feedbackPoints.textContent = `${languageManager.t('correct_answer_was')} ${correctLetter}${penaltyText}`;
  }

  feedbackExplanation.textContent = ''; // No explanation available for image-based questions
  feedbackCard.classList.remove('hidden');

  document.querySelectorAll('.option input').forEach(input => input.disabled = true);
  document.getElementById('submit-answer-btn').style.display = 'none';

  // Highlight correct/wrong answers
  document.querySelectorAll('.option').forEach((option, index) => {
    if (index === result.correctAnswer) {
      option.classList.add('correct-answer');
    } else if (index === result.userAnswer && !result.correct) {
      option.classList.add('wrong-answer');
    }
  });
}

function renderResults() {
  const results = quizManager.getResults();

  document.getElementById('final-score').textContent = Math.round(results.score * 100) / 100;
  document.getElementById('score-percentage').textContent = `${results.percentage}%`;
  document.getElementById('correct-count').textContent = results.correctCount;
  document.getElementById('wrong-count').textContent = results.wrongCount;

  const scoreBreakdown = document.getElementById('score-breakdown');
  if (scoreBreakdown) {
    const startText = languageManager.t('starting_points');
    const earnedText = languageManager.t('earned');
    const penaltyText = languageManager.t('penalty');

    scoreBreakdown.innerHTML = `
      <div class="breakdown-item">
        <span>${startText}:</span>
        <span>+${results.startingBonus}</span>
      </div>
      <div class="breakdown-item">
        <span>${earnedText}:</span>
        <span>+${results.pointsEarned}</span>
      </div>
      ${results.totalPenalty > 0 ? `
      <div class="breakdown-item penalty">
        <span>${penaltyText}:</span>
        <span>-${results.totalPenalty.toFixed(2)}</span>
      </div>
      ` : ''}
    `;
  }

  const minutes = Math.floor(results.timeInSeconds / 60);
  const seconds = results.timeInSeconds % 60;
  document.getElementById('time-taken').textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;

  const encouragement = document.getElementById('encouragement-message');
  if (results.percentage >= 90) {
    encouragement.textContent = languageManager.t('excellent');
    encouragement.className = 'encouragement-message excellent';
  } else if (results.percentage >= 75) {
    encouragement.textContent = languageManager.t('great');
    encouragement.className = 'encouragement-message great';
  } else if (results.percentage >= 60) {
    encouragement.textContent = languageManager.t('good');
    encouragement.className = 'encouragement-message good';
  } else {
    encouragement.textContent = languageManager.t('keep_trying');
    encouragement.className = 'encouragement-message keep-trying';
  }

  const wrongAnswersList = document.getElementById('wrong-answers-list');
  wrongAnswersList.innerHTML = '';

  const wrongAnswers = results.userAnswers.filter(a => !a.correct);

  if (wrongAnswers.length === 0) {
    document.getElementById('wrong-answers-section').style.display = 'none';
  } else {
    document.getElementById('wrong-answers-section').style.display = 'block';

    wrongAnswers.forEach(answer => {
      const div = document.createElement('div');
      div.className = 'wrong-answer-item';
      const yourAnswerText = languageManager.t('your_answer');
      const correctAnswerText = languageManager.t('correct_answer_was').replace(':', '');
      const userAnswerLetter = String.fromCharCode(65 + answer.userAnswer);
      const correctAnswerLetter = String.fromCharCode(65 + answer.correctAnswer);

      div.innerHTML = `
        <div class="wrong-q-text">Frage ${answer.questionNumber} (Jahr ${answer.year})</div>
        <div class="wrong-q-your">${yourAnswerText} ${userAnswerLetter}</div>
        <div class="wrong-q-correct">${correctAnswerText}: ${correctAnswerLetter}</div>
      `;
      wrongAnswersList.appendChild(div);
    });
  }
}

function renderHistory() {
  const history = historyManager.getHistory();
  const historyList = document.getElementById('history-list');
  const historyEmpty = document.getElementById('history-empty');

  if (history.length === 0) {
    historyList.innerHTML = '';
    historyEmpty.classList.remove('hidden');
  } else {
    historyEmpty.classList.add('hidden');

    historyList.innerHTML = '<div class="history-header">Your Practice Tests</div>';

    history.forEach(test => {
      const div = document.createElement('div');
      div.className = 'history-item';

      const date = new Date(test.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const minutes = Math.floor(test.timeInSeconds / 60);
      const seconds = test.timeInSeconds % 60;
      const timeStr = `${minutes}:${String(seconds).padStart(2, '0')}`;

      const yearLabel = test.year ? `Jahr ${test.year}` : (test.practiceDifficulty ? `Schwierigkeit: ${test.practiceDifficulty}` : '?');

      div.innerHTML = `
        <div class="history-date">${date} - ${yearLabel}</div>
        <div class="history-stats">
          <div class="history-score">
            <span class="history-score-value">${test.score}/${test.maxScore}</span>
            <span class="history-score-pct">(${test.percentage}%)</span>
          </div>
          <div class="history-details">
            <span>✓ ${test.correctCount}</span>
            <span>✗ ${test.wrongCount}</span>
            <span>⏱️ ${timeStr}</span>
          </div>
        </div>
      `;

      historyList.appendChild(div);
    });
  }
}

// ============================================
// INITIALIZATION & EVENT LISTENERS
// ============================================
const quizManager = new QuizManager();
const historyManager = new HistoryManager();
const languageManager = new LanguageManager();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language toggle
  const header = document.querySelector('#home-view header');
  const langToggle = document.createElement('button');
  langToggle.id = 'lang-toggle';
  langToggle.className = 'lang-toggle';
  langToggle.textContent = languageManager.currentLang === 'de' ? 'EN' : 'DE';
  langToggle.addEventListener('click', () => {
    const newLang = languageManager.currentLang === 'de' ? 'en' : 'de';
    languageManager.setLanguage(newLang);
  });
  header.insertBefore(langToggle, header.firstChild);

  // Home view buttons
  document.getElementById('start-new-quiz-btn').addEventListener('click', () => {
    document.getElementById('year-modal').classList.remove('hidden');
  });

  // Practice by difficulty button
  document.getElementById('practice-difficulty-btn').addEventListener('click', () => {
    document.getElementById('difficulty-practice-modal').classList.remove('hidden');
  });

  // Difficulty practice handlers
  document.getElementById('practice-easy-btn').addEventListener('click', () => {
    document.getElementById('difficulty-practice-modal').classList.add('hidden');
    if (quizManager.generateDifficultyQuiz('easy')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
  });

  document.getElementById('practice-medium-btn').addEventListener('click', () => {
    document.getElementById('difficulty-practice-modal').classList.add('hidden');
    if (quizManager.generateDifficultyQuiz('medium')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
  });

  document.getElementById('practice-hard-btn').addEventListener('click', () => {
    document.getElementById('difficulty-practice-modal').classList.add('hidden');
    if (quizManager.generateDifficultyQuiz('hard')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
  });

  // Year selection handlers
  availableYears.forEach(year => {
    const btn = document.createElement('button');
    btn.className = 'year-option-btn';
    btn.innerHTML = `
      <span class="year-icon">📅</span>
      <span class="year-name">${year}</span>
      <span class="year-detail">Känguru ${year}</span>
    `;
    btn.addEventListener('click', () => {
      document.getElementById('year-modal').classList.add('hidden');
      if (quizManager.generateQuiz(year)) {
        ViewManager.showQuiz();
        renderQuestion();
      }
    });
    document.getElementById('year-options-container').appendChild(btn);
  });

  document.getElementById('review-wrong-btn').addEventListener('click', () => {
    alert(languageManager.t('no_wrong_answers'));
  });

  document.getElementById('view-history-btn').addEventListener('click', () => {
    ViewManager.showHistory();
  });

  // Quiz view buttons
  document.getElementById('quit-quiz-btn').addEventListener('click', () => {
    if (confirm(languageManager.t('quit_confirm'))) {
      quizManager.reset();
      ViewManager.showHome();
    }
  });

  document.getElementById('quiz-lang-toggle').addEventListener('click', () => {
    const newLang = languageManager.currentLang === 'de' ? 'en' : 'de';
    languageManager.setLanguage(newLang);
    document.getElementById('quiz-lang-toggle').textContent = languageManager.currentLang === 'de' ? 'EN' : 'DE';
  });

  document.getElementById('submit-answer-btn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      const answerIndex = parseInt(selectedOption.value);
      const result = quizManager.submitAnswer(answerIndex);
      showFeedback(result);
    }
  });

  document.getElementById('next-question-btn').addEventListener('click', () => {
    const hasMore = quizManager.nextQuestion();
    if (hasMore) {
      renderQuestion();
    } else {
      quizManager.stopTimer();
      renderResults();
      ViewManager.showResults();
    }
  });

  // Results view buttons
  document.getElementById('save-and-home-btn').addEventListener('click', () => {
    const results = quizManager.getResults();
    historyManager.saveTest(results);
    quizManager.reset();
    ViewManager.showHome();
  });

  document.getElementById('try-again-btn').addEventListener('click', () => {
    const results = quizManager.getResults();
    historyManager.saveTest(results);
    ViewManager.showHome();
    document.getElementById('year-modal').classList.remove('hidden');
  });

  // History view buttons
  document.getElementById('back-to-home-btn').addEventListener('click', () => {
    ViewManager.showHome();
  });

  // Modal close buttons
  document.getElementById('close-year-modal').addEventListener('click', () => {
    document.getElementById('year-modal').classList.add('hidden');
  });

  document.getElementById('close-difficulty-modal').addEventListener('click', () => {
    document.getElementById('difficulty-practice-modal').classList.add('hidden');
  });

  // Close modals when clicking outside
  document.getElementById('year-modal').addEventListener('click', (e) => {
    if (e.target.id === 'year-modal') {
      document.getElementById('year-modal').classList.add('hidden');
    }
  });

  document.getElementById('difficulty-practice-modal').addEventListener('click', (e) => {
    if (e.target.id === 'difficulty-practice-modal') {
      document.getElementById('difficulty-practice-modal').classList.add('hidden');
    }
  });

  // Initialize home view
  ViewManager.showHome();
  languageManager.updateUI();
});
