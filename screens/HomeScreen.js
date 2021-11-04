import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {

  const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  const goAddChat = () => {
    navigation.navigate("AddChat");
  };

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {id, chatName})
  }

  const headerLeft = (
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
      </TouchableOpacity>
    </View>
  );

  const headerRight = (
    <View style={styles.headerRight}>
      <TouchableOpacity activeOpacity={0.5}>
        <AntDesign name="camerao" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={goAddChat} activeOpacity={0.5}>
        <SimpleLineIcons name="pencil" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => headerLeft,
      headerRight: () => headerRight,
    });
  }, [navigation]);

  useEffect(()=>{
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

    return unsubscribe
  },[])

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((chat) => 
          <CustomListItem 
            key={chat.id}
            id={chat.id} 
            chatName={chat.data.chatName}
            enterChat={enterChat}
          /> 
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  container: {
    height: '100%'
  }
});
