# Repository Guidelines

## Project Structure & Module Organization
This repository is currently minimal and does not yet contain application source files. Keep the root clean and organize new code by concern:

- `frontend/` for UI assets such as HTML, CSS, and browser JavaScript
- `backend/` for server code, APIs, and database logic
- `public/` for static files served directly
- `tests/` for automated tests, mirroring the feature or module under test

Example layout: `frontend/js/app.js`, `backend/db/seed.js`, `tests/frontend/app.test.js`.

## Build, Test, and Development Commands
There are no build or test scripts configured yet. When adding tooling, expose it through a project-level script file such as `package.json` so contributors can use consistent commands.

Recommended command patterns:

- `npm install` to install project dependencies
- `npm run dev` to start a local development server
- `npm test` to run the automated test suite
- `npm run lint` to check formatting and code quality

Document any new scripts in this file when they are introduced.

## Coding Style & Naming Conventions
Use 2-space indentation for frontend code and keep formatting consistent within each file. Prefer:

- `kebab-case` for CSS files and asset names
- `camelCase` for JavaScript variables and functions
- `PascalCase` for classes or component-style modules

Choose descriptive names tied to the feature area, such as `reading.js` or `dashboard.css`. If formatting or linting tools are added, run them before opening a PR.

## Testing Guidelines
Place tests under `tests/` or beside the module only if the selected framework expects it. Name tests after the unit they cover, such as `app.test.js` or `reading.spec.js`.

Add tests for new behavior and regressions. If no automated framework exists yet, include clear manual verification steps in the pull request.

## Commit & Pull Request Guidelines
Recent commit history is not available in this workspace, so use short, imperative commit messages that describe the change clearly. Good examples:

- `add reading exercise seed data`
- `improve writing feedback layout`

Pull requests should include a brief summary, impacted areas, test evidence, and screenshots for UI changes. Link the relevant issue or task when one exists.

## Configuration Notes
Do not commit secrets, tokens, or environment-specific credentials. Keep local configuration in ignored files such as `.env` once the project introduces runtime configuration.
