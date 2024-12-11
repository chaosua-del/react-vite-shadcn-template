# REACT - VITE - SHADCN

## Development

pmpm install
pnpm run dev

## Production

pnpm install
npm run build
npm run start

## Project structure

Project structure is based on Bulletproof React architecture [Read More](https://github.com/alan2207/bulletproof-react)

### Import restrictions

- app <- shared
- app <- features
- features <- shared
- avoid using barrel(`index.ts`) files

### Environmental variables

Environmental variables are validated using `src/utils/env.ts`.
Avoid using `import.meta.env` directly.

## Libraries

- UI - ShadCN, Tailwind
- API - axios, react-query
- Global storage - zustand
