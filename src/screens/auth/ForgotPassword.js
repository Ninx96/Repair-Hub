import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View, ScrollView } from "react-native";
import {
  Button,
  IconButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const ForgotPassword = (props) => {
  const { type } = props.route.params;
  const [secureText, setSecureText] = useState(true);
  const [params, setParams] = useState({
    mobile: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

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

        <Text style={[Style.heading, { marginBottom: "10%" }]}>
          Forgot Password
        </Text>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Phone Number</Text>
            <TextInput
              disabled={loading}
              error={error.mobile ? true : false}
              mode="outlined"
              placeholder="Enter Phone"
              style={Style.input}
              onChangeText={(text) => setParams({ ...params, mobile: text })}
            />
            {error.mobile ? (
              <Text style={Style.textError}>{error?.mobile}</Text>
            ) : null}
          </View>

          <Button
            disabled={loading}
            loading={loading}
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              setLoading(true);
              const form_data = new FormData();
              var proceed = true;
              var validation = {};
              for (let i in params) {
                if (!params[i]) {
                  validation[i] = "This field is required";
                  proceed = false;
                }
                form_data.append(i, params[i]);
              }
              setError({ ...validation });
              if (proceed) {
                return postRequest(
                  type == "client"
                    ? "client-forgot-password"
                    : "vendor-forgot-password",
                  form_data
                ).then((res) => {
                  setLoading(false);
                  if (res.s) {
                    return props.navigation.navigate("Otp", {
                      user: res.data,
                      type: type,
                      isForget: true,
                    });
                  }
                  if (res.error) {
                    return setError(res.error);
                  }
                  setError({ msg: res.msg });
                });
              }
              setLoading(false);
            }}
          >
            Submit
          </Button>
        </View>

        <View style={[Style.form, { marginVertical: "10%" }]}>
          <Text style={[Style.textRegular, { textAlign: "center" }]}>
            Don't have an Account ?
          </Text>
          <Button
            mode="text"
            uppercase={false}
            labelStyle={{ fontSize: 25 }}
            onPress={() =>
              props.navigation.navigate("Register", { type: type })
            }
          >
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
