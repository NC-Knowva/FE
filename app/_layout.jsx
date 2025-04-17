import { StyleSheet, Image } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UserProvider, UserContext } from "@/context/User";

// This replaces app.jsx  ==> https://docs.expo.dev/router/basics/core-concepts/

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  function ProfileImage() {
    const { user } = useContext(UserContext);
    return (
      <Image
        style={styles.profileImage}
        source={{ uri: user.avatar_img_url }}
      />
    );
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              headerTitle: "Knowva",
              title: "Aligned Center",
              headerTitleAlign: "center",
              headerStyle: {
                //backgroundColor: "#f4511e",
              },
              //headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
              headerLeft: () => (
                <Image
                  style={styles.logo}
                  source={require("../assets/images/Knowva_Logo.png")}
                />
              ),
              headerRight: () => (
                <Link href="/profile">
                  <ProfileImage />
                </Link>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 65,
    height: 65,
    marginLeft: 3,
  },
  profileImage: {
    width: 53,
    height: 53,
    marginRight: 10,
    marginTop: 2,
    borderRadius: 55 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
});
