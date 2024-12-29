import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
        backgroundSuccess: string;
        backgroundDanger: string;
        textHighlight: string;
    };
  }
}
