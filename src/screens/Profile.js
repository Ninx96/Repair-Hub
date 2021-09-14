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
  const [modal, setModal] = useState(false);
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
              mode="outlined"
              style={[
                Style.button,
                { borderWidth: 1.5, borderColor: "#4285F4" },
              ]}
              uppercase={false}
              labelStyle={Style.buttonLabel}
              onPress={() => {
                setModal(true);
              }}
            >
              Add New Address
            </Button>
          </View>

          <Button
            mode="contained"
            style={[Style.button, { borderWidth: 1.5, borderColor: "#4285F4" }]}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              const form_data = new FormData();
              for (let i in param) {
                form_data.append(i, param[i]);
              }
              postRequest(
                userType == "client"
                  ? "client-edit-profile"
                  : "vendor-edit-profile",
                form_data
              ).then((res) => {
                console.log(res);
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
                }
                setError(res.error);
              });
            }}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={modal}
          dismissable={false}
          contentContainerStyle={[Style.container, { paddingTop: 0 }]}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
            <IconButton
              icon="chevron-left"
              size={35}
              onPress={() => setModal(false)}
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
                  onChangeText={(text) => setParam({ ...param, address: text })}
                />
              </View>

              <View style={Style.formControl}>
                <Text style={Style.label}>Area</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Enter Area"
                  style={Style.input}
                  onChangeText={(text) =>
                    setParam({ ...param, area_name: text })
                  }
                />
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
                          setParam({
                            ...param,
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
                />
              </View>

              <View style={Style.formControl}>
                <Text style={Style.label}>City</Text>
                <TextInput
                  disabled
                  mode="outlined"
                  placeholder="Enter City"
                  style={Style.input}
                  value={param.city_name}
                />
              </View>

              <View style={Style.formControl}>
                <Text style={Style.label}>State</Text>
                <TextInput
                  disabled
                  mode="outlined"
                  placeholder="Enter State"
                  style={Style.input}
                  value={param.state}
                />
              </View>

              <Button
                mode="contained"
                style={Style.button}
                uppercase={false}
                labelStyle={Style.buttonLabel}
                onPress={() => setModal(false)}
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
