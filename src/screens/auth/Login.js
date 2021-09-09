import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  const [error, setError] = useState(null);

  return (
    <ScrollView>
      <SafeAreaView style={Style.container}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <IconButton
            icon="chevron-left"
            size={35}
            onPress={() => props.navigation.goBack()}
          />
        </View>

        <View style={{ marginBottom: "40%" }}>
          <Image
            source={require("../../../assets/img/logo.png")}
            style={{ height: 100, width: 150 }}
          />
        </View>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Phone/Email</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Phone/Email"
              style={Style.input}
              onChangeText={(text) => setParams({ ...params, email: text })}
            />
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Password</Text>
            <TextInput
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
          </View>

          <Button
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              const form_data = new FormData();
              for (let i in params) {
                form_data.append(i, params[i]);
              }
              postRequest("client-login", form_data).then((res) => {
                console.log(res);
                if (res.s) {
                  return props.navigation.navigate("Otp");
                }
                setError(res);
              });
            }}
          >
            Login
          </Button>
        </View>

        <View style={[Style.form, { marginVertical: "20%" }]}>
          <Text style={[Style.textRegular, { textAlign: "center" }]}>
            Don't have an Account ?
          </Text>
          <Button
            mode="text"
            uppercase={false}
            labelStyle={{ fontSize: 25 }}
            onPress={() => props.navigation.navigate("Register")}
          >
            Sign Up
          </Button>
        </View>
        <Snackbar
          visible={error}
          style={{ backgroundColor: "#d9534f" }}
          onDismiss={() => setError(null)}
        >
          <Text style={[Style.textRegular, { color: "#FFF" }]}>
            {error?.msg}
          </Text>
        </Snackbar>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
