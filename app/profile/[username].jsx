import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Link, Stack, Redirect } from "expo-router";

import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/User";
import { useLocalSearchParams } from "expo-router";
import { getUserByUsername } from "../../endpoints";

export default function FriendProfile() {
  const { user } = useContext(UserContext);
  const { username } = useLocalSearchParams();
  const [friendUser, setFriendUsers] = useState([]);

  if (user.username === username) {
    return <Redirect href="../profile" />;
  } else {
    useEffect(() => {
      getUserByUsername(username)
        .then((friendUser) => {
          setFriendUsers(friendUser);
        })
        .catch((error) => {});
    }, []);

    console.log(friendUser);
    return (
      <ScrollView>
        <Stack.Screen options={{ title: "Profile" }} />
        <View style={styles.info}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: friendUser.avatar_img_url }}
              />
            </View>
            <View style={styles.userContainer}>
              <View style={styles.row}>
                <View style={styles.username}>
                  <Text style={styles.usernameText}>{friendUser.name}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Link href="../topics" asChild>
                  <Pressable>
                    <Text style={styles.elementStats}>10 Topics</Text>
                  </Pressable>
                </Link>

                <Link href="../messaging?filter=friends" asChild>
                  <Pressable>
                    <Text style={styles.elementStats}>200 Friends</Text>
                  </Pressable>
                </Link>

                <Link href="../messaging?filter=groups" asChild>
                  <Pressable>
                    <Text style={styles.elementStats}>2 Study Groups</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.elementUsername}>@{friendUser.username}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Link style={styles.button} href="./profile/add_Friend" asChild>
              <Pressable>
                <Text>Add Friend</Text>
              </Pressable>
            </Link>

            <Link style={styles.redButton} href="./profile/report" asChild>
              <Pressable>
                <Text style={styles.redButtonText}>Report</Text>
              </Pressable>
            </Link>

            <Link style={styles.redButton} href="./profile/block" asChild>
              <Pressable>
                <Text style={styles.redButtonText}>Block</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.groupContainer}>
            <Text style={styles.sectionTitle}>Study Groups:</Text>
            <View style={styles.sectionGrid}>
              <Text style={styles.sectionElement}>Subject</Text>
              <Text style={styles.sectionElement}>Subject</Text>
              <Text style={styles.sectionElement}>Subject</Text>
            </View>
          </View>

          <View style={styles.groupContainer}>
            <Text style={styles.sectionTitle}>My Cards:</Text>
            <View style={styles.sectionGrid}>
              <Text style={styles.sectionElement}>Subject</Text>
              <Text style={styles.sectionElement}>Subject</Text>
              <Text style={styles.sectionElement}>Subject</Text>
              <Text style={styles.sectionElement}>Subject</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
  },
  imageContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: "top",
    justifyContent: "top",
  },
  userContainer: {
    flex: 1,
    flexGrow: 2,
    alignItems: "top",
    justifyContent: "top",
  },
  groupContainer: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
  },
  row: {
    flexDirection: "row",
    height: "auto",
  },
  buttonRow: {
    flexDirection: "row",
    height: "auto",
    justifyContent: "center",
  },
  username: {
    borderColor: "#fff",
    borderWidth: 1,
    flexGrow: 3,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameText: {
    alignItems: "left",
    height: "auto",
    padding: "20px",
  },
  image: {
    width: "auto",
    height: 200,
    objectFit: "contain",
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
    height: "auto",
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  redButton: {
    backgroundColor: "red",
    alignItems: "center",
    margin: 10,
    height: "auto",
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  redButtonText: { color: "white" },
  elementStats: {
    backgroundColor: "white",
    margin: 5,
    padding: 5,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: 80,
    textAlign: "center",
  },
  sectionElement: {
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
  sectionTitle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionGrid: {
    padding: 5,
  },
});
