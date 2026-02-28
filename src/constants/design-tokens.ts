// ── Color Tokens ──

// Base
export const BG_BODY = '#0F0F0F';
export const SURFACE_1 = '#1A1A1A';
export const SURFACE_2 = '#242424';
export const SURFACE_HOVER = '#2A2A2A';

// Text
export const TEXT_PRIMARY = '#E8E8E8';
export const TEXT_SECONDARY = '#888888';
export const TEXT_DISABLED = '#4A4A4A';

// Accent & Semantic
export const ACCENT_PRIMARY = '#6AC045';
export const ACCENT_HOVER = '#58A638';
export const IMDB_GOLD = '#F5C518';
export const ERROR = '#EF4444';

// ── Spacing (px) ──
export const SPACING = {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
} as const;

// ── Border Radius ──
export const RADIUS = {
    sm: '4px',
    md: '8px',
    lg: '12px',
    pill: '24px',
} as const;

// ── Shadows ──
export const SHADOW = {
    level1: '0 4px 12px rgba(0, 0, 0, 0.3)',
    level2: '0 8px 24px rgba(0, 0, 0, 0.5)',
    level3: '0 24px 48px rgba(0, 0, 0, 0.8)',
} as const;

// ── Typography ──
export const FONT_FAMILY = "'Inter', sans-serif";

export const FONT_SIZE = {
    h1Desktop: '2.5rem',
    h1Mobile: '2rem',
    h2: '1.5rem',
    h3: '1.125rem',
    body: '1rem',
    bodySecondary: '0.875rem',
    caption: '0.75rem',
} as const;

export const FONT_WEIGHT = {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
} as const;
