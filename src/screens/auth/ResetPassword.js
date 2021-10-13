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

const ResetPassword = (props) => {
  const { type, user } = props.route.params;
  const [params, setParams] = useState({
    new_password: "",
    is_forgot: 1,
    confirm_password: "",
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
          Reset Password
        </Text>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter New Password</Text>
            <TextInput
              secureTextEntry
              disabled={loading}
              error={error.new_password ? true : false}
              mode="outlined"
              placeholder="Enter Password"
              style={Style.input}
              onChangeText={(text) =>
                setParams({ ...params, new_password: text })
              }
            />
            {error.mobile ? (
              <Text style={Style.textError}>{error?.mobile}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Re-enter New Password</Text>
            <TextInput
              disabled={loading}
              error={error.confirm_password ? true : false}
              mode="outlined"
              placeholder="Re-enter Password"
              style={Style.input}
              onChangeText={(text) =>
                setParams({ ...params, confirm_password: text })
              }
            />
            {error.confirm_password ? (
              <Text style={Style.textError}>{error?.confirm_password}</Text>
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
              if (type == "client") {
                form_data.append("client_id", user.id);
              } else {
                form_data.append("vendor_id", user.id);
              }
              var proceed = true;
              var validation = {};
              for (let i in params) {
                if (!params[i]) {
                  validation[i] = "This field is required";
                  proceed = false;
                }
                form_data.append(i, params[i]);
              }
              if (params.new_password !== params.confirm_password) {
                validation[confirm_password] = "should be same as new password";
              }
              setError({ ...validation });
              if (proceed) {
                return postRequest(
                  type == "client"
                    ? "client-reset-password"
                    : "vendor-reset-password",
                  form_data
                ).then((res) => {
                  console.log(res);
                  setLoading(false);
                  if (res.s) {
                    return props.navigation.navigate("Login", { type });
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

export default ResetPassword;
