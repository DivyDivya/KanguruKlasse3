// Kanguru Math Practice App - Core Logic

// ============================================
// CONSTANTS
// ============================================
const STARTING_BONUS = 24; // Official Känguru starting points
const MAX_SCORE = 120; // 24 starting + 96 possible from 24 questions

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  de: {
    // Home view
    home_title: "🦘 Känguru Mathe-Übung",
    home_subtitle: "Klasse 3/4 - Übung für den Mathe-Wettbewerb!",
    start_new_quiz: "Neuen Übungstest starten",
    quiz_details: "24 Fragen • 3-5 Punkte je Frage",
    review_wrong: "Falsche Antworten üben",
    review_detail: "Übe Fragen, die du falsch hattest",
    view_history: "Vergangene Tests ansehen",
    history_detail: "Sieh deinen Fortschritt und Ergebnisse",
    questions_to_practice: "Fragen zum Üben",

    // Quiz view
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

    // Feedback
    correct: "Richtig!",
    not_quite: "Nicht ganz richtig",
    points_earned: "Punkte verdient! 🎉",
    correct_answer_was: "Die richtige Antwort war:",

    // Results view
    test_complete: "🎉 Test abgeschlossen!",
    your_score: "Deine Punktzahl",
    correct: "Richtig",
    wrong: "Falsch",
    time: "Zeit",
    questions_to_review: "Fragen zum Wiederholen",
    save_and_home: "Speichern & zum Startbildschirm",
    try_again: "Einen weiteren Test versuchen",

    // Encouragement messages
    excellent: "🌟 Hervorragend! Du bist ein Mathe-Star!",
    great: "🎯 Großartig! Du machst das richtig gut!",
    good: "👍 Gute Arbeit! Weiter üben!",
    keep_trying: "💪 Gut gemacht! Übung macht den Meister!",

    // History view
    back_to_home: "← Zurück zum Startbildschirm",
    your_test_history: "📊 Deine Test-Historie",
    no_tests_yet: "Noch keine Tests! Starte deinen ersten Übungstest, um hier deinen Fortschritt zu sehen.",
    your_practice_tests: "Deine Übungstests",
    test_details: "Test-Details",
    all_questions: "Alle Fragen:",
    your_answer: "Deine Antwort:",

    // Score breakdown
    starting_points: "Startpunkte",
    earned: "Verdient",
    penalty: "Abzug",

    // Alerts
    no_wrong_answers: "Keine falschen Antworten zum Üben! Mache zuerst einen Übungstest."
  },
  en: {
    // Home view
    home_title: "🦘 Kangaroo Math Practice",
    home_subtitle: "Class 3/4 - Practice for the Math Contest!",
    start_new_quiz: "Start New Practice Test",
    quiz_details: "24 questions • 3-5 points each",
    review_wrong: "Review Wrong Answers",
    review_detail: "Practice questions you got wrong",
    view_history: "View Past Tests",
    history_detail: "See your progress and scores",
    questions_to_practice: "questions to practice",

    // Quiz view
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

    // Feedback
    correct: "Correct!",
    not_quite: "Not quite right",
    points_earned: "points earned! 🎉",
    correct_answer_was: "The correct answer was:",

    // Results view
    test_complete: "🎉 Test Complete!",
    your_score: "Your Score",
    correct: "Correct",
    wrong: "Wrong",
    time: "Time",
    questions_to_review: "Questions to Review",
    save_and_home: "Save & Go Home",
    try_again: "Try Another Test",

    // Encouragement messages
    excellent: "🌟 Outstanding! You're a math superstar!",
    great: "🎯 Great job! You're doing really well!",
    good: "👍 Good effort! Keep practicing!",
    keep_trying: "💪 Nice try! Practice makes perfect!",

    // History view
    back_to_home: "← Back to Home",
    your_test_history: "📊 Your Test History",
    no_tests_yet: "No tests yet! Start your first practice test to see your progress here.",
    your_practice_tests: "Your Practice Tests",
    test_details: "Test Details",
    all_questions: "All Questions:",
    your_answer: "Your answer:",

    // Score breakdown
    starting_points: "Starting",
    earned: "Earned",
    penalty: "Penalty",

    // Alerts
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
    // Update all text elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
        element.textContent = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = this.currentLang === 'de' ? 'EN' : 'DE';
    }

    // Re-render current view if needed
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
    this.score = STARTING_BONUS; // Start with 24 points
    this.startTime = null;
    this.timerInterval = null;
    this.userAnswers = [];
  }

  // Generate a new quiz
  generateQuiz(mode = 'new') {
    this.reset();

    if (mode === 'new') {
      // Generate 24 questions: 8 easy, 8 medium, 8 hard (official Känguru format)
      const easyQuestions = this.getRandomQuestions('easy', 8);
      const mediumQuestions = this.getRandomQuestions('medium', 8);
      const hardQuestions = this.getRandomQuestions('hard', 8);

      this.currentQuiz = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
      // Shuffle the quiz so difficulties are mixed
      this.shuffleArray(this.currentQuiz);
    } else if (mode === 'review') {
      // Get questions from wrong answers pool
      const wrongAnswersPool = historyManager.getWrongAnswersPool();

      if (wrongAnswersPool.length === 0) {
        alert(languageManager.t('no_wrong_answers'));
        return false;
      }

      // Get up to 24 questions from wrong answers
      const questionsToReview = wrongAnswersPool.slice(0, Math.min(24, wrongAnswersPool.length));
      this.currentQuiz = questionsToReview.map(id =>
        questionBank.find(q => q.id === id)
      ).filter(q => q !== undefined);

      this.shuffleArray(this.currentQuiz);
    }

    this.startTime = Date.now();
    this.startTimer();
    return true;
  }

  // Get random questions by difficulty
  getRandomQuestions(difficulty, count) {
    const filteredQuestions = questionBank.filter(q => q.difficulty === difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Shuffle array in place
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Get current question
  getCurrentQuestion() {
    return this.currentQuiz[this.currentQuestionIndex];
  }

  // Submit an answer
  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    const lang = languageManager.currentLang;
    const isCorrect = answerIndex === question.correctAnswer;

    // Calculate points with penalty system
    let pointsEarned = 0;
    let pointsDeducted = 0;

    if (isCorrect) {
      pointsEarned = question.points;
      this.score += question.points;
    } else {
      // Penalty: deduct 1/4 of question points
      pointsDeducted = question.points * 0.25;
      this.score = Math.max(0, this.score - pointsDeducted); // Never go below 0
    }

    const result = {
      questionId: question.id,
      question: question.question[lang] || question.question,
      userAnswer: answerIndex,
      correctAnswer: question.correctAnswer,
      correct: isCorrect,
      pointsEarned: pointsEarned,
      pointsDeducted: pointsDeducted,
      explanation: question.explanation[lang] || question.explanation,
      options: question.options[lang] || question.options
    };

    this.userAnswers.push(result);
    return result;
  }

  // Move to next question
  nextQuestion() {
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.currentQuiz.length;
  }

  // Get quiz results
  getResults() {
    const timeInSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const correctCount = this.userAnswers.filter(a => a.correct).length;
    const wrongCount = this.userAnswers.length - correctCount;

    // Calculate total penalties
    const totalPenalty = this.userAnswers
      .filter(a => !a.correct)
      .reduce((sum, a) => sum + a.pointsDeducted, 0);

    // Calculate points earned (excluding starting bonus)
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
      totalPenalty: totalPenalty
    };
  }

  // Start timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById('timer-display').textContent = display;
    }, 1000);
  }

  // Stop timer
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Reset quiz state
  reset() {
    this.currentQuiz = [];
    this.currentQuestionIndex = 0;
    this.score = STARTING_BONUS; // Reset to starting bonus
    this.startTime = null;
    this.userAnswers = [];
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

  // Save test to history
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
      userAnswers: results.userAnswers
    };

    history.unshift(testRecord); // Add to beginning
    localStorage.setItem(this.storageKey, JSON.stringify(history));

    // Update wrong answers pool
    this.updateWrongAnswers(results.userAnswers);

    return testRecord;
  }

  // Get all test history
  getHistory() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Get specific test
  getTest(id) {
    const history = this.getHistory();
    return history.find(test => test.id === id);
  }

  // Update wrong answers pool
  updateWrongAnswers(userAnswers) {
    let wrongPool = this.getWrongAnswersPool();

    userAnswers.forEach(answer => {
      if (!answer.correct) {
        // Add to wrong pool if not already there
        if (!wrongPool.includes(answer.questionId)) {
          wrongPool.push(answer.questionId);
        }
      } else {
        // Remove from wrong pool if answered correctly
        wrongPool = wrongPool.filter(id => id !== answer.questionId);
      }
    });

    localStorage.setItem(this.wrongAnswersKey, JSON.stringify(wrongPool));
  }

  // Get wrong answers pool
  getWrongAnswersPool() {
    const data = localStorage.getItem(this.wrongAnswersKey);
    return data ? JSON.parse(data) : [];
  }

  // Clear all data
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
    this.renderHistory();
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
  const lang = languageManager.currentLang;

  // Update progress
  document.getElementById('current-q-num').textContent = quizManager.currentQuestionIndex + 1;
  document.getElementById('total-q-num').textContent = quizManager.currentQuiz.length;
  document.getElementById('current-score').textContent = Math.round(quizManager.score * 100) / 100;

  // Update difficulty badge
  const badge = document.getElementById('difficulty-badge');
  const difficultyText = languageManager.t(question.difficulty);
  const ptsText = languageManager.t('pts');
  badge.textContent = `${difficultyText.charAt(0).toUpperCase() + difficultyText.slice(1)} • ${question.points} ${ptsText}`;
  badge.className = `difficulty-badge ${question.difficulty}`;

  // Update question text (support bilingual)
  const questionText = question.question[lang] || question.question;
  document.getElementById('question-text').textContent = questionText;

  // Render options (support bilingual)
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  const options = question.options[lang] || question.options;
  options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.innerHTML = `
      <input type="radio" name="answer" id="option-${index}" value="${index}">
      <label for="option-${index}">
        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
        <span class="option-text">${option}</span>
      </label>
    `;
    optionsContainer.appendChild(optionDiv);
  });

  // Add click handlers to options
  document.querySelectorAll('.option').forEach((option, index) => {
    option.addEventListener('click', () => {
      document.getElementById(`option-${index}`).checked = true;
      document.getElementById('submit-answer-btn').disabled = false;

      // Visual feedback
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // Reset submit button
  document.getElementById('submit-answer-btn').disabled = true;

  // Hide feedback card
  document.getElementById('feedback-card').classList.add('hidden');
}

function showFeedback(result) {
  const feedbackCard = document.getElementById('feedback-card');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const feedbackPoints = document.getElementById('feedback-points');

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
    feedbackPoints.textContent = `${languageManager.t('correct_answer_was')} ${result.options[result.correctAnswer]}${penaltyText}`;
  }

  feedbackExplanation.textContent = result.explanation;
  feedbackCard.classList.remove('hidden');

  // Disable options
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

  // Update score display with breakdown
  document.getElementById('final-score').textContent = Math.round(results.score * 100) / 100;
  document.getElementById('score-percentage').textContent = `${results.percentage}%`;
  document.getElementById('correct-count').textContent = results.correctCount;
  document.getElementById('wrong-count').textContent = results.wrongCount;

  // Show score breakdown
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

  // Format time
  const minutes = Math.floor(results.timeInSeconds / 60);
  const seconds = results.timeInSeconds % 60;
  document.getElementById('time-taken').textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;

  // Encouragement message
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

  // Show wrong answers
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

      div.innerHTML = `
        <div class="wrong-q-text">${answer.question}</div>
        <div class="wrong-q-your">${yourAnswerText} ${answer.options[answer.userAnswer]}</div>
        <div class="wrong-q-correct">${correctAnswerText}: ${answer.options[answer.correctAnswer]}</div>
        <div class="wrong-q-explain">${answer.explanation}</div>
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

      div.innerHTML = `
        <div class="history-date">${date}</div>
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

      div.addEventListener('click', () => showTestDetail(test));

      historyList.appendChild(div);
    });
  }
}

function showTestDetail(test) {
  const modal = document.getElementById('test-detail-modal');
  const modalBody = document.getElementById('modal-body');

  const date = new Date(test.timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const minutes = Math.floor(test.timeInSeconds / 60);
  const seconds = test.timeInSeconds % 60;
  const timeStr = `${minutes}:${String(seconds).padStart(2, '0')}`;

  let html = `
    <div class="test-detail-summary">
      <div class="detail-date">${date}</div>
      <div class="detail-score-big">${test.score}/${test.maxScore} (${test.percentage}%)</div>
      <div class="detail-stats">
        <span>✓ Correct: ${test.correctCount}</span>
        <span>✗ Wrong: ${test.wrongCount}</span>
        <span>⏱️ Time: ${timeStr}</span>
      </div>
    </div>
    <div class="test-detail-questions">
      <h3>All Questions:</h3>
  `;

  test.userAnswers.forEach((answer, index) => {
    const statusClass = answer.correct ? 'correct' : 'wrong';
    const statusIcon = answer.correct ? '✓' : '✗';

    html += `
      <div class="detail-question ${statusClass}">
        <div class="detail-q-header">
          <span class="detail-q-num">Q${index + 1}</span>
          <span class="detail-q-status">${statusIcon}</span>
          <span class="detail-q-points">${answer.pointsEarned} pts</span>
        </div>
        <div class="detail-q-text">${answer.question}</div>
        <div class="detail-q-your">Your answer: ${answer.options[answer.userAnswer]}</div>
        ${!answer.correct ? `<div class="detail-q-correct">Correct answer: ${answer.options[answer.correctAnswer]}</div>` : ''}
        <div class="detail-q-explain">${answer.explanation}</div>
      </div>
    `;
  });

  html += '</div>';

  modalBody.innerHTML = html;
  modal.classList.remove('hidden');
}

// ============================================
// INITIALIZATION & EVENT LISTENERS
// ============================================
const quizManager = new QuizManager();
const historyManager = new HistoryManager();
const languageManager = new LanguageManager();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language toggle button
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
    if (quizManager.generateQuiz('new')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
  });

  document.getElementById('review-wrong-btn').addEventListener('click', () => {
    if (quizManager.generateQuiz('review')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
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
    if (quizManager.generateQuiz('new')) {
      ViewManager.showQuiz();
      renderQuestion();
    }
  });

  // History view buttons
  document.getElementById('back-to-home-btn').addEventListener('click', () => {
    ViewManager.showHome();
  });

  // Modal close button
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('test-detail-modal').classList.add('hidden');
  });

  // Close modal when clicking outside
  document.getElementById('test-detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'test-detail-modal') {
      document.getElementById('test-detail-modal').classList.add('hidden');
    }
  });

  // Initialize home view
  ViewManager.showHome();
  languageManager.updateUI();
});
