import React from "react";
import { makeObservable, action, observable } from "mobx";
import { assets, PartyPlannerData } from "../constants";
import { getRandomIntInclusive } from "../helpers";

class PartyStore {
  partyList = [];

  constructor() {
    makeObservable(this, {
      partyList: observable,
      addParty: action.bound,
      removeParty: action.bound,
    });
  }

  addParty(partyName, partyDes, partyDate, inviteList) {
    let randomImage = getRandomIntInclusive(1, 3);
    switch (randomImage) {
      case 1:
        randomImage = assets.s01;
        break;
      case 2:
        randomImage = assets.s02;
        break;
      case 3:
        randomImage = assets.s03;
        break;
    }
    this.partyList = [
      ...this.partyList,
      {
        image: randomImage,
        name: partyName,
        desc: partyDes,
        date: partyDate?.toString() || new Date().toString(),
        people: inviteList,
        id: Math.random().toString(),
      },
    ];
  }

  removeParty(id) {
    this.partyList = this.partyList.filter((party) => party.id !== id);
  }
}

// Instantiate the counter store.
const partyStore = new PartyStore();
// Create a React Context with the counter store instance.
export const PartyStoreContext = React.createContext(partyStore);
export const usePartyStore = () => React.useContext(PartyStoreContext);
