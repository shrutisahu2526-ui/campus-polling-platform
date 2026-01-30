# Campus Polling Platform

A fast, real-time campus polling application demo. This project demonstrates a responsive UI for voting on campus issues.

## Project Structure

- `index.html`: Main entry point.
- `style.css`: All styling (Vanilla CSS).
- `script.js`: Client-side logic (Mock data & interaction).
- `firebase.js`: Template for future Firebase integration (Currently unused).

## How to Run Locally

1.  Clone this repository or download the files.
2.  Open `index.html` directly in your browser.
    - *Tip*: use a simple local server like "Live Server" in VS Code for the best experience.

## Deployment on Netlify

### Option 1: Drag & Drop (Manual)
1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag the entire project folder onto the page.
3.  Your site will be live instantly!

### Option 2: Git Integration (Recommended)
1.  Push this project to GitHub.
2.  Log in to [Netlify](https://app.netlify.com) and click "Add new site" -> "Import an existing project".
3.  Select your repository.
4.  Netlify will detect the `netlify.toml` file automatically.
5.  Click **Deploy Site**.

## Note on Data
This demo uses **local browser storage** (localStorage) and simulated mock data. Votes are not persisted to a shared backend in this version.