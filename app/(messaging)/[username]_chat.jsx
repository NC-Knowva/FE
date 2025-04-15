import { Stack } from "expo-router";
export default function FriendChat(username) {
  return (
    <>
      <Stack.Screen options={{ title: username }} />
    </>
  );
}
