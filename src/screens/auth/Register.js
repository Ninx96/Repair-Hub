import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Style from "../../styles/Style";

const Register = () => {
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.heading}>Create Account</Text>

      <View style={Style.form}>
        <View style={Style.formControl}>
          <Text style={Style.label}>Full Name</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Full Name"
            style={Style.input}
          />
        </View>

        <View style={Style.formControl}>
          <Text style={Style.label}>Phone Number</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Phone Number"
            style={Style.input}
          />
        </View>

        <View style={Style.formControl}>
          <Text style={Style.label}>Email Address</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Email Address"
            style={Style.input}
          />
        </View>

        <Button
          mode="contained"
          style={Style.button}
          uppercase={false}
          labelStyle={Style.buttonLabel}
        >
          Sign Up
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 25 }}>
          By Signing up you are agreeing to our{" "}
        </Text>
        <Button mode="text" uppercase={false} labelStyle={{ fontSize: 25 }}>
          Terms & Conditions
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;
