import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { ContactList } from "./List";

export function ContactListModal(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <ContactList contacts={props.contacts} />
        <View style={styles.button}>
          <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
