import { ThemeProvider } from 'next-themes';

export const ColorModeProvider = (props) => (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
);
