import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import Style from "../styles/Style";

const Profile = () => {
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.heading}>My Profile</Text>

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

        <Text style={Style.heading}>My Addresses</Text>
        <View style={{ marginVertical: 20 }}>
          <Card style={{ padding: 20, backgroundColor: "#F5F5F5" }}>
            <Text style={Style.textBig}>Office</Text>
            <Text style={[Style.textRegular, { color: "#888" }]}>
              1124, Red fort villas, Hamilton
            </Text>
          </Card>

          <Button
            mode="outlined"
            style={[Style.button, { borderWidth: 1.5, borderColor: "#4285F4" }]}
            uppercase={false}
            labelStyle={Style.buttonLabel}
          >
            Add New Address
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
