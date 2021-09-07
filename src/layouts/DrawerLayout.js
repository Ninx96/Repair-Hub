import React, { useState, useEffect, useContext } from "react";
import { Drawer, List } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../../src/components/ContextComponent";
import { Image, SafeAreaView, View } from "react-native";
import Style from "../styles/Style";

const DrawerLayout = (props) => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Style.container.paddingTop }}>
      <Drawer.Section style={{ marginBottom: 20 }}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={{ width: "100%", height: 150, resizeMode: "contain" }}
        />
      </Drawer.Section>

      <DrawerContentScrollView>
        <List.Item
          title="Home"
          titleStyle={{ fontSize: 26 }}
          left={(props) => <List.Icon {...props} icon="home" color="#4285F4" />}
          onPress={() => props.navigation.navigate("Home")}
        />
        <List.Item
          title="My Profile"
          titleStyle={{ fontSize: 26 }}
          left={(props) => (
            <List.Icon {...props} icon="account" color="#4285F4" />
          )}
          onPress={() => props.navigation.navigate("Profile")}
        />
        <List.Item
          title="Change Password"
          titleStyle={{ fontSize: 26 }}
          left={(props) => <List.Icon {...props} icon="lock" color="#4285F4" />}
        />

        <List.Item
          title="Terms & Conditions"
          titleStyle={{ fontSize: 26 }}
          left={(props) => (
            <List.Icon {...props} icon="clipboard-text" color="#4285F4" />
          )}
        />
        <List.Item
          title="Log Out"
          titleStyle={{ fontSize: 26 }}
          left={(props) => (
            <List.Icon {...props} icon="logout" color="#4285F4" />
          )}
          onPress={() => {
            signOut();
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DrawerLayout;
