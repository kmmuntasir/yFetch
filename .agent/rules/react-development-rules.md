---
trigger: always_on
---

# React Development Rules

## Tech Stack & Core Patterns

- **Framework**: Use React.js with modern functional components. Avoid class components.
- **Hooks**: Strictly follow [Rules of Hooks](https://react.js.org/docs/hooks-rules.html). Use `useEffect` only when necessary; prefer specialized hooks or state management.
- **Logic Separation**: Extract complex business logic into custom hooks (e.g., `useMovieSearch`, `useAuth`) to keep components focused on UI.
- **Styling**: Prioritize Vanilla CSS. Follow `DESIGN_STARTER_KIT.md`. Avoid ad-hoc inline styles.

## TypeScript & ESM Standards

- **ESM**: Use `import`/`export` syntax exclusively. Avoid `require`.
- **TypeScript**: 
    - Use strict type definitions. Avoid `any`.
    - Prefer `interface` for component props and data models.
    - Annotate functional components with `React.FC` or explicit prop destructuring with types.
- **File Naming**:
    - Components: PascalCase (e.g., `MovieCard.tsx`, `FilterBar.tsx`).
    - Hooks/Utils/Styles: kebab-case (e.g., `use-movie-search.ts`, `api-client.ts`, `main-styles.css`).

## Naming Conventions & Linting

- **Variables/Functions**: camelCase (e.g., `movieData`, `fetchMovies`).
- **Interfaces/Types**: PascalCase (e.g., `MovieResponse`, `UserConfig`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RESULTS`).
- **Boolean Variables**: Prefix with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`).

## No Hardcoding Policy (Strict)

- **Colors & Typography**: NEVER hardcode hex codes or font sizes in components. Use the centralized design tokens defined below or in a theme/constants file.
- **API Endpoints**: Use a centralized `api-config.ts` or environment variables.
- **Magic Numbers**: Define common spacing or timeout values as constants.

## Design Tokens (Mandatory)

### Colors
- **Background**: `#0F0F0F` (App Body)
- **Surface**: `#1A1A1A` (Cards/Panels), `#242424` (Modals/Dropdowns)
- **Accent**: `#6AC045` (Primary), `#58A638` (Hover), `#F5C518` (IMDb Gold)
- **Text**: `#E8E8E8` (Primary), `#888888` (Secondary)

### Typography
- **Font**: `'Inter', sans-serif`
- **H1**: `2.5rem` (Desktop) / `2rem` (Mobile)
- **H2**: `1.5rem`
- **Body**: `1rem` (Primary) / `0.875rem` (Secondary)

### Layout units
- **Grid**: 8px base system.
- **Radius**: `4px` (Small), `8px` (Medium), `12px` (Large).

## Best Practices
- **Performance**: Use `useMemo` and `useCallback` for expensive calculations or to prevent unnecessary re-renders of memoized components.
- **Accessibility**: Use semantic HTML (`<main>`, `<article>`, `<nav>`). Provide `aria-label` for icon-only buttons.
- **Clean Code**: Keep components under 200 lines. If larger, break into sub-components.
