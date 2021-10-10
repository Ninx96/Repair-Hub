import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerLayout from "../layouts/DrawerLayout";
import Dashboard from "../screens/Dashboard/Dashboard";
import Profile from "../screens/Profile";
import ChangePassword from "../screens/ChangePassword";
import TaskDetails from "../screens/Dashboard/TaskDetails";
import Sites from "../screens/Dashboard/Sites";
import { IconButton } from "react-native-paper";
import { View } from "react-native";

const DrawerComponent = (props) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{ unmountOnBlur: true, title: "" }}
    >
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen
        name="Sites"
        component={Sites}
        options={{
          header: () => (
            <View style={{ flexDirection: "row", width: "100%" }}>
              <IconButton
                icon="chevron-left"
                size={35}
                onPress={() => props.navigation.goBack()}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{
          header: () => (
            <View style={{ flexDirection: "row", width: "100%" }}>
              <IconButton
                icon="chevron-left"
                size={35}
                onPress={() => props.navigation.goBack()}
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
