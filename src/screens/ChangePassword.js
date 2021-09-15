import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../components/ContextComponent";
import { postRequest } from "../services/RequestServices";
import Style from "../styles/Style";

const ChangePassword = () => {
  const { getSession } = useContext(AuthContext);
  const { userType, userToken } = getSession();
  const [error, setError] = useState({});
  const [params, setParams] = useState({});
  const [showMessage, setShowMessage] = useState(null);
  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={Style.form}>
          <Text style={[Style.heading, { marginBottom: 20 }]}>
            Change Password
          </Text>
        </View>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Old Password</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Old Password"
              style={Style.input}
              error={error.old_password ? true : false}
              onChangeText={(text) =>
                setParams({ ...params, old_password: text })
              }
            />
            {error.old_password ? (
              <Text style={Style.textError}>{error?.old_password}</Text>
            ) : null}
          </View>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter New Password</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Password"
              style={Style.input}
              secureTextEntry={true}
              error={error.new_password ? true : false}
              onChangeText={(text) =>
                setParams({ ...params, new_password: text })
              }
            />
            {error.new_password ? (
              <Text style={Style.textError}>{error?.new_password}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Confirm New Password</Text>
            <TextInput
              mode="outlined"
              placeholder="Confirm Password"
              style={Style.input}
              error={error.confirm_password ? true : false}
              onChangeText={(text) =>
                setParams({ ...params, confirm_password: text })
              }
            />
            {error.confirm_password ? (
              <Text style={Style.textError}>{error?.confirm_password}</Text>
            ) : null}
          </View>
          <Button
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              const form_data = new FormData();
              form_data.append("client_id", userToken);
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
                postRequest(
                  userType == "client"
                    ? "client-change-password"
                    : "vendor-change-password",
                  form_data
                ).then((res) => {
                  setParams({});
                  if (res.s) {
                    return setShowMessage({
                      msg: "Password Updated Successfully..!",
                    });
                  }
                  setError(res.error);
                });
              }
            }}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={showMessage}
        style={{ backgroundColor: "#5cb85c" }}
        onDismiss={() => setShowMessage(null)}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>
          {showMessage?.msg}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default ChangePassword;
