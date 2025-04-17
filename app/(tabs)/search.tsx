import { useState } from "react";
import { StyleSheet, TextInput, Text, Image, View } from "react-native";
import {
  Link,
  Stack,
  Redirect,
  router,
  useLocalSearchParams,
} from "expo-router";

function CardPack({ card }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeading}>{card.name}</Text>
      <Text style={styles.cardUser}>@{card.username}</Text>
      <View style={styles.cardStats}>
        <Text>Topic: {card.topic}</Text>
        <Text>Level: {card.education}</Text>
      </View>
      <Text> </Text>
      <Text>{card.description}</Text>
    </View>
  );
}

function User({ user }) {
  const joined = new Date(user.created_at);
  return (
    <Link href={`../profile/${user.username}`} asChild>
      <View style={styles.card}>
        <Text style={styles.cardHeading}>@{user.username}</Text>
        <View style={styles.userStats}>
          <Image style={styles.image} source={{ uri: user.avatar_img_url }} />
          <View style={styles.userData}>
            <Text>Level: {user.education}</Text>
            <Text>
              Joined: {joined.getDate()}/{joined.getMonth()}/
              {joined.getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

function StudyGroup({ studyGroup }) {
  const joined = new Date(studyGroup.created_at);
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeading}>{studyGroup.study_group}</Text>
      <View style={styles.userStats}>
        <Image
          style={styles.image}
          source={{ uri: studyGroup.avatar_img_url }}
        />
        <View style={styles.userData}>
          <Text>{studyGroup.users.length} Members</Text>
          <Text>Topic: {studyGroup.topic_id}</Text>
          <Text>
            Created: {joined.getDate()}/{joined.getMonth()}/
            {joined.getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function TabTwoScreen() {
  const { search } = useLocalSearchParams();
  const [searchText, onChangeText] = useState(search);
  const data = {
    card: {
      username: "aclaricoats0",
      topic: "topic 1",
      name: "Topic 1 Card Pack",
      description:
        "A set of study cards for topic 1 covering fundamental concepts.",
      education: "2",
      visibility: true,
      questions: [
        {
          Q1: "Question 1 for topic 1",
          A1: "Answer 1 for topic 1",
        },
        {
          Q2: "Question 2 for topic 1",
          A2: "Answer 2 for topic 1",
        },
        {
          Q3: "Question 3 for topic 1",
          A3: "Answer 3 for topic 1",
        },
      ],
    },
    user: [
      {
        username: "aclaricoats0",
        name: "Addia Claricoats",
        avatar_img_url:
          "https://robohash.org/verodoloremfuga.png?size=50x50&set=set1",
        education: "1",
        settings: {},
        calendar: {},
        created_at: "2023-05-01T00:00:00.000Z",
      },
      {
        username: "iheartsocio",
        name: "Addia Claricoats",
        avatar_img_url:
          "https://robohash.org/verodoloremfuga.png?size=50x50&set=set1",
        education: "1",
        settings: {},
        calendar: {},
        created_at: "2023-05-01T00:00:00.000Z",
      },
    ],
    studyGroup: {
      study_group: "Colobus",
      admins: ["eforgan9"],
      users: [
        "tfolbigg3",
        "lgurrado4",
        "acranham7",
        "eforgan9",
        "ktrevaskiss6",
        "ogladyer1",
        "egirardini5",
        "ggrishinov2",
      ],
      topic_id: 6,
      avatar_img_url:
        "https://robohash.org/voluptateestmagnam.png?size=50x50&set=set1",
      created_at: "2023-10-04T00:00:00.000Z",
    },
  };

  function handleChangeText(event) {
    onChangeText(event);
    router.setParams({ search: event });
  }

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={searchText}
          placeholder="Search"
        />
      </View>
      <View style={styles.selectRow}>
        <CardPack card={data.card} />
        <CardPack card={data.card} />
      </View>
      <View style={styles.selectRow}>
        <User user={data.user[0]} />
        <User user={data.user[1]} />
      </View>
      <View style={styles.selectRow}>
        <StudyGroup studyGroup={data.studyGroup} />
        <StudyGroup studyGroup={data.studyGroup} />
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
  selectRow: { flexDirection: "row", justifyContent: "space-evenly" },
  card: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    margin: 5,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  cardHeading: {
    fontWeight: "bold",
  },
  cardUser: {
    textAlign: "left",
    color: "darkgrey",
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: { width: 30, height: 30, objectFit: "contain", flex: 1 },

  userStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserData: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
