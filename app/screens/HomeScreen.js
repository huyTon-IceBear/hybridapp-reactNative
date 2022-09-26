import { useState } from "react";
import { StyleSheet, View, FlatList, Button, SafeAreaView } from "react-native";
import { COLORS, PartyPlannerData } from "../constants";
import { HomeHeader, FocusedStatusBar, PartyCard } from "../components";
import PartyInput from "../components/PartyInput";
import PartyItem from "../components/PartyItem";

function HomeScreen({ navigation }) {
  const [partyList, setPartyList] = useState(PartyPlannerData);

  const [modalVisible, setModalVisible] = useState(false);

  function startAddPartyHandler() {
    setModalVisible(true);
  }

  function endAddPartyHandler() {
    setModalVisible(false);
  }

  function addPartyHandler(enteredPartyText) {
    setPartyList((currentpartyList) => [
      ...currentpartyList,
      { text: enteredPartyText, id: Math.random().toString() },
    ]);
    endAddPartyHandler();
    navigation.navigate("Edit Add Party");
  }

  function deletePartyHandler(id) {
    setPartyList((currentpartyList) => {
      return currentpartyList.filter((Party) => Party.id !== id);
    });
  }

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
        <PartyInput
          visible={modalVisible}
          onAddParty={addPartyHandler}
          onCancel={endAddPartyHandler}
        />
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
          <View style={{ height: 300, backgroundColor: "#1e085a" }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
