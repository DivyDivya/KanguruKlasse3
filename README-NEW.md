# Känguru Mathe-Übung - Image-Based Version

This is an updated version that uses actual Känguru competition questions from PDFs (2010-2025).

## Features

- 📅 **18 Complete Tests** - Real Känguru tests from years 2010-2025
- 🖼️ **Image-Based Questions** - Questions displayed as images extracted from official PDFs
- ✅ **Radio Button Answers** - Choose from A, B, C, D, or E for each question
- 🎯 **Automatic Scoring** - Official Känguru scoring system (24 starting points, +3/4/5 for correct, -0.25× for wrong)
- 📊 **Progress Tracking** - Save test results and view history
- 🌍 **Bilingual** - German and English interface

## How to Use

1. **Open `index.html`** in your web browser
2. **Click "Neuen Übungstest starten"** (Start New Practice Test)
3. **Select a year** from 2010-2025
4. **Answer 24 questions** by clicking radio buttons A-E
5. **View your results** and track your progress

## File Structure

```
kanguru-practice/
├── index.html           # Main HTML file
├── app.js              # Application logic (simplified, no regeneration)
├── styles.css          # Styling
├── tests-data.js       # Test data with answers
├── images/             # Extracted question images
│   ├── 2010/
│   ├── 2011/
│   └── ... (2012-2025)
└── kanguru/            # Original Word documents
```

## Changes from Previous Version

### Removed
- ❌ Question templates and regeneration logic
- ❌ Difficulty selection (easy/normal/hard number ranges)
- ❌ "Regenerate Question" button
- ❌ Dynamic question generation
- ❌ Review wrong answers mode (simplified)

### Added
- ✅ Year selection modal
- ✅ Image-based question display
- ✅ 18 real Känguru tests (2010-2025)
- ✅ Automatic answer mapping from solutions file

## Technical Details

### Question Structure
Each test contains 24 questions organized as:
- **A1-A8**: Easy questions (3 points each)
- **B1-B8**: Medium questions (4 points each)
- **C1-C8**: Hard questions (5 points each)

### Image Extraction
Images are extracted from Word documents using Python:
```bash
python extract_images.py
```

### Answer Key
Answers are parsed from `Kaenguru_Loesungen_3-4_1998-2025_fromPDF_green_sections.docx`

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Questions © Känguru der Mathematik e.V.
- This is an educational practice tool
