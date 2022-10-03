import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, ScrollView, Image } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { FocusedStatusBar, CircleButton } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { usePartyStore } from "../store/party";

const EditAddParty = ({ navigation, route }) => {
  const { partyID } = route.params;
  const { partyList } = usePartyStore();
  const data = partyList.find((party) => party?.id === partyID);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView>
        <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{ width: "100%", height: 273 }}>
          <Image
            source={assets.s04}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <CircleButton
            imgUrl={assets.left}
            handlePress={() => navigation.goBack()}
            left={15}
            top={StatusBar.currentHeight + 10}
          />
        </View>
        <RegisterForm navigation={navigation} data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAddParty;
