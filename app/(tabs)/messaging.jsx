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
import { getUsers, getStudyGroups } from "../../endpoints";

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
  const [studyGroups, setStudyGroups] = useState([]);

  const[messages, setMessages] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [allUsers, allStudyGroups] = await Promise.all([
          getUsers(),
          getStudyGroups(),
        ]);
        const usersWithType = allUsers.map((user) => ({
          ...user,
          type: "friend",
        }));
        const groupsWithType = allStudyGroups.map((group) => ({
          ...group,
          type: "study_group",
          name: group.study_group,
          username: group.group_id,
        }));
        let combined = [...usersWithType, ...groupsWithType];

        switch (filter) {
          case "friends":
            combined = combined.filter((item) => item.type === "friend");
            break;
          case "study_groups":
            combined = combined.filter((item) => item.type == "study_group");
            break;
          default:
            break;
        }
        combined.sort((a,b) => new Date (b.created_at) - new Date(a.created_at))
       setMessages(combined)
      } catch (error) {
        console.log("There was an error fetching data", error);
      }
    }
    fetchData();
  }, [filter]);

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
            <Text style={styles.barElement}>Friends</Text>
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
          {messages.map((item) => {
            return <ChatBox key={item.username || item.group_id} user={item} />;
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
