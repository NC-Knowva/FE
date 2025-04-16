import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link, Stack } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const dummyUser = {
  username: "iheartsocio",
  name: "sara",
  avatar_img_url:
    "https://i.pinimg.com/236x/a9/24/01/a924011ac7bbcf9159a7544abb1def06.jpg",
  message: "bvcxb xcbxkjbxcvj ibpxvc gfsdddddd ddddddddd",
  timestamp: "2023-10-04T00:00:00.000Z",
};

function TimeAgo({ timestamp }) {
  const messageTime = Date.parse(timestamp);
  const currentTime = Date.now();

  const timeDifference = currentTime - messageTime;
  const seconds = timeDifference / 1000;

  if (seconds < 20) {
    return (
      <View style={styles.manageMessages}>
        <Text>Just Now</Text>
      </View>
    );
  } else if (seconds < 60) {
    return (
      <View style={styles.manageMessages}>
        <Text>Less than a minute ago</Text>
      </View>
    );
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) {
      return (
        <View style={styles.manageMessages}>
          <Text>1 minute ago</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.manageMessages}>
          <Text>{minutes} minutes ago</Text>
        </View>
      );
    }
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    if (hours === 1) {
      return (
        <View style={styles.manageMessages}>
          <Text>1 hour ago</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.manageMessages}>
          <Text>{hours} hours ago</Text>
        </View>
      );
    }
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    if (days === 1) {
      return (
        <View style={styles.manageMessages}>
          <Text>1 day ago</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.manageMessages}>
          <Text>{days} days ago</Text>
        </View>
      );
    }
  } else {
    const weeks = Math.floor(seconds / 604800);
    if (weeks === 1) {
      return (
        <View style={styles.manageMessages}>
          <Text>1 week ago</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.manageMessages}>
          <Text>{weeks} weeks ago</Text>
        </View>
      );
    }
  }
}

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
          <TimeAgo timestamp={user.timestamp} />
        </View>
      </Pressable>
    </Link>
  );
}

export default function Messaging() {
  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Messaging" }} />
      <View style={styles.messageBar}>
        <Text style={styles.barElement}>All</Text>
        <Text style={styles.barElement}>Friend</Text>
        <Text style={styles.barElement}>Study Groups</Text>
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

      <ChatBox user={dummyUser} />
      <ChatBox user={dummyUser} />
      <ChatBox user={dummyUser} />
      <ChatBox user={dummyUser} />
      <ChatBox user={dummyUser} />
      <ChatBox user={dummyUser} />
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
  time: {
    fontSize: 10,
    // backgroundColor: "grey",
  },
});
