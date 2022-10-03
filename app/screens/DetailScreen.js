import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {
  CircleButton,
  DetailsDesc,
  SubInfo,
  FocusedStatusBar,
} from "../components";
import { usePartyStore } from "../store/party";

const DetailsHeader = ({ data, navigation }) => (
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
        navigation.navigate("Edit Add Party", {
          partyID: data?.id,
        })
      }
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const DetailScreen = ({ route, navigation }) => {
  const { partyId } = route.params;
  const { partyList } = usePartyStore();
  const data = partyList.find((party) => party?.id === partyId);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View>
          <DetailsHeader data={data} navigation={navigation} />
          <SubInfo data={data} />
          <View style={{ padding: SIZES.font }}>
            <DetailsDesc data={data} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
