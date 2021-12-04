import React, { useState, useEffect, useContext } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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

const Register = (props) => {
  const { signIn } = useContext(AuthContext);

  const { type } = props.route.params;
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    company_name: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

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

        <Text style={[Style.heading, { marginBottom: 20 }]}>
          Create Account
        </Text>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>
              {type == "client" ? "Company Name" : "Name"}
            </Text>
            <TextInput
              disabled={loading}
              error={error.company_name ? true : false}
              mode="outlined"
              placeholder="Enter Full Name"
              style={Style.input}
              onChangeText={(text) =>
                setParams({ ...params, company_name: text, name: text })
              }
            />
            {error.company_name || error.name ? (
              <Text style={Style.textError}>
                {error?.company_name || error?.name}
              </Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Phone Number</Text>
            <TextInput
              disabled={loading}
              error={error.mobile ? true : false}
              mode="outlined"
              placeholder="Enter Phone Number"
              style={Style.input}
              onChangeText={(text) => setParams({ ...params, mobile: text })}
            />
            {error.mobile ? (
              <Text style={Style.textError}>{error?.mobile}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Email Address</Text>
            <TextInput
              disabled={loading}
              error={error.email ? true : false}
              mode="outlined"
              placeholder="Enter Email Address"
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
              secureTextEntry={true}
              onChangeText={(text) => setParams({ ...params, password: text })}
            />
            {error.password ? (
              <Text style={Style.textError}>{error?.password}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Confirm Password</Text>
            <TextInput
              disabled={loading}
              error={error.confirm_password ? true : false}
              mode="outlined"
              placeholder="Confirm Password"
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
              var proceed = true;
              var validation = {};
              for (let i in params) {
                if (!params[i]) {
                  validation[i] = "This field is required";
                  proceed = false;
                }
                if (params.password != params.confirm_password) {
                  validation.confirm_password =
                    "Confirm password should be same as password";
                }
                form_data.append(i, params[i]);
              }
              setError({ ...validation });
              if (proceed) {
                return postRequest(
                  type == "client" ? "client-register" : "vendor-register",
                  form_data
                ).then((res) => {
                  setLoading(false);
                  if (res.s) {
                    // return props.navigation.navigate("Otp", {
                    //   user: res.data,
                    //   type: type,
                    //   isForget: false,
                    // });

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
            Sign Up
          </Button>
        </View>

        <View style={[Style.form, { marginVertical: "10%" }]}>
          <Text style={{ fontSize: 25 }}>
            By Signing up you are agreeing to our{" "}
          </Text>
          <Button mode="text" uppercase={false} labelStyle={{ fontSize: 25 }}>
            Terms & Conditions
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

export default Register;
