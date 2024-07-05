# Problem 2

Demo: https://99tokenexchange.netlify.app/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- NodeJS (>18.0.0)

- pnpm (9.x.x)

### Development

Install dependencies

```
pnpm install
```

And finally just start the application

```
pnpm dev
```

## Built With

- [react.js](https://reactjs.org/) - A JavaScript library for building user interfaces.

- [react-query](https://tanstack.com/query/v4) - React Hooks for Data Fetching

- [mantine](https://mantine.dev/) - A fully featured React Component Library

- [vite](https://vitejs.dev/) - Next Generation Frontend Tooling

- [vitest](https://vitest.dev/) - Next Generation Testing Framework

## Quality

- Linter: `eslint`
- Code Formatter: `prettier`
- Unit test: Covered same logic and UI with `vitest`

% Coverage report from istanbul
------------------|---------|----------|---------|---------|----------------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|----------------------------
All files | 72.94 | 73.68 | 68.57 | 75.6 |
src | 100 | 50 | 100 | 100 |
App.tsx | 100 | 100 | 100 | 100 |
hooks.ts | 100 | 50 | 100 | 100 | 34-43
theme.ts | 100 | 100 | 100 | 100 |
src/components | 94.73 | 100 | 88.88 | 94.73 |
TokenIcon.tsx | 100 | 100 | 100 | 100 |
TokenSelect.tsx | 93.75 | 100 | 85.71 | 93.75 | 72
src/pages/Home | 63.88 | 83.33 | 60 | 63.88 |
index.tsx | 63.88 | 83.33 | 60 | 63.88 | 39-41,45-47,51-54,59,69-75
src/services | 25 | 100 | 14.28 | 33.33 |
token.ts | 25 | 100 | 14.28 | 33.33 | 5-12,16-17
src/testUtils | 100 | 0 | 100 | 100 |
render.tsx | 100 | 0 | 100 | 100 | 30
------------------|---------|----------|---------|---------|----------------------------
