import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function FriendChat() {
  const { username } = useLocalSearchParams();
  console.log(username);
  return (
    <ScrollView>
      <Stack.Screen options={{ title: username }} />
      <View>
        <Text>Username: {username}</Text>
      </View>
    </ScrollView>
  );
}
