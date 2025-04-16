import { React, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

function RowMap({ rowItems, setItemSelected, i }) {
  return (
    <>
      <View style={styles.selectRow}>
        {rowItems.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                setItemSelected(item);
              }}
            >
              {({ pressed }) => (
                <View style={pressed ? styles.cardPressed : styles.card}>
                  <Text>{item}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
function ItemsMap({ items, setItemSelected }) {
  const rowArray = [];
  for (let i = 0; i < items.length; i = i + 3) {
    const rowItems = [items[i], items[i + 1], items[i + 2]];

    rowArray.push(rowItems);
  }
  return rowArray.map((row, i) => {
    return <RowMap rowItems={row} setItemSelected={setItemSelected} i={i} />;
  });
}

export default function Revision() {
  const activities = [
    "Revision Cards",
    "Card Flipper",
    "Another Game",
    "Another Game",
    "Another Game",
    "Another Game",
  ];
  const topics = [
    "Arts",
    "Science",
    "Another Topic",
    "Another Topic",
    "Another Topic",
    "Another Topic",
  ];

  const [activity, setActivity] = useState("");
  const [topic, setTopic] = useState("");
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
        <ItemsMap items={activities} setItemSelected={setActivity} />

        <Text style={styles.newActivitySubHeading}>Select Card Pack:</Text>
        <ItemsMap items={activities} setItemSelected={setTopic} />

        <View style={styles.actionRow}>
          <Pressable>
            <View style={styles.actionButton}>
              <Text>Add New Cards</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.actionButton}>
              <Text>View Your Cards</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable>
          <View style={styles.playButtons}>
            <Text style={styles.playText}>Play</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.playButtons}>
            <Text style={styles.playText}>Challenge a Friend</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Text>Activity: {activity}</Text>
        <Text>Topic: {topic}</Text>
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
    marginTop: 10,
  },
  selectRow: { flexDirection: "row", justifyContent: "space-evenly" },
  card: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
    height: "auto",
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  cardPressed: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
    height: "auto",
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
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
