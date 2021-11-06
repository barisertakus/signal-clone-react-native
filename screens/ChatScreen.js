import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const { id, chatName } = route.params;
  const [input, setInput] = useState("");

  const sendMessage = () => {
    Keyboard.dismiss();

    const messagesRef = collection(db, "chats/" + id + "/messages");

    addDoc(messagesRef,{
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput("");
  };

  const headerTitle = (
    <View style={styles.headerTitle}>
      <Avatar
        rounded
        source={{
          uri: "https://miro.medium.com/max/385/1*wxN_RRBtJe0QqgWMrm6hYw.png",
        }}
      />
      <Text style={styles.titleText}>{chatName}</Text>
    </View>
  );

  const headerLeft = (
    <TouchableOpacity
      style={styles.headerBack}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
  );

  const headerRight = (
    <View style={styles.headerRight}>
      <TouchableOpacity>
        <FontAwesome name="video-camera" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => headerTitle,
      headerLeft: () => headerLeft,
      headerRight: () => headerRight,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView // to push bottom view
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
          <>
            <ScrollView></ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
                placeholder="Signal message"
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  titleText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
  headerBack: {
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  textInput: {
    borderRadius: 30,
    backgroundColor: "#ECECEC",
    color: "grey",
    padding: 10,
    marginRight: 15,
    flex: 1,
    bottom: 0,
    height: 40,  
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
