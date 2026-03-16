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
        this.yearScores = this.loadYearScores(); // Track scores per year

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
            this.returnToHome();
        });

        // Expand image button
        document.getElementById('expandImageBtn').addEventListener('click', () => {
            this.showImageModal();
        });

        // View full page button
        document.getElementById('viewPageBtn').addEventListener('click', () => {
            this.showFullPage();
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

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideImageModal();
            }
        });

        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Results buttons
        document.getElementById('homeBtn').addEventListener('click', () => {
            this.returnToHome();
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

            const yearScore = this.yearScores[year];
            const card = document.createElement('button');
            card.className = 'year-card';
            card.dataset.year = year;

            let scoreDisplay = '';
            if (yearScore) {
                scoreDisplay = `<span class="year-score">⭐ ${yearScore.score} ${this.currentLanguage === 'de' ? 'Punkte' : 'Points'}</span>`;
            }

            card.innerHTML = `
                <span class="year-number">${year}</span>
                <span class="year-label">Klasse 3/4</span>
                ${scoreDisplay}
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

        // Re-render year selection to update score labels
        if (document.getElementById('homeScreen').classList.contains('active')) {
            this.renderYearSelection();
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

        // Scroll to quiz screen smoothly
        setTimeout(() => {
            const quizScreen = document.getElementById('quizScreen');
            quizScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
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

        // Scroll to quiz screen smoothly
        setTimeout(() => {
            const quizScreen = document.getElementById('quizScreen');
            quizScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
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

            // Try to load the individual question image first
            const individualImage = `images/${question.year || this.currentYear}/${question.id}.png`;

            // Check if image exists by attempting to load it
            questionImage.onerror = () => {
                // Fallback to full page image if individual question image fails
                const pageNum = this.getPageNumber(question.id);
                const fallbackImage = `images/${question.year || this.currentYear}/page_${pageNum}.png`;
                questionImage.src = fallbackImage;
                console.log(`Fallback: Using page ${pageNum} for ${question.id}`);
            };

            questionImage.src = individualImage;
        } else {
            imageWrapper.style.display = 'none';
        }

        // Render options
        this.renderOptions(question);

        // Hide feedback
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('feedback').classList.remove('correct', 'wrong');

        // Scroll to top of question
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    getPageNumber(questionId) {
        /**
         * Estimate which PDF page a question is on
         * Page 1: A1-A5 (typically)
         * Page 2: A6-A8, B1-B4
         * Page 3: B5-B8, C1-C2
         * Page 4: C3-C8
         */
        const section = questionId[0];
        const num = parseInt(questionId.substring(1));

        if (section === 'A') {
            return num <= 5 ? 1 : 2;
        } else if (section === 'B') {
            return num <= 4 ? 2 : 3;
        } else if (section === 'C') {
            return num <= 2 ? 3 : 4;
        }

        return 1; // Default fallback
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

        // Save score for this year
        if (!this.isPracticeMode) {
            this.saveYearScore(this.currentYear, this.score, correctCount, wrongCount);
        }

        this.showScreen('resultsScreen');

        // Scroll to results screen smoothly
        setTimeout(() => {
            const resultsScreen = document.getElementById('resultsScreen');
            resultsScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    returnToHome() {
        this.renderYearSelection(); // Refresh to show updated scores
        this.showScreen('homeScreen');
    }

    showImageModal() {
        const currentImage = document.getElementById('questionImage').src;
        document.getElementById('modalImage').src = currentImage;
        document.getElementById('imageModal').classList.remove('hidden');
    }

    hideImageModal() {
        document.getElementById('imageModal').classList.add('hidden');
    }

    showFullPage() {
        const question = this.questions[this.currentQuestionIndex];
        const pageNum = this.getPageNumber(question.id);
        const pageImage = `images/${question.year || this.currentYear}/page_${pageNum}.png`;

        // Show the full page in the modal
        document.getElementById('modalImage').src = pageImage;
        document.getElementById('imageModal').classList.remove('hidden');
    }

    // Year Score Management
    loadYearScores() {
        const stored = localStorage.getItem('kanguruYearScores');
        return stored ? JSON.parse(stored) : {};
    }

    saveYearScore(year, score, correct, wrong) {
        this.yearScores[year] = {
            score: score,
            correct: correct,
            wrong: wrong,
            date: new Date().toISOString()
        };
        localStorage.setItem('kanguruYearScores', JSON.stringify(this.yearScores));
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
