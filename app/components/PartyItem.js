import { View, Text, StyleSheet, Pressable } from "react-native";

function PartyItem(props) {
  return (
    <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
      <View style={styles.PartyItem}>
        <Text style={styles.PartyText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

export default PartyItem;

const styles = StyleSheet.create({
  PartyItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  PartyText: {
    color: "white",
  },
});
