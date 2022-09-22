import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

function PartyInput(props) {
  const [enteredPartyText, setEnteredPartyText] = useState("");

  function PartyInputHandler(enteredText) {
    setEnteredPartyText(enteredText);
  }

  function addPartyHandler() {
    props.onAddParty(enteredPartyText);
    setEnteredPartyText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/Sample.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Party Name"
          onChangeText={PartyInputHandler}
          value={enteredPartyText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Party"
              onPress={addPartyHandler}
              color="#b180f0"
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default PartyInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: `#e4d0ff`,
    backgroundColor: `#e4d0ff`,
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
