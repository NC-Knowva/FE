import { React, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import questionMark from "../assets/images/question-mark.png";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function ImageList({ shuffledCards, cards }) {
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);
  const [displayCard, setDisplayCard] = useState([]);
  const [CardSide, setCardSide] = useState(shuffledCards.map(() => false));

  const [isGameOver, setIsGameOver] = useState(false);
  const [flag, setFlag] = useState(false);

  function handleReset(
    setSelectedCard,
    setMatchedCard,
    setDisplayCard,
    setCardSide,
    setIsGameOver,
    setFlag
  ) {
    setSelectedCard([]);
    setMatchedCard([]);
    setDisplayCard([]);
    setCardSide(shuffledCards.map(() => false));
    setIsGameOver(false);
    setFlag(false);
  }

  const toggleFlag = () => {
    setFlag((previousState) => !previousState);
  };

  const turnCard = (name, index) => {
    const selected = selectedCard.find((item) => item.index === index);

    if (!selected && selectedCard.length < 2)
      setSelectedCard((prev) => [...prev, { name, index }]);
    else if (selectedCard.length === 2) setSelectedCard([{ name, index }]);
  };

  useEffect(() => {
    if (
      selectedCard.length === 2 &&
      selectedCard[0].name[1] === selectedCard[1].name[1] &&
      selectedCard[0].name[0] !== selectedCard[1].name[0]
    )
      setMatchedCard((prev) => [...prev, ...selectedCard]);
    else if (selectedCard.length === 2) {
      CardSide[selectedCard[0].index] = false;
      CardSide[selectedCard[1].index] = false;
      setTimeout(() => {
        toggleFlag();
      }, 500);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (shuffledCards.length && shuffledCards.length === matchedCard.length)
      setIsGameOver(true);
  }, [matchedCard]);

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <View style={styles.Wrapper}>
          <Text style={{ fontWeight: "500", fontSize: 16, color: "#004643" }}>
            You completed the Card Flipper
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              handleReset(
                setSelectedCard,
                setMatchedCard,
                setDisplayCard,
                setCardSide,
                setIsGameOver,
                setFlag
              );
            }}
          >
            <Text>Play Again</Text>
          </Pressable>

          <Link style={styles.actionButton} href="/revision" asChild>
            <Pressable>
              <Text>Exit</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  } else {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.title}>
          {matchedCard.length > 0
            ? `You have mactched ${matchedCard.length} cards`
            : "Press on image to play"}{" "}
        </Text>

        <FlatList
          data={shuffledCards}
          keyExtractor={(_, index) => index}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No Game Available</Text>}
          renderItem={({ item, index }) => (
            <View>
              <Pressable
                style={styles.card}
                onPress={() => {
                  const cardName = `${item}`;
                  CardSide[index] ? true : (CardSide[index] = true);
                  turnCard(cardName, index);
                  toggleFlag();
                  setDisplayCard(cards[shuffledCards[index]]);
                }}
              >
                {CardSide[index] ? (
                  <Text numberOfLines={4} style={styles.text}>
                    {cards[shuffledCards[index]]}
                  </Text>
                ) : (
                  <Image source={questionMark} style={styles.questionMark} />
                )}
              </Pressable>
            </View>
          )}
        />

        <Text style={styles.display}>{displayCard}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    marginBottom: 20,
    marginHorizontal: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: "auto",
  },
  text: {
    padding: 12,
    flex: 1,
    overflow: "hidden",
  },
  questionMark: {
    width: 80,
    height: 80,
  },
  flatList: {
    flexDirection: "row",
    numColumns: 4,
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    gap: 5,
    marginTop: 20,
  },
  display: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 16,
    width: 300,
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 200,
    padding: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#c4c4c4",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Wrapper: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: 100,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
