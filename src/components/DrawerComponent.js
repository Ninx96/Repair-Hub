import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerLayout from "../layouts/DrawerLayout";
import Dashboard from "../screens/Dashboard/Dashboard";
import Profile from "../screens/Profile";
import ChangePassword from "../screens/ChangePassword";

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
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
