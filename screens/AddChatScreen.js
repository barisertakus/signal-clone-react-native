import { addDoc, collection } from "@firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState("");

  const createChat = () => {
    addDoc(collection(db, "chats"),{
      chatName: chat,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chat}
        onChangeText={setChat}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" size={24} color="black" />
        }
      />
      <Button disabled={!chat} onPress={createChat} title='Create New Chat' />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
