import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth } from "../firebase"

const HomeScreen = ({ navigation }) => {
  const headerLeft = (
    <View style={styles.headerLeft}>
      <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => headerLeft,
    });
  }, []);

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
});
