import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as MailComposer from "expo-mail-composer";

const SendMailScreen = () => {
  const [status, setStatus] = useState(null);

  const showAlert = () =>
    Alert.alert("Add a file", "Do you want to attach a file?", [
      {
        text: "No",
        onPress: () => {
          sendEmail([]);
        },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          sendEmail([]);
        },
      },
    ]);

  const sendEmail = async () => {
    let options = {
      subject: "Sending email with attachment",
      recipients: ["huyton110798@gmail.com"],
      body: "Enter email body here...",
    };

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });

    promise.then(
      (result) => setStatus("Status: email " + result.status),
      (error) => setStatus("Status: email " + error.status)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => sendEmail()}>
        <Text style={{ backgroundColor: "black", color: "white", padding: 15 }}>
          Send email
        </Text>
      </TouchableOpacity>

      {status !== null && (
        <View
          style={{
            borderWidth: 2,
            borderColor: "black",
            margin: 20,
            padding: 10,
          }}
        >
          <Text>{status}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default SendMailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
