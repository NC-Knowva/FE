import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, FlatList } from "react-native";

import questionMark from "../assets/images/question-mark.png";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const ImageList = ({ imagesData, imgStyle }) => {
  const [selectedImg, setSelectedImg] = useState([]);
  const [matchedImg, setMatchedImg] = useState([]);
  const [imgSide, setImgSide] = useState(imagesData.map(() => false));

  const [isGameOver, setIsGameOver] = useState(false);
  const [flag, setFlag] = useState(false);

  const toggleFlag = () => {
    setFlag((previousState) => !previousState);
  };

  const turnImg = (name, index) => {
    const selected = selectedImg.find((item) => item.index === index);

    if (!selected && selectedImg.length < 2)
      setSelectedImg((prev) => [...prev, { name, index }]);
    else if (selectedImg.length === 2) setSelectedImg([{ name, index }]);
  };

  useEffect(() => {
    if (selectedImg.length === 2 && selectedImg[0].name === selectedImg[1].name)
      setMatchedImg((prev) => [...prev, ...selectedImg]);
    else if (selectedImg.length === 2) {
      imgSide[selectedImg[0].index] = false;
      imgSide[selectedImg[1].index] = false;
      setTimeout(() => {
        toggleFlag();
      }, 500);
    }
  }, [selectedImg]);

  useEffect(() => {
    if (imagesData.length && imagesData.length === matchedImg.length)
      setIsGameOver(true);
  }, [matchedImg]);

  return (
    <>
      <Text>
        {isGameOver
          ? "You WIN, all cards matched"
          : matchedImg.length > 0
          ? `You have mactched ${matchedImg.length} cards`
          : "Press on image to play"}{" "}
      </Text>

      <FlatList
        data={imagesData}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{
          flexDirection: "row",
          numColumns: 4,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 400,
          gap: 5,
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No Game Available</Text>}
        renderItem={({ item, index }) => (
          <View>
            <Pressable
              onPress={() => {
                const imgName = item.uri
                  .split("\\")
                  .pop()
                  .split("/")
                  .pop()
                  .split(".")
                  .shift();
                imgSide[index] ? true : (imgSide[index] = true);
                turnImg(imgName, index);
                toggleFlag();
              }}
            >
              <Image
                source={imgSide[index] ? item : questionMark}
                style={imgStyle}
              />
            </Pressable>
          </View>
        )}
      />
    </>
  );
};

export default ImageList;
