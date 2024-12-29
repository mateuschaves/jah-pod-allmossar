import { Stack } from "expo-router";
import { DefaultTheme } from "./theme/default";
import { ThemeProvider } from "styled-components";
import HomeScreen from "./screens/Home";

export default function RootLayout() {
  return <ThemeProvider theme={DefaultTheme}>
    <Stack screenOptions={{
    headerShown: false,
  }} >
    <HomeScreen />
  </Stack>
  </ThemeProvider>;
}
