import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const DrawerComponent = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
