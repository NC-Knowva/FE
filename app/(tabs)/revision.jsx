import { React, useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import ItemsSelect from "@/components/ItemsSelect";
import { getCards } from "../../endpoints";

export default function Revision() {
  const router = useRouter();
  const activities = [
    { name: "Quick Quiz", id: 1 },
    { name: "Card Flipper", id: 2 },
  ];

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getCards()
      .then((topics) => {
        const formattedTopics = topics.map((topic) => {
          return { id: topic.pack_id, name: topic.name };
        });
        setTopics(formattedTopics);
      })
      .catch((error) => {});
  }, []);

  const [activity, setActivity] = useState("");
  const [topic, setTopic] = useState("");

  function playGameSingle() {
    if (activity === "" || topic === "") {
      return null;
    } else {
      switch (activity.name) {
        case "Quick Quiz":
          router.navigate(`../quiz?topic=${topic.name}`);
          break;
        case "Card Flipper":
          router.navigate(`../game?topic=${topic.name}`);
          break;
        case "Another Activity":
          break;
      }
    }
  }
  function playGameMultiple() {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.continueActivity}>
        <View style={styles.continueActivityTitle}>
          <Text style={styles.continueActivityTitle}>Continue Activity</Text>
        </View>
        <View style={styles.continueCards}>
          <Pressable>
            <View style={styles.continueCard}>
              <Text>Arts Quiz</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.continueCard}>
              <Text>Science Card Flipper</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.continueCard}>
              <Text> ... </Text>
            </View>
          </Pressable>
        </View>
        <Pressable>
          <View style={styles.continueActivityMore}>
            <Text>See More</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.newActivity}>
        <Text style={styles.newActivityHeading}>New Activity</Text>

        <Text style={styles.newActivitySubHeading}>Select Activity:</Text>
        <ItemsSelect
          items={activities}
          itemSelected={activity}
          setItemSelected={setActivity}
        />

        <Text style={styles.newActivitySubHeading}>Select Card Pack:</Text>
        <ItemsSelect
          items={topics}
          itemSelected={topic}
          setItemSelected={setTopic}
        />

        <View style={styles.actionRow}>
          <Link href={"../newCard"} asChild>
            <Pressable>
              <View style={styles.actionButton}>
                <Text>Add New Cards</Text>
              </View>
            </Pressable>
          </Link>
          <Pressable>
            <View style={styles.actionButton}>
              <Text>View Your Cards</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.playRow}>
        <Pressable onPress={playGameSingle}>
          <View style={styles.playButtons}>
            <Text style={styles.playText}>Play</Text>
          </View>
        </Pressable>
        <Pressable onPress={playGameMultiple}>
          <View style={styles.playButtons}>
            <Text style={styles.playText}>Challenge a Friend</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  continueActivity: {
    flexDirection: "column",
    backgroundColor: "lightgrey",
    margin: 10,
  },
  continueActivityTitle: {
    textAlign: "center",
    fontSize: 22,
    padding: "5px",
  },
  continueCards: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  continueCard: {
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
  continueActivityMore: {
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
  newActivity: {
    backgroundColor: "lightgrey",
    margin: 10,
  },
  newActivityHeading: {
    textAlign: "center",
    fontSize: 22,
    padding: "5px",
    marginTop: 5,
  },
  newActivitySubHeading: {
    textAlign: "left",
    fontSize: 16,
    padding: "5px",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
  playRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
    marginBottom: 100,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
    height: "auto",
    padding: 1,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  playButtons: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  playText: {
    fontSize: 20,
    textAlign: "center",
  },
});
