import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerLayout from "../layouts/DrawerLayout";
import Dashboard from "../screens/Dashboard/Dashboard";
import Profile from "../screens/Profile";

const DrawerComponent = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{ title: "" }}
    >
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
