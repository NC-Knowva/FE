import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Link, Stack, Redirect } from "expo-router";
import { UserContext } from "../context/User";
import { React, useContext, useState, useEffect } from "react";

export default function App() {
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return (
      <ScrollView>
        <Stack.Screen options={{ title: "Profile" }} />
        <View style={styles.info}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: user.avatar_img_url }}
              />
            </View>
            <View style={styles.userContainer}>
              <View style={styles.row}>
                <View style={styles.username}>
                  <Text style={styles.usernameText}>Welcome back {user.name}! </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Link href="./profile/myCards" asChild>
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
            <Text style={styles.elementUsername}>@{user.username}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Link style={styles.button} href="./profile/edit_profile" asChild>
              <Pressable>
                <Text>Edit Profile</Text>
              </Pressable>
            </Link>

            <Link style={styles.button} href="./profile/settings" asChild>
              <Pressable>
                <Text>Settings</Text>
              </Pressable>
            </Link>

            <Link style={styles.button} href="../loginUser" asChild>
              <Pressable
                onPress={() => {
                  setUser(0);
                }}
              >
                <Text>Log out</Text>
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
  } else {
    return <Redirect href="../loginUser" />;
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "linen",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    // borderColor: "black",
    // borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    // backgroundColor: "linen"
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
    flex: "wrap",
    textAlign: "center",
    height: "auto",
    padding: 10,
    fontWeight: "bold",
    fontSize: 30
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    
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
  elementUsername: {
    color: "dimgrey",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold"
  }
});
