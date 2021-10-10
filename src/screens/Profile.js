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
    company_name: user.company_name,
    name: user.name,
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [showMessage, setShowMessage] = useState(null);

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
          <View style={{ marginVertical: 20 }}>
            <Card style={{ padding: 20, backgroundColor: "#F5F5F5" }}>
              <Text style={Style.textBig}>Office</Text>
              <Text style={[Style.textRegular, { color: "#888" }]}>
                {param.address || user.address},{" "}
                {param.area_name || user.area_name},{" "}
                {param.city_name || user.city_name}, {param.state || user.state}{" "}
                - {param.pincode || user.pincode}
              </Text>
            </Card>

            {error.address ? (
              <Text style={Style.textError}>{error?.address}</Text>
            ) : null}

            {error.area_name ? (
              <Text style={Style.textError}>{error?.area_name}</Text>
            ) : null}

            {error.city_name ? (
              <Text style={Style.textError}>{error?.city_name}</Text>
            ) : null}

            {error.state_id ? (
              <Text style={Style.textError}>{error?.state_id}</Text>
            ) : null}

            {error.pincode ? (
              <Text style={Style.textError}>{error?.pincode}</Text>
            ) : null}

            <Button
              disabled={loading}
              mode="outlined"
              style={[
                Style.button,
                { borderWidth: 1.5, borderColor: "#282f80" },
              ]}
              uppercase={false}
              labelStyle={Style.buttonLabel}
              onPress={() => {
                setAddress({
                  address: "",
                  area_name: "",
                  city_name: "",
                  state: "",
                  state_id: "",
                  city_id: "",
                  pincode: "",
                });
              }}
            >
              Add New Address
            </Button>
          </View>

          <Button
            loading={loading}
            disabled={loading}
            mode="contained"
            style={[Style.button, { borderWidth: 1.5, borderColor: "#4285F4" }]}
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
                  proceed = false;
                }
                form_data.append(i, param[i]);
              }
              setError({ ...validation });
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
                    });
                    setShowMessage({
                      msg: "Profile Updated Successfully..!",
                    });
                    return;
                  }
                  setError(res.error);
                });
              }
              setLoading(false);
            }}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={address}
          dismissable={false}
          contentContainerStyle={[Style.container, { paddingTop: 0 }]}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
            <IconButton
              icon="chevron-left"
              size={35}
              onPress={() => setAddress(null)}
            />
          </View>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={Style.form}>
              <View style={Style.formControl}>
                <Text style={Style.label}>Address</Text>
                <TextInput
                  multiline
                  numberOfLines={2}
                  mode="outlined"
                  placeholder="Enter Address"
                  style={Style.input}
                  onChangeText={(text) =>
                    setAddress({ ...address, address: text })
                  }
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
                  onChangeText={(text) =>
                    setAddress({ ...address, area_name: text })
                  }
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
                  onChangeText={(text) => {
                    if (!isNaN(text) && text.length == 6) {
                      const form_data = new FormData();
                      form_data.append("pincode", text);
                      postRequest(
                        "get-city-state-from-pincode",
                        form_data
                      ).then((res) => {
                        if (res.s) {
                          setAddress({
                            ...address,
                            city_name: res.city,
                            state: res.state,
                            state_id: res.state_id,
                            city_id: res.city_id,
                            pincode: text,
                          });
                        }
                      });
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
                  value={address?.city_name}
                  onChangeText={(text) =>
                    setAddress({ ...address, city_name: text })
                  }
                  error={error.address ? true : false}
                />
                {error.pincode ? (
                  <Text style={Style.textError}>{error?.pincode}</Text>
                ) : null}
              </View>

              <View style={Style.formControl}>
                <Text style={Style.label}>State</Text>
                <TextInput
                  disabled
                  mode="outlined"
                  placeholder="Enter State"
                  style={Style.input}
                  value={address?.state}
                />
              </View>

              <Button
                mode="contained"
                style={Style.button}
                uppercase={false}
                labelStyle={Style.buttonLabel}
                onPress={() => {
                  var validation = {};
                  var proceed = true;
                  for (let i in address) {
                    if (!address[i]) {
                      validation[i] = "This field is required";
                      proceed = false;
                    }
                  }
                  setError({ ...validation });
                  if (proceed) {
                    setParam({ ...param, ...address });
                    setAddress(null);
                  }
                }}
              >
                Save
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
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

export default Profile;
