import { createContext, useContext } from "react";

export const defaultTheme = Object.freeze({
    color: {
        primary: 'red',
        secondary: 'blue',
        text: {
            primary: 'black',
            secondary: 'white',
        }
    },
    typography: {
        heading: {
            lg: 4,
            md: 3,
            sm: 2,
        },
        body: {
            xl: 3,
            lg: 2,
            md: 1.5,
            sm: 1,
            xs: 0.8,
        }
    }
});

type Theme = typeof defaultTheme;

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeContextProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);

export type { Theme };