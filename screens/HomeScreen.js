import React, { useLayoutEffect } from "react";
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
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };


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

      <TouchableOpacity activeOpacity={0.5}>
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

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
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
});
