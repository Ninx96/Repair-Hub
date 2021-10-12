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
import { useNavigation } from "@react-navigation/native";

const DrawerComponent = (props) => {
  const navigation = useNavigation();
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
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={35}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={35}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
