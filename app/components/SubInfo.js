import React from "react";
import { View, Image, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const Title = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View style={{ maxWidth: "65%" }}>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}
      >
        {subTitle?.length > 30 ? subTitle.slice(0, 30) + "..." : subTitle}
      </Text>
    </View>
  );
};

export const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const People = ({ data }) => {
  console.log("asdasjdi");
  return (
    <View style={{ flexDirection: "row" }}>
      {data.slice(0, 4).map((contact, index) => (
        <View
          style={{
            width: 48,
            height: 48,
            marginLeft: index === 0 ? 0 : -SIZES.font,
          }}
          index={index}
          key={`Contact-${index}`}
        >
          <View
            style={{
              width: 48,
              height: 48,
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
      {data?.length > 5 && (
        <View
          style={{
            width: 48,
            height: 48,
            marginLeft: -SIZES.font,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
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
              {"+" + "" + (data?.length - 4).toString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export const EndDate = ({ date }) => {
  console.log("EndDate", date);
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {"At " + date?.getHours() + ":" + date?.getMinutes()}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {date?.toISOString()?.substring(0, 10)}
      </Text>
    </View>
  );
};

export const SubInfo = ({ data }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <People data={data.people} />
      <EndDate date={data.date} />
    </View>
  );
};
