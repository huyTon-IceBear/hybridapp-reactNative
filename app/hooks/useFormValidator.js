import { Alert } from "react-native";
import { usePartyStore } from "../store/party";
import useCalendarHandler from "./useCalendarHandler";

const useFormValidator = (navigation, calendar) => {
  const { addParty } = usePartyStore(); // OR useContext(PartyStoreContext)
  const { createEvent } = useCalendarHandler(calendar);

  const validator = (name, desc, date, participant, handlerFunc) => {
    if (name === "") {
      Alert.alert("Missing information", "Please enter a name for the party", [
        { text: "OK", onPress: () => {}, style: "cancel" },
      ]);
    } else if (date === undefined) {
      Alert.alert("Missing information", "Please select a date", [
        { text: "OK", onPress: () => {}, style: "cancel" },
      ]);
    } else if (participant?.length === 0) {
      Alert.alert(
        "An empty party?",
        "Do you want to invite somebody to your party?",
        [
          {
            text: "OK",
            onPress: () => {
              handlerFunc();
            },
            style: "cancel",
          },
          {
            text: "Maybe later",
            onPress: () => {
              createParty();
            },
            style: "cancel",
          },
        ]
      );
    } else {
      createParty();
    }
    return false;

    async function createParty() {
      let partyID = await createEvent(calendar, name, date);
      addParty(partyID, name, desc, date, participant);
      navigation.navigate("Home");
    }
  };

  return { validator };
};

export default useFormValidator;
