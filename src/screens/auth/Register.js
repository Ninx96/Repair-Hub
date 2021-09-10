import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Register = (props) => {
  const { type } = props.route.params;
  const [error, setError] = useState({});
  const [params, setParams] = useState({
    company_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

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

        <View style={{ marginBottom: "20%" }}>
          <Image
            source={require("../../../assets/img/logo.png")}
            style={{ height: 100, width: 150 }}
          />
        </View>

        <Text style={Style.heading}>Create Account</Text>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Company Name</Text>
            <TextInput
              error={error.company_name ? true : false}
              mode="outlined"
              placeholder="Enter Full Name"
              style={Style.input}
              onChangeText={(text) =>
                setParams({ ...params, company_name: text })
              }
            />
            {error.company_name ? (
              <Text style={Style.textError}>{error?.company_name}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Phone Number</Text>
            <TextInput
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
              error={error.password ? true : false}
              mode="outlined"
              placeholder="Enter Password"
              style={Style.input}
              secureTextEntry={true}
              onChangeText={(text) => setParams({ ...params, password: text })}
            />
            {error.password ? (
              <Text style={Style.textError}>{error?.email}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Confirm Password</Text>
            <TextInput
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
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              const form_data = new FormData();
              for (let i in params) {
                form_data.append(i, params[i]);
              }
              postRequest("client-register", form_data).then((res) => {
                if (res.s) {
                  return;
                }
                setError(res.error);
              });
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
