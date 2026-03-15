// Känguru Math Quiz - Application Logic

class KanguruQuiz {
    constructor() {
        this.currentLanguage = 'de';
        this.currentYear = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = 24; // Starting score
        this.answers = [];
        this.wrongQuestions = this.loadWrongQuestions();
        this.isPracticeMode = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderYearSelection();
        this.updateLanguage();
        this.updatePracticeButton();
    }

    setupEventListeners() {
        // Language toggle
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Year selection
        document.querySelector('.year-selection').addEventListener('click', (e) => {
            const yearCard = e.target.closest('.year-card');
            if (yearCard) {
                const year = parseInt(yearCard.dataset.year);
                this.startQuiz(year);
            }
        });

        // Practice wrong answers
        document.getElementById('practiceWrongBtn').addEventListener('click', () => {
            this.startPracticeMode();
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showScreen('homeScreen');
        });

        // Expand image button
        document.getElementById('expandImageBtn').addEventListener('click', () => {
            this.showImageModal();
        });

        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideImageModal();
        });

        // Click outside modal to close
        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') {
                this.hideImageModal();
            }
        });

        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Results buttons
        document.getElementById('homeBtn').addEventListener('click', () => {
            this.showScreen('homeScreen');
        });

        document.getElementById('retryBtn').addEventListener('click', () => {
            this.startQuiz(this.currentYear);
        });
    }

    renderYearSelection() {
        const container = document.querySelector('.year-selection');
        container.innerHTML = '';

        const years = Object.keys(questionsData)
            .map(y => parseInt(y))
            .sort((a, b) => b - a); // Newest first

        years.forEach(year => {
            const hasQuestions = questionsData[year].questions.length > 0;
            if (!hasQuestions) return; // Skip years without questions

            const card = document.createElement('button');
            card.className = 'year-card';
            card.dataset.year = year;
            card.innerHTML = `
                <span class="year-number">${year}</span>
                <span class="year-label">Klasse 3/4</span>
            `;
            container.appendChild(card);
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'de' ? 'en' : 'de';
        this.updateLanguage();
    }

    updateLanguage() {
        const flag = this.currentLanguage === 'de' ? '🇩🇪' : '🇬🇧';
        const text = this.currentLanguage === 'de' ? 'DE' : 'EN';

        document.querySelector('.lang-btn .flag').textContent = flag;
        document.querySelector('.lang-btn .lang-text').textContent = text;

        // Update all translatable elements
        document.querySelectorAll('[data-de]').forEach(el => {
            const key = this.currentLanguage === 'de' ? 'de' : 'en';
            el.textContent = el.dataset[key];
        });

        // Update current question if in quiz
        if (this.questions.length > 0 && this.currentQuestionIndex < this.questions.length) {
            this.renderQuestion();
        }
    }

    startQuiz(year) {
        this.currentYear = year;
        this.questions = [...questionsData[year].questions];
        this.currentQuestionIndex = 0;
        this.score = 24;
        this.answers = [];
        this.isPracticeMode = false;

        if (this.questions.length === 0) {
            alert('Keine Fragen für dieses Jahr verfügbar / No questions available for this year');
            return;
        }

        this.showScreen('quizScreen');
        this.updateQuizHeader();
        this.renderQuestion();
    }

    startPracticeMode() {
        if (this.wrongQuestions.length === 0) return;

        this.isPracticeMode = true;
        this.questions = [...this.wrongQuestions];
        this.currentQuestionIndex = 0;
        this.score = 24;
        this.answers = [];
        this.currentYear = 'Practice';

        this.showScreen('quizScreen');
        this.updateQuizHeader();
        this.renderQuestion();
    }

    updateQuizHeader() {
        const title = this.isPracticeMode ?
            (this.currentLanguage === 'de' ? 'Falsche Antworten üben' : 'Practice Wrong Answers') :
            questionsData[this.currentYear].title;

        document.getElementById('quizTitle').textContent = title;
        document.getElementById('totalQuestions').textContent = this.questions.length;
        this.updateProgress();
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('scoreValue').textContent = this.score;
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestionIndex];

        // Update question header
        document.getElementById('questionId').textContent = question.id;
        document.getElementById('questionPoints').textContent = question.points;

        // Update question text
        const textKey = this.currentLanguage === 'de' ? 'questionTextDE' : 'questionTextEN';
        document.getElementById('questionText').textContent = question[textKey];

        // Handle image
        const imageWrapper = document.querySelector('.question-image-wrapper');
        const questionImage = document.getElementById('questionImage');

        if (question.hasImage) {
            imageWrapper.style.display = 'block';
            questionImage.src = question.imagePath || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPltCaWxkIG5pY2h0IHZlcmbDvGdiYXIgLyBJbWFnZSBub3QgYXZhaWxhYmxlXTwvdGV4dD48L3N2Zz4=';
        } else {
            imageWrapper.style.display = 'none';
        }

        // Render options
        this.renderOptions(question);

        // Hide feedback
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('feedback').classList.remove('correct', 'wrong');
    }

    renderOptions(question) {
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';

        question.options.forEach(option => {
            const textKey = this.currentLanguage === 'de' ? 'textDE' : 'textEN';
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.dataset.option = option.id;
            btn.innerHTML = `
                <span class="option-label">${option.id}</span>
                <span class="option-text">${option[textKey]}</span>
            `;

            btn.addEventListener('click', () => this.selectOption(option.id));
            container.appendChild(btn);
        });
    }

    selectOption(selectedOption) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedOption === question.correctAnswer;

        // Disable all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.add('disabled');
            const optionId = btn.dataset.option;

            if (optionId === question.correctAnswer) {
                btn.classList.add('correct');
                btn.innerHTML += '<span class="option-icon">✓</span>';
            } else if (optionId === selectedOption && !isCorrect) {
                btn.classList.add('wrong');
                btn.innerHTML += '<span class="option-icon">✗</span>';
            }
        });

        // Update score
        if (isCorrect) {
            this.score += question.points;
        } else {
            this.score -= Math.ceil(question.points * 0.25);
            this.score = Math.max(0, this.score); // Minimum score is 0

            // Add to wrong questions if not in practice mode
            if (!this.isPracticeMode) {
                this.addWrongQuestion(question);
            }
        }

        // Record answer
        this.answers.push({
            questionId: question.id,
            selected: selectedOption,
            correct: question.correctAnswer,
            isCorrect: isCorrect,
            points: isCorrect ? question.points : -Math.ceil(question.points * 0.25)
        });

        // Show feedback
        this.showFeedback(isCorrect, question);
        this.updateProgress();
    }

    showFeedback(isCorrect, question) {
        const feedback = document.getElementById('feedback');
        const reasoningKey = this.currentLanguage === 'de' ? 'reasoningDE' : 'reasoningEN';

        feedback.classList.remove('hidden', 'correct', 'wrong');
        feedback.classList.add(isCorrect ? 'correct' : 'wrong');

        const icon = isCorrect ? '✅' : '❌';
        const titleDE = isCorrect ? 'Richtig!' : 'Falsch!';
        const titleEN = isCorrect ? 'Correct!' : 'Wrong!';
        const title = this.currentLanguage === 'de' ? titleDE : titleEN;

        feedback.querySelector('.feedback-icon').textContent = icon;
        feedback.querySelector('.feedback-title').textContent = title;
        feedback.querySelector('.feedback-reasoning').textContent = question[reasoningKey] ||
            (this.currentLanguage === 'de' ? 'Keine Erklärung verfügbar.' : 'No explanation available.');
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.renderQuestion();
            this.updateProgress();
        }
    }

    showResults() {
        const correctCount = this.answers.filter(a => a.isCorrect).length;
        const wrongCount = this.answers.filter(a => !a.isCorrect).length;
        const skippedCount = this.questions.length - this.answers.length;

        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('wrongCount').textContent = wrongCount;
        document.getElementById('skippedCount').textContent = skippedCount;

        this.showScreen('resultsScreen');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    showImageModal() {
        const currentImage = document.getElementById('questionImage').src;
        document.getElementById('modalImage').src = currentImage;
        document.getElementById('imageModal').classList.remove('hidden');
    }

    hideImageModal() {
        document.getElementById('imageModal').classList.add('hidden');
    }

    // Wrong Questions Management
    loadWrongQuestions() {
        const stored = localStorage.getItem('kanguruWrongQuestions');
        return stored ? JSON.parse(stored) : [];
    }

    saveWrongQuestions() {
        localStorage.setItem('kanguruWrongQuestions', JSON.stringify(this.wrongQuestions));
        this.updatePracticeButton();
    }

    addWrongQuestion(question) {
        // Check if question already exists
        const exists = this.wrongQuestions.some(q =>
            q.id === question.id && q.year === question.year
        );

        if (!exists) {
            this.wrongQuestions.push(question);
            this.saveWrongQuestions();
        }
    }

    updatePracticeButton() {
        const btn = document.getElementById('practiceWrongBtn');
        const count = this.wrongQuestions.length;

        btn.disabled = count === 0;
        btn.querySelector('.wrong-count').textContent = `(${count})`;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kanguruQuiz = new KanguruQuiz();
});
