import { createMuiTheme } from '@material-ui/core';
import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import { blue } from '@material-ui/core/colors';

interface RawManguruTheme {
    test: string;
}

type ManguruThemeOptions = RawManguruTheme & ThemeOptions;
export type ManguruTheme = RawManguruTheme & Theme;

// TODO real theme
const theme: ManguruThemeOptions = {
    palette: {
        primary: blue,
    },
    test: 'blblb',
};

export default createMuiTheme(theme);
