import { useState, useEffect } from "react";

import ImageList from "./ImageList";
import { getCards } from "../endpoints";
import { useLocalSearchParams } from "expo-router";

//Shuffle images
const shuffleImages = (array) => {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export default function HomeScreen() {
  const { topic } = useLocalSearchParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards()
      .then((topics) => {
        const cards = topics.filter((card) => {
          return card.name === topic;
        })[0];

        setCards(cards.questions);
      })
      .catch((error) => {});
  }, []);

  const items = Object.keys(cards);
  const shuffledCards = shuffleImages([...items, ...items]);

  return <ImageList shuffledCards={shuffledCards} cards={cards} />;
}
