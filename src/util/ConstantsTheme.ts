type ThemeCount = {
    count: number,
    isPositive: boolean
}

type TypeTheme = 0 | 1 | 2;

const BACKGROUND_COLOR_LIGHT_THEME = 'var(--light-grayish-orange)';
const COLOR_LIGHT_THEME = 'var(--very-dark-blue)';
const BACKGROUND_SCREEN_LIGHT_THEME = 'var(--white)';
const BACKGROUND_CONTAINER_BUTTONS_LIGHT_THEME = 'var(--grayish-red-toggle)';
const BACKGROUND_COLOR_BUTTON_LIGHT_THEME = 'var(--dark-moderate-cyan)';
const BOX_SHADOW_BUTTON_LIGHT_THEME = 'var(--box-shadow) var(--very-dark-cyan)'

export type {
    ThemeCount,
    TypeTheme
}
export {
    BACKGROUND_COLOR_LIGHT_THEME,
    COLOR_LIGHT_THEME,
    BACKGROUND_SCREEN_LIGHT_THEME,
    BACKGROUND_CONTAINER_BUTTONS_LIGHT_THEME,
    BACKGROUND_COLOR_BUTTON_LIGHT_THEME,
    BOX_SHADOW_BUTTON_LIGHT_THEME
}
