import React, { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Otp from "../screens/auth/Otp";
import Register from "../screens/auth/Register";
import UserType from "../screens/auth/UserType";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ResetPassword from "../screens/auth/ResetPassword";

const AuthStackComponent = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserType"
    >
      <Stack.Screen name="UserType" component={UserType} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStackComponent;
