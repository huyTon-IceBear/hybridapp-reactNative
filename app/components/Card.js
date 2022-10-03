import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, Title } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";

export const PartyCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 140,
        }}
      >
        <Image
          source={data?.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        <CircleButton imgUrl={assets.heart} right={10} top={10} />
      </View>

      <SubInfo data={data} />

      <View
        style={{
          width: "100%",
          padding: SIZES.font,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title
          title={data?.name}
          subTitle={data?.desc}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <RectButton
          minWidth={120}
          fontSize={SIZES.font}
          handlePress={() =>
            navigation.navigate("Party Detail", { partyId: data?.id })
          }
        />
      </View>
    </View>
  );
};

export const ContactCard = ({
  contact,
  handleParticipant,
  checkParticipant,
}) => {
  return (
    <Pressable onPress={() => handleParticipant(contact)}>
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>{contact?.name?.[0]}</Text>
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers?.[0]?.number || "Doesn't have phone number"}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.emails?.[0]?.email || "Doesn't have email"}
          </Text>
        </View>
        {checkParticipant(contact) && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={assets.done}
              resizeMode="contain"
              style={{ width: 24, height: 24 }}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 13,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
});
