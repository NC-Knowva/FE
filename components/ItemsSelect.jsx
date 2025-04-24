import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function ItemsSelect({ items, itemSelected, setItemSelected }) {
  const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor }]}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  function renderItem({ item }) {
    const backgroundColor = item.id === itemSelected.id ? "lightblue" : "white";
    const color = item.id === itemSelected.id ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => setItemSelected(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={itemSelected.id}
      style={styles.container}
      numColumns={3}
    />
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
