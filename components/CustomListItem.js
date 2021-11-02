import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://miro.medium.com/max/385/1*wxN_RRBtJe0QqgWMrm6hYw.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.fontListTitle}>Chat text</ListItem.Title>
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
