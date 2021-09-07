import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import Style from "../../styles/Style";

const Register = (props) => {
  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ height: 100, width: 150 }}
        />
      </View>

      <Text style={Style.heading}>Create Account</Text>

      <View style={Style.form}>
        <ScrollView>
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

          <View style={Style.formControl}>
            <Text style={Style.label}>Password</Text>
            <TextInput
              mode="outlined"
              placeholder="Password"
              style={Style.input}
            />
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Confirm Password</Text>
            <TextInput
              mode="outlined"
              placeholder="Confirm Password"
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
        </ScrollView>
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
