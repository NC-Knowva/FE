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
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);

const dummyUser = {
  username: "iheartsocio",
  name: "sara",
  avatar_img_url:
    "https://i.pinimg.com/236x/a9/24/01/a924011ac7bbcf9159a7544abb1def06.jpg",
  message: "bvcxb xcbxkjbxcvj ibpxvc gfsdddddd ddddddddd",
  timestamp: "April 15, 2025 16:08:30 GMT+01:00",
};

function chatBox() {
  const messageTime = new Date(dummyUser.timestamp);
  return (
    <Link href={`../(messaging)/[${dummyUser.username}]_chat`} asChild>
      <View style={styles.chatCard}>
        <Image
          style={styles.chatCardImage}
          source={{ uri: dummyUser.avatar_img_url }}
        />
        <View style={styles.messageInfo}>
          <Text style={styles.friendName}>{dummyUser.name}</Text>
          <Text style={styles.friendUsername}>@{dummyUser.username}</Text>
          <Text numberOfLines={1} style={styles.friendMessage}>
            {dummyUser.message}
          </Text>
        </View>
        <ReactTimeAgo
          style={styles.messageTime}
          date={messageTime}
          locale="en-UK"
        />
      </View>
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

      {chatBox()}
      {chatBox()}
      {chatBox()}
      {chatBox()}
      {chatBox()}
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
