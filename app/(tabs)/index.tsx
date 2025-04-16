import { View, Text, StyleSheet } from "react-native";
import { createContext, useContext, useState } from "react";
import { Redirect } from "expo-router";
import { UserContext } from "../../context/User";

export default function HomeScreen() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  if (user) {
    return (
      <View>
        <Text>Home</Text>
        <Text>Username: {user.username}</Text>
        <Text>User Name: {user.name}</Text>
      </View>
    );
  } else {
    return <Redirect href="../loginUser" />;
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
