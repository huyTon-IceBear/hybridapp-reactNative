import React from "react";
import { makeObservable, action, observable, computed } from "mobx";
import { assets, PartyPlannerData } from "../constants";
import { getRandomIntInclusive } from "../helpers";

class PartyStore {
  partyList = [
    {
      date: new Date(),
      desc: "Anime is hand-drawn and computer-generated animation originating from Japan. Outside of Japan and in English, anime refers specifically to animation produced in Japan. However, in Japan and in Japanese, anime (a term derived from a shortening of the English word animation) describes all animated works, regardless of style or origin. Animation produced outside of Japan with similar style to Japanese animation is commonly referred to as anime-influenced animation.An anime convention is an event or gathering with a primary focus on anime, manga and Japanese culture. Commonly, anime conventions are multi-day events hosted at convention centers, hotels or college campuses. They feature a wide variety of activities and panels, with a larger number of attendees participating in cosplay than most other types of fan conventions. Anime conventions are also used as a vehicle for industry, in which studios, distributors, and publishers represent their anime related releases.",
      id: "0.7254318046447008",
      image: 13,
      name: "Test Name",
      people: [
        {
          email: "t2@gmail.com",
          id: "2",
          name: "BCA",
          phoneNumber: "234",
        },
        {
          email: "t4@gmail.com",
          id: "4",
          name: "D4",
          phoneNumber: "4",
        },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      partyList: observable,
      addParty: action.bound,
      removeParty: action.bound,
    });
  }

  addParty(partyID, partyName, partyDes, partyDate, inviteList) {
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
        desc:
          partyDes !== ""
            ? partyDes
            : "You are too lazy to fill description for this party",
        date: partyDate,
        people: inviteList,
        id: partyID,
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
