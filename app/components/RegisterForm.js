import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FormField from "./FormField";
import { formData } from "../hooks/formData";
import { ContactListModal } from "./Modal";
import * as Contacts from "expo-contacts";
import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { usePartyStore } from "../store/party";

function RegisterForm(props) {
  const { addParty } = usePartyStore(); // OR useContext(PartyStoreContext)
  const [modalVisible, setModalVisible] = useState(false);
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
  const handleOpenContactList = () => {
    setModalVisible(true);
  };

  function hideContactList() {
    setModalVisible(false);
  }

  const [formValues, handleFormValueChange, setFormValues] = formData({
    name: "",
    description: "",
  });

  const [participant, setParticipant] = useState([]);

  function findDupplicateParticipant(people) {
    return participant.some((person) => person?.id === people?.id);
  }

  function handleParticipant(people) {
    if (findDupplicateParticipant(people)) {
      deleteParticipant(people?.id);
    } else {
      addParticipant(people);
    }
  }

  function addParticipant(people) {
    setParticipant((currentList) => [
      ...currentList,
      {
        id: people?.id,
        name: people?.name,
        phoneNumber: people?.phoneNumbers?.[0]?.number,
        email: people?.emails?.[0]?.email || null,
      },
    ]);
  }

  function deleteParticipant(id) {
    setParticipant((currentList) => {
      return currentList.filter((people) => people?.id !== id);
    });
  }

  function selectAll() {
    contactList.forEach((element) => {
      if (!findDupplicateParticipant(element)) {
        addParticipant(element);
      }
    });
  }

  function unselectAll() {
    setParticipant([]);
  }

  function checkSelectAll() {
    return participant?.length === contactList?.length;
  }

  function handleSelectAll() {
    if (checkSelectAll()) {
      unselectAll();
    } else {
      selectAll();
    }
  }

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
      <View
        style={{
          width: "100%",
        }}
      >
        <Text style={styles.labelText}>Date</Text>
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
            date?.toISOString().substring(0, 10) +
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
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          {participant.slice(0, 4).map((contact, index) => (
            <View
              style={{
                width: 48,
                height: 48,
                padding: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#d9d9d9",
                marginLeft: index === 0 ? 0 : -SIZES.font,
              }}
              index={index}
              key={`Contact-${index}`}
            >
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "white",
                  overflow: "hidden",
                  backgroundColor: "#d9d9d9",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {contact?.name?.[0]}
                </Text>
              </View>
            </View>
          ))}
          {participant?.length > 5 && (
            <View
              style={{
                width: 48,
                height: 48,
                padding: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#d9d9d9",
                marginLeft: -SIZES.font,
              }}
            >
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "white",
                  overflow: "hidden",
                  backgroundColor: "#d9d9d9",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {"+" + "" + (participant?.length - 4).toString()}
                </Text>
              </View>
            </View>
          )}
        </View>
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
            addParty(
              formValues.name,
              formValues.description,
              date,
              participant
            );
            props.navigation.navigate("Home");
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
