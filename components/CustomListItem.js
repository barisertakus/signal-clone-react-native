import { collection, doc, limit, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [lastPhotoURL, setLastPhotoURL] = useState("");
  const [lastMessage, setLastMessage] = useState("")

  useEffect(() => {
    const q = query(
      collection(db, "chats/" + id + "/messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length){
        const data = snapshot.docs[0].data()
        setLastPhotoURL(data.photoURL);
        setLastMessage(data.message)
      }
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
          {lastMessage || "Signal message"}
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
