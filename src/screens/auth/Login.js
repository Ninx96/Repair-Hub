import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Style from "../../styles/Style";

const Login = (props) => {
  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ height: 100, width: 150 }}
        />
      </View>

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
          onPress={() => props.navigation.navigate("Otp")}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
