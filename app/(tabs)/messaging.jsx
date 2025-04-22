import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import TimeAgo from "@/components/TimeAgo";
import { getUsers } from "../../endpoints";

const dummyUser = {
  username: "iheartsocio",
  name: "sara",
  avatar_img_url:
    "https://i.pinimg.com/236x/a9/24/01/a924011ac7bbcf9159a7544abb1def06.jpg",
  message: "bvcxb xcbxkjbxcvj ibpxvc gfsdddddd ddddddddd",
  created_at: "2023-10-04T00:00:00.000Z",
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
            <Text numberOfLines={1} style={styles.friendMessage}>
              {user.message}
            </Text>
          </View>
          <TimeAgo created_at={user.created_at} />
        </View>
      </Pressable>
    </Link>
  );
}

export default function Messaging() {
  const { filter } = useLocalSearchParams();
  const [filterChats, onFilterChats] = useState(filter);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {});
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <Stack.Screen options={{ title: "Messaging" }} />
        <View style={styles.messageBar}>
          <Pressable
            onPress={() => {
              router.setParams({ filter: "all" });
            }}
          >
            <Text style={styles.barElement}>All</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.setParams({ filter: "friends" });
            }}
          >
            <Text style={styles.barElement}>Friend</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.setParams({ filter: "study_groups" });
            }}
          >
            <Text style={styles.barElement}>Study Groups</Text>
          </Pressable>
          <Link style={styles.button} href="../(messaging)/new_message" asChild>
            <Pressable>
              <Entypo
                style={styles.barElement}
                name="new-message"
                size={24}
                color="black"
              />
            </Pressable>
          </Link>
        </View>

        <View style={styles.manageMessages}>
          <Text style={styles.manageMessagesText}>Messages:</Text>
          <Link href="../(messaging)/friend_request" asChild>
            <Pressable>
              <Text style={styles.manageMessagesLink}>Manage Requests</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.friendMessages}>
          {users.map((user) => {
            return <ChatBox user={user} />;
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageBar: {
    flexDirection: "row",
    height: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
  barElement: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 5,
    height: "auto",
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  manageMessages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    margin: 10,
    // borderWidth: 1,
  },
  manageMessagesText: {
    fontSize: 18,
  },
  manageMessagesLink: {
    color: "blue",
    fontSize: 16,
  },
  chatCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "lightgrey",
  },
  chatCardImage: {
    flex: 1,
    margin: 5,
    width: 60,
    height: 60,
    // objectFit: "contain",
  },
  messageInfo: {
    paddingLeft: 2,
    flex: 5,
    flexDirection: "column",
    // borderWidth: 1,
  },
  messageTime: {
    alignItems: "center",
    margin: 5,
    fontSize: 10,
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
  friendMessage: {
    paddingTop: 7,
  },
  friendMessages: {
    paddingBottom: 50,
  },
});
