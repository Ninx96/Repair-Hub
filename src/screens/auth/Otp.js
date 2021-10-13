import React, { useState, useEffect, useContext } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  IconButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Otp = (props) => {
  const { signIn } = useContext(AuthContext);
  const { type, user, isForget } = props.route.params;
  const [param, setParam] = useState({ otp: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    const ticket = setTimeout(() => {
      const counter = timer;
      if (counter) {
        setTimer(counter - 1);
        return;
      }
      clearTimeout(ticket);
    }, 1000);
    return () => {
      clearTimeout(ticket);
    };
  }, [timer]);
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
            style={{ height: 100, width: 200 }}
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
              disabled={loading}
              keyboardType="number-pad"
              maxLength={6}
              mode="outlined"
              placeholder="Enter 6 Digit OTP"
              style={Style.input}
              onChangeText={(text) => setParam({ ...param, otp: text })}
              error={error.otp ? true : false}
            />
            {error.otp ? (
              <Text style={Style.textError}>{error?.otp}</Text>
            ) : null}
          </View>
          <View style={Style.formControl}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25 }}>0:{timer}</Text>
              <Button
                disabled={timer}
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
              setLoading(true);
              if (param.otp.length == 6) {
                const form_data = new FormData();
                if (type == "client") {
                  form_data.append("client_id", user.id);
                } else {
                  form_data.append("vendor_id", user.id);
                }
                form_data.append("otp", param.otp);
                postRequest(
                  type == "client"
                    ? "client-otp-verification"
                    : "vendor-otp-verification",
                  form_data
                ).then((res) => {
                  setLoading(false);
                  console.log(res);
                  if (res.s) {
                    if (isForget) {
                      return props.navigation.navigate("ResetPassword", {
                        user,
                        type,
                      });
                    }
                    return signIn({
                      type: "LOGIN",
                      userToken: user.id,
                      userType: type,
                      user: user,
                    });
                  }
                  if (res.error) {
                    return setError(res.error);
                  }
                  setError({ msg: res.msg });
                });
              } else {
                setError({ otp: "Please enter 6 digit OTP" });
              }
              setLoading(false);
            }}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={error.msg}
        style={{ backgroundColor: "#d9534f" }}
        onDismiss={() => setError({})}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>{error?.msg}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default Otp;
