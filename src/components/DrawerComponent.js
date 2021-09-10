import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerLayout from "../layouts/DrawerLayout";
import Dashboard from "../screens/Dashboard/Dashboard";
import Profile from "../screens/Profile";

const DrawerComponent = ({ userState }) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{ title: "" }}
    >
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        initialParams={userState}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        initialParams={userState}
      />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
