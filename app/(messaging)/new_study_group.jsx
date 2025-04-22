import { Stack } from "expo-router";
export default function newStudyGroup() {
  return (
    <>
      <Stack.Screen options={{ title: "New Study Group" }} />
    </>
  );
}