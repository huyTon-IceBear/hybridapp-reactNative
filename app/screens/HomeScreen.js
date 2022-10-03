import { View, FlatList, Button, SafeAreaView, Image } from "react-native";
import { COLORS, assets } from "../constants";
import { HomeHeader, FocusedStatusBar, PartyCard } from "../components";
import { observer } from "mobx-react-lite";
import { usePartyStore } from "../store/party";

const HomeScreen = observer(({ navigation }) => {
  const { partyList } = usePartyStore(); // OR useContext(PartyStoreContext)
  function navigateToNewScreen() {
    navigation.navigate("Edit Add Party", { partyID: "" });
  }
  console.log(partyList);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <Button
          title="Add New Party"
          color="#a065ec"
          onPress={navigateToNewScreen}
        />
        {partyList?.length > 0 ? (
          <View style={{ zIndex: 0 }}>
            <FlatList
              data={partyList}
              renderItem={(itemData) => {
                return <PartyCard data={itemData.item} />;
              }}
              // keyExtractor={(item) => {
              //   return item?.id;
              // }}
              ListHeaderComponent={<HomeHeader />}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
            />
          </View>
        ) : (
          <View>
            <HomeHeader />
            <Image
              source={assets.s05}
              resizeMode="cover"
              style={{ width: "100%", height: "80%" }}
            />
          </View>
        )}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: "100%", backgroundColor: "#1e085a" }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
});

export default HomeScreen;
