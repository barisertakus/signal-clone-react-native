import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const { id, chatName } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const scrollViewRef = useRef();

  const sendMessage = () => {
    Keyboard.dismiss();

    const messagesRef = collection(db, "chats/" + id + "/messages");

    addDoc(messagesRef, {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  const handleScrollContentChange = (animate) => {
    scrollViewRef.current.scrollToEnd({ animated: animate });
  };

  const headerTitle = (
    <View style={styles.headerTitle}>
      <Avatar
        rounded
        source={{
          uri: messages[0]?.data.photoURL
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
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const messagesRef = collection(db, "chats/" + id + "/messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const snapshot = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return snapshot;
  }, [route]);

  useEffect(()=>{
    handleScrollContentChange(false);
  },[scrollViewRef.current])

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView // to push bottom view
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 15 }}
              ref={scrollViewRef}  
              onContentSizeChange={()=>handleScrollContentChange(true)}
            >
              {messages.map((message) => {
                const sender =
                  message.data.email === auth.currentUser.email ? true : false;
                return (
                  <View
                    key={message.id}
                    style={sender ? styles.sender : styles.receiver}
                  >
                    <Avatar
                      source={{ uri: message.data.photoURL }}
                      rounded
                      size={30}
                      // Props could be written here too.
                      // But for web compatibility, containerStyle is used.
                      containerStyle={{
                        position: "absolute",
                        bottom: -20,
                        right: sender ? -7 : undefined,
                        left: !sender ? -7 : undefined,
                      }}
                    />
                    <Text
                      style={sender ? styles.senderText : styles.receiverText}
                    >
                      {message.data.message}
                    </Text>
                    <Text
                      style={sender ? styles.senderName : styles.receiverName}
                    >
                      {message.data.displayName}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
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
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    display: "none",
  },
  receiverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
