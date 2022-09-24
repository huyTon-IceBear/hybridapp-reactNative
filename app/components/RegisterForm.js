import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Button, StyleSheet } from "react-native";
import FormField from "./FormField";
import { formData } from "../hooks/formData";
import { ContactListModal } from "./Modal";
import * as Contacts from "expo-contacts";

function RegisterForm(props) {
  const [modalVisible, setModalVisible] = useState(false);

  function hideContactList() {
    setModalVisible(false);
  }
  const [contactList, setContactList] = useState([]);
  const handleOpenContactList = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });
      if (data.length > 0) {
        setContactList(data);
      }
    }
    setModalVisible(true);
  };

  const [formValues, handleFormValueChange, setFormValues] = formData({
    name: "",
    description: "",
    date: "",
  });
  return (
    <View style={styles.container}>
      {contactList?.length > 0 && (
        <ContactListModal
          contacts={contactList}
          visible={modalVisible}
          onCancel={hideContactList}
        />
      )}
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          fontWeight: "300",
          paddingBottom: 30,
        }}
      >
        Please add more information about your party
      </Text>
      <FormField
        label="Party Name"
        formKey="name"
        placeholder="Name to your party"
        handleFormValueChange={handleFormValueChange}
      />
      <FormField
        label="Description"
        formKey="description"
        placeholder="Write something about your party..."
        textInputProps={{
          autoCapitalize: "none",
        }}
        handleFormValueChange={handleFormValueChange}
      />
      <View>
        <Text style={styles.labelText}>Date</Text>
        <View style={styles.button}>
          <Button
            title="Pick a day"
            onPress={() => props.navigation.navigate("EventListScreen")}
            color="#b180f0"
          />
        </View>
      </View>
      <View>
        <Text style={styles.labelText}>Participant</Text>
        <View style={styles.button}>
          <Button
            title="View Contact List"
            onPress={handleOpenContactList}
            color="#b180f0"
          />
        </View>
      </View>
      <View>
        <Text style={styles.labelText}>Mail screen</Text>
        <View style={styles.button}>
          <Button
            title="To send mail screen"
            onPress={() => props.navigation.navigate("Send Mail")}
            color="#b180f0"
          />
        </View>
      </View>
    </View>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 20,
  },
  header: {
    fontSize: 20,
    paddingTop: 30,
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0,
  },
  button: {
    width: 150,
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
