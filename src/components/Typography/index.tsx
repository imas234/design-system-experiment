import {Theme, useTheme } from '../../theme/ThemeContext';
import Box from '@mui/material/Box';

type ThemeTypography = Theme['typography'];
export type ThemeTextColor = keyof Theme['color']['text'];

type BodyTypography = 'body';
type HeadingTypography = 'heading';

type TypographyType = BodyTypography | HeadingTypography;

export type BodySize = keyof Theme['typography']['body'];
export type HeadingSize = keyof Theme['typography']['heading'];

interface TypographyTextPropsBase {
    children: string;
    color?: ThemeTextColor;
}

type SizeProp =
| {
    type: 'body',
    size: BodySize,
}
| {
    type: 'heading',
    size: HeadingSize,
}

export type TypographyTextProps = TypographyTextPropsBase & SizeProp;

const evalSize = (type: TypographyType, size: string, theme: ThemeTypography) => {
    switch (type) {
        case 'body':
            switch (size as BodySize) {
                case 'xs':
                case 'sm':
                case 'md':
                case 'lg':
                case 'xl':
                    return theme[type][size as BodySize];
                default:
                    return theme['body']['md'];
            }
        case 'heading':
            switch (size as HeadingSize) {
                case 'sm':
                case 'md':
                case 'lg':
                    return theme[type][size as HeadingSize];
                default:
                    return theme['heading']['md'];
            }
    }
}

export const Text = ({children, color = 'primary', type, size}: TypographyTextProps) => {
    const theme = useTheme();

    const fontSize = evalSize(type, size, theme.typography);
    const fontWeight = type === 'heading' ? 800 : 400;

    const style = {color: theme.color.text[color], fontSize: `${fontSize}rem`, fontWeight: fontWeight};

    return (
        <Box sx={style}>
            {children}
        </Box>
    );
}