import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {
  CircleButton,
  DetailsDesc,
  SubInfo,
  FocusedStatusBar,
} from "../components";
import { usePartyStore } from "../store/party";
import { useCalendarHandler } from "../hooks";

const { deleteEvent } = useCalendarHandler();

const DetailsHeader = ({ data, navigation, sendEmail }) => (
  <View style={{ width: "100%", height: 373 }}>
    <Image
      source={data?.image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton
      imgUrl={assets.edit}
      handlePress={() =>
        Alert.alert("", "Do you want to edit party's information?", [
          {
            text: "Yes",
            onPress: () => {
              navigation.navigate("Edit Add Party", {
                partyID: data?.id,
              });
            },
            style: "cancel",
          },
          {
            text: "Later",
            onPress: () => {},
            style: "cancel",
          },
        ])
      }
      right={15}
      top={StatusBar.currentHeight + 10}
    />
    <CircleButton
      imgUrl={assets.trash}
      handlePress={() =>
        Alert.alert("", "Do you want delete this event?", [
          {
            text: "Yes",
            onPress: () => {
              deleteEvent(data?.id);
            },
            style: "cancel",
          },
          {
            text: "Later",
            onPress: () => {},
            style: "cancel",
          },
        ])
      }
      right={15}
      top={StatusBar.currentHeight + 60}
    />
    <CircleButton
      imgUrl={assets.mail}
      handlePress={() =>
        Alert.alert("", "Do you want send email to paticipants?", [
          {
            text: "Yes",
            onPress: async () => {
              await sendEmail();
            },
            style: "cancel",
          },
          {
            text: "Later",
            onPress: () => {},
            style: "cancel",
          },
        ])
      }
      right={15}
      top={StatusBar.currentHeight + 110}
    />
  </View>
);

const DetailScreen = ({ route, navigation }) => {
  const { partyId } = route.params;
  const { partyList } = usePartyStore();
  const data = partyList.find((party) => party?.id === partyId);
  let recipients = data.people.map((people) => people.email);
  const [status, setStatus] = useState(null);
  const sendEmail = async () => {
    let options = {
      subject: "You're invited to " + data?.name + " party",
      recipients: recipients,
      body:
        "The party will start at " +
        data?.date?.getHours() +
        ":" +
        data?.date?.getMinutes() +
        ", " +
        data?.date?.toISOString()?.substring(0, 10) +
        ". " +
        data?.desc,
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View>
          <DetailsHeader
            data={data}
            navigation={navigation}
            sendEmail={sendEmail}
          />
          <SubInfo data={data} />
          <View style={{ padding: SIZES.font }}>
            <DetailsDesc data={data} />
          </View>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
