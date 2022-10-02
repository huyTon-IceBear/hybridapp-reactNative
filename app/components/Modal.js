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
        <ContactList
          contacts={props.contacts}
          handleParticipant={props.handleParticipant}
          checkParticipant={props.checkParticipant}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.button}>
            <Button
              title={props.checkSelectAll() ? "Discard All" : "Select All"}
              onPress={props.handleSelectAll}
              color="#f31282"
            />
          </View>
          <View style={styles.button}>
            <Button title="Done" onPress={props.onCancel} color="#f31282" />
          </View>
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
    width: 150,
    marginHorizontal: 8,
  },
});
