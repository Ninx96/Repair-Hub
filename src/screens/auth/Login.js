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

const Login = (props) => {
  const { type } = props.route.params;
  const [secureText, setSecureText] = useState(true);
  const [params, setParams] = useState({
    email: "",
    password: "",
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
            style={{ height: 100, width: 150 }}
          />
        </View>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Phone/Email</Text>
            <TextInput
              disabled={loading}
              error={error.email ? true : false}
              mode="outlined"
              placeholder="Enter Phone/Email"
              style={Style.input}
              onChangeText={(text) => setParams({ ...params, email: text })}
            />
            {error.email ? (
              <Text style={Style.textError}>{error?.email}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Password</Text>
            <TextInput
              disabled={loading}
              error={error.password ? true : false}
              mode="outlined"
              placeholder="Enter Password"
              style={Style.input}
              secureTextEntry={secureText}
              onChangeText={(text) => setParams({ ...params, password: text })}
              right={
                <TextInput.Icon
                  name={secureText ? "eye" : "eye-off"}
                  onPress={() => setSecureText(!secureText)}
                />
              }
            />
            {error.password ? (
              <Text style={Style.textError}>{error?.password}</Text>
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
                  type == "client" ? "client-login" : "vendor-login",
                  form_data
                ).then((res) => {
                  console.log(res);
                  setLoading(false);
                  if (res.s) {
                    return props.navigation.navigate("Otp", {
                      user: res.data,
                      type: type,
                    });
                  }

                  setError(res.error);
                });
              }
              setLoading(false);
            }}
          >
            Login
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

export default Login;
