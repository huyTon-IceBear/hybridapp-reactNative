import React from "react";
import * as Calendar from "expo-calendar";

const useCalendarHandler = (calendar) => {
  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    setCalendar;
  }

  async function createEvent(calendar, name, date) {
    console.log("calendar", calendar);
    const newEventID = await Calendar.createEventAsync(calendar, {
      allDay: true,
      title: name,
      startDate: date,
      endDate: date,
    });
    console.log(`Your new event ID is: ${newEventID}`);
  }

  async function updateEvent(calendar) {
    const updateEventID = await Calendar.updateEventAsync("77", {
      allDay: true,
      title: "Test event with update",
      startDate: "2022-10-08T04:00:00.000Z",
      endDate: "2022-10-08T04:00:00.000Z",
    });
    console.log(`Your update event ID is: ${updateEventID}`);
  }

  async function deleteEvent(calendar) {
    const updateEventID = await Calendar.deleteEventAsync("77");
    console.log(`Your update event ID is: ${updateEventID}`);
  }

  return { createCalendar, createEvent, updateEvent, deleteEvent };
};

export default useCalendarHandler;
