import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Style from "../../styles/Style";

const Otp = (props) => {
  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ height: 100, width: 150 }}
        />
      </View>
      <View style={Style.form}>
        <Text style={Style.heading}>Verification</Text>
        <Text style={{ fontSize: 25 }}>
          Enter 6 digit verification code sent on your given email
        </Text>
      </View>

      <View style={Style.form}>
        <View style={Style.formControl}>
          <Text style={Style.label}>Enter OTP</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter 6 Digit OTP"
            style={Style.input}
          />
        </View>
        <View style={Style.formControl}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25 }}>0:23</Text>
            <Button mode="text" uppercase={false} labelStyle={{ fontSize: 25 }}>
              Send Again
            </Button>
          </View>
        </View>

        <Button
          mode="contained"
          style={Style.button}
          uppercase={false}
          labelStyle={Style.buttonLabel}
          onPress={() => props.navigation.navigate("Register")}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
