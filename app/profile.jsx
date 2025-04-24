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
import { getCards, getStudyGroups, getSubjects } from "@/endpoints";

function CardBox({ card }) {
  const { name, education_id, description } = card;
  return (
    <View style={styles.sectionElement}>
      <Text style={styles.studyName}>{name}</Text>
      <Text>
        <Text style={styles.label}>Eduction level: </Text>
        <Text style={{ color: "dimgrey" }}>{education_id}</Text>
      </Text>
      <Text>
        <Text style={styles.label}>Description: </Text>
        <Text style={{ color: "dimgrey" }}>{description}</Text>
      </Text>
    </View>
  );
}

function StudyGroupBox({ studyGroup, subject }) {
  const { study_group, avatar_img_url } = studyGroup;
  return (
    <View style={styles.sectionElement}>
      <View style={styles.row}>
        <View style={styles.chatImageContainer}>
          <Image
            style={styles.chatCardImage}
            source={{ uri: avatar_img_url }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.studyName}>{study_group}</Text>
          <Text>
            <Text style={styles.label}>Subject: </Text>
            <Text style={{ color: "dimgrey" }}>{subject.subject_name}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Education Level: </Text>
            <Text style={{ color: "dimgrey" }}>{subject.education_id}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const { user, setUser } = useContext(UserContext);
  const [userCards, setUserCards] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allCards, allStudyGroups, allSubjects] = await Promise.all([
          getCards(),
          getStudyGroups(),
          getSubjects(),
        ]);
        setUserCards(allCards);
        setStudyGroups(allStudyGroups);
        setSubjects(allSubjects);
      } catch (error) {
        console.log("There was an error fetching data", error);
      }
    }
    fetchData();
  }, []);

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
                  <Text style={styles.usernameText}>
                    Welcome back {user.name}!{" "}
                  </Text>
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

          <View style={styles.usernameRow}>
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
              {studyGroups.map((studyGroup) => {
                const subject = subjects.find(
                  (subject) => subject.subject_id === studyGroup.subject_id
                );
                return (
                  <StudyGroupBox
                    key={studyGroup.group_id}
                    studyGroup={studyGroup}
                    subject={subject}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.groupContainer}>
            <Text style={styles.sectionTitle}>My Cards:</Text>
            <View style={styles.sectionGrid}>
              {userCards.map((userCard) => {
                return <CardBox key={userCard.pack_id} card={userCard} />;
              })}
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameRow: {
    flexDirection: "row",
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    height: "auto",
    justifyContent: "center",
  },
  username: {
    flexGrow: 3,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    flexShrink: 1,
    maxWidth: "80%",
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
    alignItems: "flex-start",
    margin: 5,
    height: "auto",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "lightblue",
  },
  sectionTitle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionGrid: {
    justifyContent: "center",
    padding: 5,
    gap: 10,
  },
  elementUsername: {
    color: "dimgrey",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  chatCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatImageContainer: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    minWidth: 0,
  },
  studyName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    color: "dimgrey",
  },
});
