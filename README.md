# Känguru Math Quiz

Interactive quiz application for Känguru mathematics competition questions (Grades 3/4).

## Features

✅ **Bilingual Support**: Switch between German and English in real-time
✅ **Year Selection**: Practice questions from 2000-2025
✅ **Wrong Answer Practice**: Automatically saves incorrectly answered questions for review
✅ **Image Support**: View question diagrams with popup zoom
✅ **Smart Scoring**: Starts at 24 points, adds points for correct answers, subtracts for wrong answers
✅ **Detailed Feedback**: Get explanations for both correct and wrong answers
✅ **Responsive Design**: Works on mobile, tablet, and desktop

## Quick Start

1. Open `index.html` in a web browser
2. Select a year to practice
3. Answer questions and get immediate feedback
4. Switch language anytime using the toggle button (🇩🇪/🇬🇧)

## Adding Question Images

### Option 1: Automatic Extraction (Requires Poppler)

1. Install Poppler:
   - **Windows**: Download from https://github.com/oschwartz10612/poppler-windows/releases/
   - Extract and add `bin` folder to PATH

2. Run the extraction script:
   ```bash
   python extract_pdf_images.py
   ```

### Option 2: Manual Screenshot Method

1. Open a Kanguru PDF (e.g., `kaenguru2025_34.pdf`)
2. For each question page:
   - Take a screenshot of the entire page
   - Save as `images/2025/A1.png` (for question A1)
   - Save as `images/2025/B1.png` (for question B1)
   - etc.

3. Update `questions-data.js`:
   ```javascript
   imagePath: 'images/2025/A1.png'
   ```

### Option 3: Use Full Page Images

1. Convert each PDF page to an image
2. Save as `images/YEAR/page_1.png`, `images/YEAR/page_2.png`, etc.
3. Questions on page 1 use `page_1.png`, questions on page 2 use `page_2.png`

## File Structure

```
KanguruKlasse3/
├── index.html              # Main HTML file
├── app.js                  # Application logic
├── styles.css              # Styling and responsive design
├── questions-data.js       # Question data (German & English)
├── images/                 # Question images organized by year
│   ├── 2025/
│   │   ├── page_1.png
│   │   ├── page_2.png
│   │   └── ...
│   ├── 2024/
│   └── ...
├── extract_pdf_images.py   # PDF image extraction script
└── README.md               # This file
```

## Adding More Questions

To add questions for a new year:

1. Open `questions-data.js`
2. Add a new year entry:

```javascript
2026: {
    year: 2026,
    title: 'Känguru 2026 - Klasse 3/4',
    questions: [
        {
            id: 'A1',
            section: 'A',
            number: 1,
            points: 3,
            questionTextDE: 'German question text',
            questionTextEN: 'English question text',
            hasImage: true,
            imagePath: 'images/2026/A1.png',
            options: [
                { id: 'A', textDE: 'Option A DE', textEN: 'Option A EN' },
                { id: 'B', textDE: 'Option B DE', textEN: 'Option B EN' },
                { id: 'C', textDE: 'Option C DE', textEN: 'Option C EN' },
                { id: 'D', textDE: 'Option D DE', textEN: 'Option D EN' },
                { id: 'E', textDE: 'Option E DE', textEN: 'Option E EN' }
            ],
            correctAnswer: 'B',
            reasoningDE: 'German explanation',
            reasoningEN: 'English explanation'
        },
        // ... more questions
    ]
}
```

## Scoring System

- **Starting Score**: 24 points
- **Correct Answer**: +3, +4, or +5 points (depending on difficulty)
- **Wrong Answer**: -0.75, -1, or -1.25 points (25% of question value)
- **No Answer**: 0 points
- **Minimum Score**: 0 points
- **Maximum Score**: 120 points

## Question Difficulty Levels

- **Section A (A1-A8)**: 3 points each (easiest)
- **Section B (B1-B8)**: 4 points each (medium)
- **Section C (C1-C8)**: 5 points each (hardest)

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Pure Vanilla JavaScript** (no frameworks)
- **CSS Grid & Flexbox** for responsive layout
- **LocalStorage** for saving wrong answers
- **SVG placeholders** for missing images

## License

Educational use only. Känguru competition questions are copyrighted by the respective organizations.

## Credits

- Questions from Känguru der Mathematik competition
- App developed for educational purposes
