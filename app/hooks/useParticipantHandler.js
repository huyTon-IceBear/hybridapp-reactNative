import React, { useState } from "react";

const useParticipantHandler = (contactList, participant, setParticipant) => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleOpenContactList() {
    setModalVisible(true);
  }

  function hideContactList() {
    setModalVisible(false);
  }

  function findDupplicateParticipant(people) {
    return participant.some((person) => person?.id === people?.id);
  }

  function handleParticipant(people) {
    if (findDupplicateParticipant(people)) {
      deleteParticipant(people?.id);
    } else {
      addParticipant(people);
    }
  }

  function addParticipant(people) {
    setParticipant((currentList) => [
      ...currentList,
      {
        id: people?.id,
        name: people?.name,
        phoneNumber: people?.phoneNumbers?.[0]?.number,
        email: people?.emails?.[0]?.email || null,
      },
    ]);
  }

  function deleteParticipant(id) {
    setParticipant((currentList) => {
      return currentList.filter((people) => people?.id !== id);
    });
  }

  function selectAll() {
    contactList.forEach((element) => {
      if (!findDupplicateParticipant(element)) {
        addParticipant(element);
      }
    });
  }

  function unselectAll() {
    setParticipant([]);
  }

  function checkSelectAll() {
    return participant?.length === contactList?.length;
  }

  function handleSelectAll() {
    if (checkSelectAll()) {
      unselectAll();
    } else {
      selectAll();
    }
  }

  return {
    modalVisible,
    handleOpenContactList,
    hideContactList,
    findDupplicateParticipant,
    handleParticipant,
    checkSelectAll,
    handleSelectAll,
  };
};

export default useParticipantHandler;
