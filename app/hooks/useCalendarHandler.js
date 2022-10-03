import * as Calendar from "expo-calendar";
import { Platform } from "react-native";

const useCalendarHandler = () => {
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
    return newCalendarID;
  }

  async function createEvent(calendar, name, date) {
    const newEventID = await Calendar.createEventAsync(calendar, {
      allDay: true,
      title: name,
      startDate: date,
      endDate: date,
    });
    return newEventID;
  }

  async function updateEvent(id, name, date) {
    const updateEventID = await Calendar.updateEventAsync(id, {
      allDay: true,
      title: name,
      startDate: date,
      endDate: date,
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
