import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerLayout from "../layouts/DrawerLayout";
import Profile from "../screens/Profile";
import ChangePassword from "../screens/ChangePassword";
import TaskDetails from "../screens/Dashboard/TaskDetails";
import Sites from "../screens/Dashboard/Sites";
import { Appbar, IconButton, Modal, Portal } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Campaigns from "../screens/Dashboard/Campaigns";
import FilterCampaigns from "../screens/Dashboard/FilterCampaigns";
import FilterSites from "../screens/Dashboard/FilterSites";

const DrawerComponent = (props) => {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Campaigns"
      backBehavior="history"
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{ unmountOnBlur: true, title: "" }}
    >
      {/* <Drawer.Screen name="FilterCampaigns" component={FilterCampaigns} /> */}

      <Drawer.Screen
        name="FilterSites"
        component={FilterSites}
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

      <Drawer.Screen name="Campaigns" component={Campaigns} />

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

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
