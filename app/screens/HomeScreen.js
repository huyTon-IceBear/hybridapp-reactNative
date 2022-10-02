import {
  StyleSheet,
  View,
  FlatList,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { COLORS, assets } from "../constants";
import { HomeHeader, FocusedStatusBar, PartyCard } from "../components";
import PartyInput from "../components/PartyInput";
import { observer } from "mobx-react-lite";
import { usePartyStore } from "../store/party";

const HomeScreen = observer(({ navigation }) => {
  // const [partyList, setPartyList] = useState(PartyPlannerData);
  const { partyList } = usePartyStore(); // OR useContext(PartyStoreContext)
  // console.log(partyList);
  // const [modalVisible, setModalVisible] = useState(false);
  // function startAddPartyHandler() {
  //   setModalVisible(true);
  // }

  // function endAddPartyHandler() {
  //   setModalVisible(false);
  // }

  // function addPartyHandler(enteredPartyText) {
  //   setPartyList((currentpartyList) => [
  //     ...currentpartyList,
  //     { text: enteredPartyText, id: Math.random().toString() },
  //   ]);
  //   endAddPartyHandler();
  //   navigation.navigate("Edit Add Party");
  // }

  // function deletePartyHandler(id) {
  //   setPartyList((currentpartyList) => {
  //     return currentpartyList.filter((Party) => Party.id !== id);
  //   });
  // }

  // function addPartyHandler(partInformation) {
  //   setPartyList((currentpartyList) => [...currentpartyList, partInformation]);
  //   endAddPartyHandler();
  //   navigation.navigate("Edit Add Party");
  // }

  console.log("building homescreen");

  function navigateToNewScreen() {
    navigation.navigate("Edit Add Party");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <Button
          title="Add New Party"
          color="#a065ec"
          onPress={navigateToNewScreen}
        />
        {/* <PartyInput
          visible={modalVisible}
          onAddParty={addPartyHandler}
          onCancel={endAddPartyHandler}
        /> */}

        {partyList?.length > 0 ? (
          <View style={{ zIndex: 0 }}>
            <FlatList
              data={partyList}
              renderItem={(itemData) => {
                return <PartyCard data={itemData.item} />;
              }}
              keyExtractor={(item) => {
                return item.id;
              }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  PartyContainer: {
    flex: 5,
  },
});
