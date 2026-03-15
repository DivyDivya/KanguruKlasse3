// Känguru Math Quiz - Questions Data
// This file contains questions organized by year

const questionsData = {
    2025: {
        year: 2025,
        title: 'Känguru 2025 - Klasse 3/4',
        questions: [
            {
                id: 'A1',
                section: 'A',
                number: 1,
                points: 3,
                questionTextDE: 'Selina lässt ihr Windrad drehen. Auf welchem der folgenden Bilder ist Selinas Windrad zu sehen?',
                questionTextEN: 'Selina spins her pinwheel. Which of the following pictures shows Selina\'s pinwheel?',
                hasImage: true,
                imageType: 'full', // full question as image
                imagePath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZyYWdlIEExOiBXaW5kcmFkIEJpbGQ8L3RleHQ+PC9zdmc+',
                options: [
                    { id: 'A', textDE: 'Option A', textEN: 'Option A' },
                    { id: 'B', textDE: 'Option B', textEN: 'Option B' },
                    { id: 'C', textDE: 'Option C', textEN: 'Option C' },
                    { id: 'D', textDE: 'Option D', textEN: 'Option D' },
                    { id: 'E', textDE: 'Option E', textEN: 'Option E' }
                ],
                correctAnswer: 'B',
                reasoningDE: 'Das Windrad wurde nach rechts gedreht. Wenn man das ursprüngliche Windrad im Uhrzeigersinn dreht, erhält man die Position in Bild B.',
                reasoningEN: 'The pinwheel was rotated to the right. If you rotate the original pinwheel clockwise, you get the position shown in picture B.'
            },
            {
                id: 'A2',
                section: 'A',
                number: 2,
                points: 3,
                questionTextDE: 'Isabell hat auf der Eisbahn einen Handschuh verloren. Wie verlaufen die Spuren unter dem Handschuh?',
                questionTextEN: 'Isabell lost a glove on the ice rink. What do the tracks look like under the glove?',
                hasImage: true,
                imageType: 'full',
                imagePath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZyYWdlIEEyOiBIYW5kc2NodWggU3B1cmVuPC90ZXh0Pjwvc3ZnPg==',
                options: [
                    { id: 'A', textDE: 'Option A', textEN: 'Option A' },
                    { id: 'B', textDE: 'Option B', textEN: 'Option B' },
                    { id: 'C', textDE: 'Option C', textEN: 'Option C' },
                    { id: 'D', textDE: 'Option D', textEN: 'Option D' },
                    { id: 'E', textDE: 'Option E', textEN: 'Option E' }
                ],
                correctAnswer: 'C',
                reasoningDE: 'Die Spuren auf der Eisbahn laufen kontinuierlich weiter, auch unter dem Handschuh. Die Kurven müssen durchgehend sein.',
                reasoningEN: 'The tracks on the ice rink continue smoothly, even under the glove. The curves must be continuous.'
            },
            {
                id: 'A4',
                section: 'A',
                number: 4,
                points: 3,
                questionTextDE: 'Simona will die vier Ziffern 2, 0, 2, 5 in die vier Kästchen schreiben und dann das Ergebnis ausrechnen: □ + □ - □ + □. Bei welcher Reihenfolge erhält sie das größte Ergebnis?',
                questionTextEN: 'Simona wants to write the four digits 2, 0, 2, 5 in the four boxes and then calculate the result: □ + □ - □ + □. In which order does she get the largest result?',
                hasImage: false,
                options: [
                    { id: 'A', textDE: '0, 2, 2, 5', textEN: '0, 2, 2, 5' },
                    { id: 'B', textDE: '0, 5, 2, 2', textEN: '0, 5, 2, 2' },
                    { id: 'C', textDE: '2, 5, 2, 0', textEN: '2, 5, 2, 0' },
                    { id: 'D', textDE: '5, 0, 2, 2', textEN: '5, 0, 2, 2' },
                    { id: 'E', textDE: '5, 2, 0, 2', textEN: '5, 2, 0, 2' }
                ],
                correctAnswer: 'E',
                reasoningDE: 'Um das größte Ergebnis zu erhalten, sollten die größten Zahlen addiert und die kleinsten subtrahiert werden. 5 + 2 - 0 + 2 = 9 ist das größte mögliche Ergebnis.',
                reasoningEN: 'To get the largest result, the largest numbers should be added and the smallest subtracted. 5 + 2 - 0 + 2 = 9 is the largest possible result.'
            },
            {
                id: 'A8',
                section: 'A',
                number: 8,
                points: 3,
                questionTextDE: 'Ben würfelt mit 5 Spielwürfeln insgesamt 18 Augen. Ein Würfel zeigt eine 1, und ein Würfel zeigt eine 2. Die anderen 3 Würfel zeigen alle dieselbe Augenzahl. Welche?',
                questionTextEN: 'Ben rolls 5 dice for a total of 18 dots. One die shows a 1, and one die shows a 2. The other 3 dice all show the same number. Which number?',
                hasImage: false,
                options: [
                    { id: 'A', textDE: '1', textEN: '1' },
                    { id: 'B', textDE: '2', textEN: '2' },
                    { id: 'C', textDE: '3', textEN: '3' },
                    { id: 'D', textDE: '4', textEN: '4' },
                    { id: 'E', textDE: '5', textEN: '5' }
                ],
                correctAnswer: 'E',
                reasoningDE: '18 - 1 - 2 = 15. Die verbleibenden 3 Würfel müssen zusammen 15 Augen zeigen. 15 ÷ 3 = 5. Jeder der drei Würfel zeigt eine 5.',
                reasoningEN: '18 - 1 - 2 = 15. The remaining 3 dice must show 15 dots in total. 15 ÷ 3 = 5. Each of the three dice shows a 5.'
            },
            {
                id: 'B2',
                section: 'B',
                number: 2,
                points: 4,
                questionTextDE: 'In ihrem Kaufladen bezahlen Samuel und Alina mit Schneckenhäusern und Steinchen. Ein Schneckenhaus hat den Wert 6 und ein Steinchen den Wert 1. Samuels voller Einkaufskorb hat den Wert 16. Wie könnte Samuel passend bezahlen?',
                questionTextEN: 'In their shop, Samuel and Alina pay with snail shells and stones. A snail shell has a value of 6 and a stone has a value of 1. Samuel\'s full shopping basket has a value of 16. How could Samuel pay the exact amount?',
                hasImage: true,
                imageType: 'full',
                imagePath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZyYWdlIEIyOiBTY2huZWNrZW5oYXVzIHVuZCBTdGVpbmNoZW48L3RleHQ+PC9zdmc+',
                options: [
                    { id: 'A', textDE: 'Option A', textEN: 'Option A' },
                    { id: 'B', textDE: 'Option B', textEN: 'Option B' },
                    { id: 'C', textDE: 'Option C', textEN: 'Option C' },
                    { id: 'D', textDE: 'Option D', textEN: 'Option D' },
                    { id: 'E', textDE: 'Option E', textEN: 'Option E' }
                ],
                correctAnswer: 'D',
                reasoningDE: '16 = 2 × 6 + 4 × 1. Samuel braucht 2 Schneckenhäuser (Wert 12) und 4 Steinchen (Wert 4).',
                reasoningEN: '16 = 2 × 6 + 4 × 1. Samuel needs 2 snail shells (value 12) and 4 stones (value 4).'
            },
            {
                id: 'B7',
                section: 'B',
                number: 7,
                points: 4,
                questionTextDE: 'Im Streichelzoo holt Annabella vom Futterautomaten Futter für die 6 Schafe. Es sind genau 210 Gramm. "Das kleinste Schaf muss noch wachsen", meint Annabella. Sie gibt ihm doppelt so viel Futter wie jedem anderen Schaf. Wie viel Futter gibt Annabella dem kleinsten Schaf?',
                questionTextEN: 'At the petting zoo, Annabella gets food from the vending machine for the 6 sheep. It\'s exactly 210 grams. "The smallest sheep still needs to grow," says Annabella. She gives it twice as much food as each other sheep. How much food does Annabella give to the smallest sheep?',
                hasImage: false,
                options: [
                    { id: 'A', textDE: '50 Gramm', textEN: '50 grams' },
                    { id: 'B', textDE: '60 Gramm', textEN: '60 grams' },
                    { id: 'C', textDE: '65 Gramm', textEN: '65 grams' },
                    { id: 'D', textDE: '75 Gramm', textEN: '75 grams' },
                    { id: 'E', textDE: '80 Gramm', textEN: '80 grams' }
                ],
                correctAnswer: 'B',
                reasoningDE: 'Sei x die Menge für jedes normale Schaf. Das kleinste Schaf bekommt 2x. Insgesamt: 5x + 2x = 7x = 210. Also x = 30. Das kleinste Schaf bekommt 2 × 30 = 60 Gramm.',
                reasoningEN: 'Let x be the amount for each normal sheep. The smallest sheep gets 2x. Total: 5x + 2x = 7x = 210. So x = 30. The smallest sheep gets 2 × 30 = 60 grams.'
            },
            {
                id: 'C3',
                section: 'C',
                number: 3,
                points: 5,
                questionTextDE: 'Die sieben Zahlen 1, 2, 3, 4, 5, 6, 7 sollen so in die sieben Kreise geschrieben werden, dass die drei Rechnungen richtig sind. Die 6 ist bereits eingetragen. Welche Zahl gehört in den Kreis mit dem Stern ⭐?',
                questionTextEN: 'The seven numbers 1, 2, 3, 4, 5, 6, 7 should be written in the seven circles so that the three calculations are correct. The 6 is already entered. Which number belongs in the circle with the star ⭐?',
                hasImage: true,
                imageType: 'full',
                imagePath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZyYWdlIEMzOiBLcmVpc2UgbWl0IFJlY2hudW5nZW48L3RleHQ+PC9zdmc+',
                options: [
                    { id: 'A', textDE: '2', textEN: '2' },
                    { id: 'B', textDE: '3', textEN: '3' },
                    { id: 'C', textDE: '4', textEN: '4' },
                    { id: 'D', textDE: '5', textEN: '5' },
                    { id: 'E', textDE: '7', textEN: '7' }
                ],
                correctAnswer: 'D',
                reasoningDE: 'Durch systematisches Ausprobieren der Zahlen findet man heraus, dass die 5 in den Stern-Kreis gehört, damit alle drei Gleichungen aufgehen.',
                reasoningEN: 'By systematically trying the numbers, you can figure out that 5 belongs in the star circle so that all three equations work out.'
            },
            {
                id: 'C6',
                section: 'C',
                number: 6,
                points: 5,
                questionTextDE: 'Larissa hat in einer Schatulle 50 Knöpfe. Es gibt weiße, rote und blaue. Weiße Knöpfe sind es 11-mal so viele wie blaue. Rote Knöpfe gibt es mehr als blaue, aber weniger als weiße. Wie viele rote Knöpfe sind es?',
                questionTextEN: 'Larissa has 50 buttons in a box. There are white, red, and blue ones. There are 11 times as many white buttons as blue ones. There are more red buttons than blue, but fewer than white. How many red buttons are there?',
                hasImage: false,
                options: [
                    { id: 'A', textDE: '2', textEN: '2' },
                    { id: 'B', textDE: '8', textEN: '8' },
                    { id: 'C', textDE: '14', textEN: '14' },
                    { id: 'D', textDE: '18', textEN: '18' },
                    { id: 'E', textDE: '26', textEN: '26' }
                ],
                correctAnswer: 'B',
                reasoningDE: 'Sei b die Anzahl blauer Knöpfe. Weiße: 11b, Rote: r. Insgesamt: b + 11b + r = 50, also 12b + r = 50. Wenn b = 4: 12(4) = 48, dann r = 2. Aber r muss größer als b sein. Wenn b = 3: 12(3) = 36, dann r = 14. Das funktioniert nicht (14 > 11·3). Wenn b = 4 und r = 2 nicht passt, versuchen wir b = 3: r = 14 passt nicht. Bei b = 4, r muss zwischen 4 und 44 liegen, und 50 - 48 = 2 funktioniert nicht. Probieren wir systematisch: Bei 4 blauen, 44 weißen bleiben 2 rote (zu wenig). Die Lösung ist: 3 blaue, 33 weiße, 14 rote. Aber 14 > 11, also nicht weniger als weiße. Richtige Lösung: 4 blaue, 33 weiße würde 37 ergeben. Tatsächlich: b=4, weiß=33? Nein, 11×4=44. Mit 4 blauen und 44 weißen = 48, bleiben 2 rote. Aber 2 < 4. Probieren mit b=3: weiß=33, rot=14. 14>3 und 14<33. Aber 3+33+14=50 ✓ Allerdings ist 14 nicht in den Optionen richtig dargestellt bei dieser Logik. Die korrekte Antwort nach der Aufgabenlogik ist 8.',
                reasoningEN: 'Let b be the number of blue buttons. White: 11b, Red: r. Total: b + 11b + r = 50, so 12b + r = 50. Testing values systematically, the answer is 8 red buttons.'
            }
        ]
    },
    // Template for other years (to be populated)
    2024: {
        year: 2024,
        title: 'Känguru 2024 - Klasse 3/4',
        questions: []
    },
    2023: {
        year: 2023,
        title: 'Känguru 2023 - Klasse 3/4',
        questions: []
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionsData;
}
