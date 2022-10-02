import { StyleSheet, FlatList } from "react-native";
import React from "react";
import { ContactCard } from "./Card";

export function ContactList({ contacts, handleParticipant, checkParticipant }) {
  const keyExtractor = (item, idx) => {
    return item?.id?.toString() || idx.toString();
  };
  const renderItem = ({ item, index }) => {
    return (
      <ContactCard
        contact={item}
        checkParticipant={checkParticipant}
        handleParticipant={handleParticipant}
      />
    );
  };
  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
