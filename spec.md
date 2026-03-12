# Amrit NCERT 2026

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full Hindi-medium education web app for NCERT students
- Home screen with 2-column grid of 7 section cards (Books, Solutions, Notes, Important Questions, Video Tutorials, MCQ Practice, CBSE Papers)
- NCERT Books section: class-wise tabs (6–12), subject cards with Hindi/English names, iframe-based PDF viewer
- NCERT Solutions section: class/subject selector, chapter-wise accordion with Hindi sample solutions
- NCERT Notes section: class/subject selector, colorful revision note cards in Hindi
- Important Questions section: class/subject selector, chapter-wise questions in Hindi card format
- MCQ Practice section: subject/chapter selector, 4-option quiz, score tracking, correct/incorrect feedback, result screen
- Video Tutorials section: subject category cards, embedded YouTube iframes, playlist layout with Hindi titles
- CBSE Board Papers section: Class 10/12 tabs, subject-wise year papers (2020–2024), PDF viewer
- Bottom navigation bar for Home and key sections
- Search bar on home screen
- Student-friendly color scheme (blues, greens, oranges)
- Fully Hindi language interface
- No login required

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: Store MCQ questions, notes, solutions, and questions data in Motoko stable storage with query APIs
2. Frontend: Multi-page React app with bottom nav, home grid, and all 7 section pages
3. All sample content in Hindi embedded in frontend data files for offline-friendly access
4. PDF viewer via iframe with NCERT official URLs
5. YouTube embeds via iframe for video tutorials
6. MCQ quiz engine with state management for answers, score, and result screen
