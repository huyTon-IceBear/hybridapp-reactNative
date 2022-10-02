import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FormField from "./FormField";
import { formData } from "../hooks/formData";
import { ContactListModal } from "./Modal";
import * as Contacts from "expo-contacts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFormValidator, useParticipantHandler } from "../hooks";
import { People } from "./SubInfo";
function RegisterForm(props) {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContactList(data);
        }
      }
    })();
  }, []);

  const [formValues, handleFormValueChange, setFormValues] = formData({
    name: "",
    description: "",
  });

  const [participant, setParticipant] = useState([]);
  const {
    modalVisible,
    handleOpenContactList,
    hideContactList,
    findDupplicateParticipant,
    handleParticipant,
    checkSelectAll,
    handleSelectAll,
  } = useParticipantHandler(contactList, participant, setParticipant);

  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (day) => {
    setDate(day);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const { validator } = useFormValidator(props.navigation);

  return (
    <View style={styles.container}>
      {contactList?.length > 0 && (
        <ContactListModal
          contacts={contactList}
          checkSelectAll={checkSelectAll}
          handleSelectAll={handleSelectAll}
          handleParticipant={handleParticipant}
          checkParticipant={findDupplicateParticipant}
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
        label="Party Name (*)"
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
      <View
        style={{
          width: "100%",
        }}
      >
        <Text style={styles.labelText}>Date (*)</Text>
        <View style={styles.button}>
          <Button title="Pick Start Date" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date}
            minimumDate={new Date()}
          />
        </View>
      </View>
      {date && (
        <Text style={{ marginTop: 16 }}>
          {"The party will happen on " +
            date?.toISOString()?.substring(0, 10) +
            " at " +
            date?.getHours() +
            ":" +
            date?.getMinutes()}
        </Text>
      )}
      <View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text style={styles.labelText}>Participants</Text>
          <View style={styles.button}>
            <Button
              title="Invite"
              onPress={handleOpenContactList}
              color="#b180f0"
            />
          </View>
        </View>
        <People data={participant} />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Button
          title="Create Event"
          onPress={() => {
            validator(
              formValues.name,
              formValues.description,
              date,
              participant,
              handleOpenContactList
            );
          }}
          color="#b180f0"
        />
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
