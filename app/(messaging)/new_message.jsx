import { Stack, useLocalSearchParams, router, Link } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const dummyUser = {
  username: "your_fav_ai",
  name: "Conner",
  avatar_img_url:
    "https://www.gamebyte.com/wp-content/uploads/2019/07/Detroit_Become_Human_Connor_3.jpg",
  education: "A-level",
  settings: {},
  calendar: {},
  created_at: "2023-10-01T00:00:00.000Z",
};

function ChatBox({ user }) {
  return (
    <Link href={`../(messaging)/${user.username}`} asChild>
      <Pressable>
        <View style={styles.chatCard}>
          <Image
            style={styles.chatCardImage}
            source={{ uri: user.avatar_img_url }}
          />
          <View style={styles.messageInfo}>
            <Text style={styles.friendName}>{user.name}</Text>
            <Text style={styles.friendUsername}>@{user.username}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export default function NewMessage() {
  const { search } = useLocalSearchParams();
  const [searchText, onChangeText] = useState(search);

  function handleChangeText(event) {
    onChangeText(event);
    router.setParams({ search: event });
  }

  return (
    <>
      <Stack.Screen options={{ title: "New Message" }} />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={searchText}
          placeholder="Search"
        />
      </View>
      <View>
        <Link href={`../(messaging)/new_study_group`} asChild>
          <Pressable>
            <View style={styles.studyCard}>
              <MaterialIcons name="groups" size={40} style={styles.groupIcon} />
              <Text style={styles.studyGroup}>Create a new study group</Text>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </Pressable>
        </Link>
      </View>
      <View>
        <Text style={styles.suggested}>Suggested</Text>
        <View style={styles.friendMessages}>
          <ChatBox user={dummyUser} />
          <ChatBox user={dummyUser} />
          <ChatBox user={dummyUser} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  chatCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "lightgrey",
  },
  studyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
    backgroundColor: "lightgrey",
  },
  chatCardImage: {
    flex: 1,
    margin: 5,
    width: 60,
    height: 60,
  },
  messageInfo: {
    paddingLeft: 2,
    flex: 5,
    flexDirection: "column",
  },
  friendName: {
    paddingTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  friendUsername: {
    paddingLeft: 2,
    fontSize: 13,
  },
  friendMessages: {
    paddingBottom: 50,
  },
  suggested: {
    fontWeight: "bold",
    margin: 10,
    fontSize: 17,
  },
  groupIcon: {
    padding: 5
  },
  studyGroup: {
    flex: 1,
    textAlign: "center",
  },
});
