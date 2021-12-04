import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Card,
  Text,
  TextInput,
  Button,
  Portal,
  Modal,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { AuthContext } from "../components/ContextComponent";
import { postRequest } from "../services/RequestServices";
import Style from "../styles/Style";

const Profile = () => {
  const { getSession, updateUser } = useContext(AuthContext);
  const { user, userType } = getSession();
  const [param, setParam] = useState({
    id: user.id,
    gst_no: user.gst_no,
    pan_no: user.pan_no,
    company_name: user.company_name,
    name: user.name,
    address: user.address,
    area_name: user.area_name,
    city_name: user.city_name,
    state: user.state,
    pincode: user.pincode,
    state_id: user.state_id,
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const addrVal = {
    address: user.address,
    area_name: user.area_name,
    city_name: user.city_name,
    state: user.state,
    pincode: user.pincode,
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={[Style.heading, { marginBottom: 20 }]}>My Profile</Text>

        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>
              {userType == "client" ? "Company Name" : "Full Name"}
            </Text>
            <TextInput
              disabled={loading}
              mode="outlined"
              placeholder="Enter Full Name"
              style={Style.input}
              value={param.name || param.company_name}
              onChangeText={(text) =>
                setParam({ ...param, company_name: text, name: text })
              }
              error={error.company_name || error.name ? true : false}
            />
            {error.company_name || error.name ? (
              <Text style={Style.textError}>
                {error?.company_name || error?.name}
              </Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>GST Number</Text>
            <TextInput
              disabled={loading}
              mode="outlined"
              placeholder="GST Number"
              style={Style.input}
              value={param.gst_no}
              onChangeText={(text) => setParam({ ...param, gst_no: text })}
              error={error.gst_no ? true : false}
            />
            {error.gst_no ? (
              <Text style={Style.textError}>{error?.gst_no}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>PAN Number</Text>
            <TextInput
              disabled={loading}
              mode="outlined"
              placeholder="Enter PAN"
              style={Style.input}
              value={param.pan_no}
              onChangeText={(text) => setParam({ ...param, pan_no: text })}
              error={error.pan_no ? true : false}
            />
            {error.pan_no ? (
              <Text style={Style.textError}>{error?.pan_no}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Phone Number</Text>
            <TextInput
              disabled
              mode="outlined"
              placeholder="Enter Phone Number"
              style={Style.input}
              value={user.mobile}
              onChangeText={(text) => setParam({ ...param, mobile: text })}
            />
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Email Address</Text>
            <TextInput
              disabled
              mode="outlined"
              placeholder="Enter Email Address"
              style={Style.input}
              value={user.email}
            />
          </View>

          <Text style={Style.heading}>My Addresses</Text>

          <View style={Style.formControl}>
            <Text style={Style.label}>Address</Text>
            <TextInput
              multiline
              numberOfLines={2}
              mode="outlined"
              placeholder="Enter Address"
              style={Style.input}
              value={param?.address}
              onChangeText={(text) => setParam({ ...param, address: text })}
              error={error.address ? true : false}
            />
            {error.address ? (
              <Text style={Style.textError}>{error?.address}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Area</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Area"
              style={Style.input}
              value={param?.area_name}
              onChangeText={(text) => setParam({ ...param, area_name: text })}
              error={error.area_name ? true : false}
            />
            {error.area_name ? (
              <Text style={Style.textError}>{error?.area_name}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Pincode</Text>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter Pincode"
              style={Style.input}
              maxLength={6}
              value={param?.pincode}
              onChangeText={(text) => {
                setParam({ ...param, pincode: text });
                if (!isNaN(text) && text.length == 6) {
                  const form_data = new FormData();
                  form_data.append("pincode", text);
                  postRequest("get-city-state-from-pincode", form_data).then(
                    (res) => {
                      if (res.s) {
                        setParam({
                          ...param,
                          city_name: res.city,
                          state: res.state,
                          state_id: res.state_id,
                          city_id: res.city_id,
                          pincode: text,
                        });
                      }
                    }
                  );
                }
              }}
              error={error.pincode ? true : false}
            />
            {error.pincode ? (
              <Text style={Style.textError}>{error?.pincode}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>City</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter City"
              style={Style.input}
              value={param?.city_name}
              onChangeText={(text) => setParam({ ...param, city_name: text })}
              error={error.city_name ? true : false}
            />
            {error.city_name ? (
              <Text style={Style.textError}>{error?.city_name}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>State</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter State"
              style={Style.input}
              value={param?.state}
              onChangeText={(text) => setParam({ ...param, state: text })}
              error={error.state ? true : false}
            />
            {error.state ? (
              <Text style={Style.textError}>{error?.state}</Text>
            ) : null}
          </View>

          <Button
            loading={loading}
            disabled={loading}
            mode="contained"
            style={[Style.button, { borderWidth: 1.5, borderColor: "#282f80" }]}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              setLoading(true);
              const form_data = new FormData();
              var proceed = true;
              var validation = {};
              for (let i in param) {
                if (!param[i]) {
                  validation[i] = "This field is required";
                }
                form_data.append(i, param[i]);
              }

              if (userType == "client") {
                delete validation.name;
              } else {
                delete validation.company_name;
              }
              delete validation.pan_no;
              delete validation.gst_no;
              delete validation.state_id;

              if (Object.keys(validation).length) {
                proceed = false;
                setError({ ...validation });
              }
              if (proceed) {
                return postRequest(
                  userType == "client"
                    ? "client-edit-profile"
                    : "vendor-edit-profile",
                  form_data
                ).then((res) => {
                  setLoading(false);
                  if (res.s) {
                    updateUser({
                      ...user,
                      company_name: param.company_name,
                      address: param.address,
                      city_id: param.city_id,
                      city_name: param.city_name,
                      state_id: param.state_id,
                      pincode: param.pincode,
                      pan_no: param.pan_no,
                      gst_no: param.gst_no,
                    });
                    setError({
                      msg: "Profile Updated Successfully..!",
                    });
                    return;
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
            Save Changes
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={error.msg}
        style={{ backgroundColor: "#5cb85c" }}
        onDismiss={() => setError({})}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>{error?.msg}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default Profile;
