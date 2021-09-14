import React, { useState, useEffect, useContext } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Otp = (props) => {
  const { signIn } = useContext(AuthContext);
  const { type, user } = props.route.params;
  const [param, setParam] = useState({ otp: "" });
  return (
    <SafeAreaView style={Style.container}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <IconButton
          icon="chevron-left"
          size={35}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ marginBottom: "20%" }}>
          <Image
            source={require("../../../assets/img/logo.png")}
            style={{ height: 100, width: 150 }}
          />
        </View>
        <View style={[Style.form, { marginBottom: 20 }]}>
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
              onChangeText={(text) => setParam({ ...param, otp: text })}
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
              <Button
                mode="text"
                uppercase={false}
                labelStyle={{ fontSize: 25 }}
              >
                Send Again
              </Button>
            </View>
          </View>

          <Button
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              if (param.otp == "123456") {
                return signIn({
                  type: "LOGIN",
                  userToken: user.id,
                  userType: type,
                  user: user,
                });
              }
            }}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
