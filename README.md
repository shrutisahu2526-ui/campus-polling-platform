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

## Deployment on Vercel

### Option 1: Git Integration (Recommended)
1.  Push this project to GitHub/GitLab/Bitbucket.
2.  Log in to [vercel.com](https://vercel.com) and click "Add New... > Project".
3.  Import your repository.
4.  Vercel will detect it as a static site.
    - **Build Command**: Leave empty.
    - **Output Directory**: Leave empty (root).
5.  Click **Deploy**.

### Option 2: Vercel CLI
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the project root.
3.  Follow the prompts to deploy to production.

## Note on Data
This demo uses **local browser storage** (localStorage) and simulated mock data. Votes are not persisted to a shared backend in this version.