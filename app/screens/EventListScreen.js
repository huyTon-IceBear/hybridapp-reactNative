import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";

const EventListScreen = () => {
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        // console.log("Here are all your calendars:");
        // console.log({ calendars });
        if (calendars?.length === 0) {
          createCalendar();
        } else {
          setCalendar(calendars?.[0]?.id);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
      {/* <Button title="Delete new calendar" onPress={deleteCalendar} /> */}
      <Button
        title="Create a new event"
        onPress={() => createEvent(calendar)}
      />
      <Button
        title="Update a new event"
        onPress={() => updateEvent(calendar)}
      />
      <Button
        title="Delete a new event"
        onPress={() => deleteEvent(calendar)}
      />
    </View>
  );
};

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

async function deleteCalendar() {
  const newCalendarID = await Calendar.deleteCalendarAsync("1");
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

async function createEvent(calendar) {
  const newEventID = await Calendar.createEventAsync("1", {
    allDay: true,
    title: "Test event",
    startDate: "2022-10-08T04:00:00.000Z",
    endDate: "2022-10-08T04:00:00.000Z",
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

export default EventListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
