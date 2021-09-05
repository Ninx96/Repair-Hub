import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Style from "../../styles/Style";

const Login = () => {
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.heading}>RepirHub</Text>

      <View style={Style.form}>
        <View style={Style.formControl}>
          <Text style={Style.label}>Enter Phone/Email</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Phone/Email"
            style={Style.input}
          />
        </View>

        <View style={Style.formControl}>
          <Text style={Style.label}>Enter Password</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Password"
            style={Style.input}
          />
        </View>

        <Button
          mode="contained"
          style={Style.button}
          uppercase={false}
          labelStyle={Style.buttonLabel}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
