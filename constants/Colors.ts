/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    container: 'lightgrey',
    scoreContainer: 'white',
    scoreBorder: 'lightblue',
    friendContainer: 'linen',
    button: 'white',
    buttonBorder: 'grey',
    examButton: 'white',
    examContainer: 'lightblue',
    date: 'dimgrey',
    username: 'dimgrey',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    container: '#1c1e21',
    scoreContainer: '#222',
    scoreBorder: '#4779a3',
    friendContainer: '#2a2d31',
    button: '#222',
    buttonBorder: '#555',
    examButton: '#2a2d31',
    examContainer: '#355674',
    date: '#ccc',
    username: '#aaa',
  },
};
