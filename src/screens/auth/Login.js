import React, { useState, useEffect, useContext } from "react";
import { Image, SafeAreaView, View, ScrollView } from "react-native";
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

const Login = (props) => {
  const { type } = props.route.params;
  const { signIn } = useContext(AuthContext);
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
            style={{ height: 100, width: 200 }}
          />
        </View>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Username</Text>
            <TextInput
              disabled={loading}
              error={error.email ? true : false}
              mode="outlined"
              placeholder="Enter Username"
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

          <View style={{ flexDirection: "row" }}>
            <Button
              mode="text"
              labelStyle={{ fontSize: 25 }}
              uppercase={false}
              onPress={() =>
                props.navigation.navigate("ForgotPassword", { type: type })
              }
            >
              Forgot password ?
            </Button>
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
                    return signIn({
                      type: "LOGIN",
                      userToken: res.data.id,
                      userType: type,
                      user: res.data,
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

export default Login;
