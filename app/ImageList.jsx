import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import questionMark from "../assets/images/question-mark.png";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function ImageList({ shuffledCards, cards }) {
  const [selectedCard, setSelectedCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);
  const [CardSide, setCardSide] = useState(shuffledCards.map(() => false));

  const [isGameOver, setIsGameOver] = useState(false);
  const [flag, setFlag] = useState(false);

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
  return (
    <>
      <Text>
        {isGameOver
          ? "You WIN, all cards matched"
          : matchedCard.length > 0
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
              }}
            >
              {CardSide[index] ? (
                <Text style={styles.text}>{cards[shuffledCards[index]]}</Text>
              ) : (
                <Image source={questionMark} style={styles.questionMark} />
              )}
            </Pressable>
          </View>
        )}
      />
    </>
  );
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
    padding: 10,
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
});
