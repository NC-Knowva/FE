import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { Redirect, Link } from "expo-router";
import { UserContext } from "../../context/User";
import TimeAgo from "@/components/TimeAgo";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  getUserByUsername,
  getMessagesByUsername,
  getScores,
} from "@/endpoints";

//get scoreboard

const dummyScores = {
  username: "iheartsocio",
  game_type: "quiz",
  game_name: "Brain Sum Blitz",
  topic: "Normal Distribution and Missing Parameters",
  subject: "Maths",
  score: { correct: 9, incorrect: 1, time: 95 },
};

// get scoreboard

function GameScores({ scoreboard }) {
  //will also need a api call to api/games to get the game_name, subject_name and topic_name join on game_id
  //could also use to get the game name in the friends section
  const { score, game_name, topic, subject } = scoreboard;
  //const {game_name, subject_name, topic_name} = games
  // if(scoreboard.game_id === games_game_id)
  const scorePercentage =
    (score.correct / (score.correct + score.incorrect)) * 100;
  return (
    <View style={styles.row}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{scorePercentage}%</Text>
      </View>
      <View style={styles.activityInfoContainer}>
        <Text style={styles.friendName}>{game_name}</Text>
        <Text>{subject}</Text>
        <Text style={styles.friendUsername}>{topic}</Text>
      </View>
    </View>
  );
}

function FriendActivity({ user, created_at }) {
  const { avatar_img_url, name, username } = user;
  return (
    <View style={styles.row}>
      <View style={styles.friendImageContainer}>
        <Image
          style={styles.friendAvatarImage}
          source={{ uri: avatar_img_url }}
        />
      </View>
      <View style={styles.activityInfoContainer}>
        <TimeAgo created_at={created_at} />
        <Text>
          <Text style={styles.friendName}>{name} </Text>
          <Text>sent a message</Text>
        </Text>
        <Text style={styles.friendUsername}>@{username}</Text>
      </View>
    </View>
  );
}

function FriendGameActivity({ scoreboard, user }) {
  const { score, username, created_at } = scoreboard;
  const { avatar_img_url, name } = user;
  const scorePercentage =
    (score.correct / (score.correct + score.incorrect)) * 100;
  return (
    <View style={styles.row}>
      <View style={styles.friendImageContainer}>
        <Image
          style={styles.friendAvatarImage}
          source={{ uri: avatar_img_url }}
        />
      </View>
      <View style={styles.activityInfoContainer}>
        <TimeAgo created_at={created_at} />
        <Text>
          <Text style={styles.friendName}>{name} </Text>
          <Text>scored {scorePercentage}% in a game</Text>
        </Text>
        <Text style={styles.friendUsername}>@{username}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { user, setUser } = useContext(UserContext);
  const [friendUser, setFriendUser] = useState(null);
  const [friendActivities, setFriendActivities] = useState([]);
  const [friendMessages, setFriendMessages] = useState([]);

  useEffect(() => {
    async function fetchFriendData() {
      try {
        const scoreboard = await getScores();

        const gameActivities = await Promise.all(
          scoreboard.map(async (scores) => {
            try {
              if (scores.username !== user.username) {
                const friend = await getUserByUsername(scores.username);

                return {
                  type: "game",
                  created_at: scores.created_at,
                  user: friend,
                  scores: scores,
                };
              }
            } catch (error) {
              console.log("Error fetching friend", error);
              return null;
            }
          })
        );

        const messages = await getMessagesByUsername(user.username);

        const messageActivities = await Promise.all(
          messages.map(async (msg) => {
            try {
              const sender = await getUserByUsername(msg.sender_username);
              if (msg.sender_username !== user.username)
                return {
                  type: "message",
                  created_at: msg.created_at,
                  user: sender,
                };
            } catch (error) {
              console.log("Error fetching sender:", error);
              return null;
            }
          })
        );

        const activities = [
          ...gameActivities.filter(Boolean),
          ...messageActivities.filter(Boolean),
        ];

        setFriendMessages(messages);
        setFriendActivities(activities);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    }

    if (user?.username) {
      fetchFriendData();
    }
  }, [user]);

  // const containerBg = useThemeColor({}, "container");
  // const scoreBg = useThemeColor({}, "scoreContainer");
  // const scoreBorder = useThemeColor({}, "scoreBorder");
  // const friendBg = useThemeColor({}, "friendContainer");
  // const textColor = useThemeColor({}, "text");
  // const usernameColor = useThemeColor({}, "username");
  // const buttonBg = useThemeColor({}, "button");
  // const buttonBorder = useThemeColor({}, "buttonBorder");
  // const examButtonBg = useThemeColor({}, "examButton");
  // const examContainerBg = useThemeColor({}, "examContainer");
  // const dateColor = useThemeColor({}, "date");

  if (user) {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.title}>Daily Revision Progress</Text>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/percentageLoading.png")}
                />
              </View>

              <View style={styles.activityInfoContainer}>
                <Text style={styles.activityInfo}>Activity Information:</Text>
                {/* scoreboard or not MVP and combined totals for each subject */}
                {[
                  { key: "History 15%" },
                  { key: "French 87%" },
                  { key: "Chemistry 54%" },
                ].map((item, index) => (
                  <Text key={index}>{`\u2022 ${item.key}`}</Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Link href="/revision" asChild>
              <Pressable>
                <Text style={styles.title}>Play again</Text>
                <GameScores scoreboard={dummyScores} />
              </Pressable>
            </Link>
            <Link style={styles.button} href="/revision" asChild>
              <Pressable>
                <Text>Play a new game</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.exams}>
            <Link style={styles.examContainer} href="/calendar" asChild>
              {/* Not MVP - calendar data */}
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Art </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Impressionism II</Text>
                    <Text> 5 days away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 21st April at 9:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
            <Link style={styles.examContainer} href="/calendar" asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Maths </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Number Theory I</Text>
                    <Text> 6 days away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 22st April at 9:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
            <Link style={styles.examContainer} href="/calendar" asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.examButton}>
                    <Text>Chemistry </Text>
                  </View>
                  <View style={styles.column}>
                    <Text>Alkenes</Text>
                    <Text> 3 weeks away</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}> 7th May at 10:00am</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>

          <View style={styles.friendActivityContainer}>
            <Text style={styles.title}>Friend Activity</Text>
            {[...friendActivities]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((activity, index) => (
                <View key={index} style={styles.friendContainer}>
                  {activity.type === "game" ? (
                    <FriendGameActivity
                      scoreboard={activity.scores}
                      user={activity.user}
                    />
                  ) : activity.type === "message" ? (
                    <FriendActivity
                      user={activity.user}
                      created_at={activity.created_at}
                    />
                  ) : null}
                </View>
              ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return <Redirect href="../loginUser" />;
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  stepContainer: {
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightgrey",
    paddingVertical: 10,
    width: "100%",
  },
  scoreContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 40,
    borderColor: "lightblue",
    borderWidth: 4,
    marginLeft: 20,
  },
  friendContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 4,
    backgroundColor: "linen",
    padding: 6,
    borderRadius: 5,
    width: "90%",
    maxWidth: 600,
  },
  friendActivityContainer: {
    backgroundColor: "lightgrey",
    paddingTop: 10,
    paddingBottom: 60,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  exams: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
  },
  friendImageContainer: {
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  activityInfo: {
    fontSize: 16,
    paddingBottom: 5,
  },
  activityInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  subjectButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: 100,
    height: 80,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  examButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  examContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
    width: "90%",
    maxWidth: 600,
  },
  date: {
    color: "dimgrey",
    fontSize: 12,
    textAlign: "center",
    padding: 10,
  },
  dateContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  friendAvatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  friendName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  friendUsername: {
    fontSize: 13,
    color: "dimgrey",
  },
});
