import { collection, doc, limit, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [lastPhotoURL, setLastPhotoURL] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "chats/" + id + "/messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length)
        setLastPhotoURL(snapshot.docs[0].data().photoURL);
    });
    
    return unsubscribe
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: lastPhotoURL || undefined,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.fontListTitle}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Subtitle text. Subtitle text. Subtitle text. Subtitle text.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  fontListTitle: {
    fontWeight: "900",
  },
});
