import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  DataTable,
  IconButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import * as Location from "expo-location";

import { AuthContext } from "../../components/ContextComponent";
import DropDown from "../../components/DropDownComponent";
import MultipleImages from "../../components/MultipleImages";
import { postRequest, taskImages } from "../../services/RequestServices";
import Style from "../../styles/Style";

const TaskDetails = (props) => {
  const { siteDetails } = props.route.params;
  const { getSession, updateUser } = useContext(AuthContext);
  const { user, userType } = getSession();
  const [showMessage, setShowMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});
  const [param, setParam] = useState({
    campaign_id: "",
    site_address: "",
    site_area_name: "",
    site_city_id: "",
    site_state_id: "",
    medium_id: "",
    medium_type_id: "",
    size_w: "",
    size_h: "",
    free_size: "",
    nos: "",
    total_area_in_sqft: "",
    remarks: "",
    ...siteDetails,
  });

  //components

  const [images, setImages] = useState([]);

  // utility

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [medium, setMedium] = useState([]);
  const [mediumtype, setMediumtype] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const imgs = siteDetails.site_images.split(",");
    imgs.forEach((img) => {
      images.push({ uri: taskImages + img });
    });
    setImages([...images]);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    postRequest("state-all-active").then((res) => {
      if (res.s) {
        setState(res.data);
      }
    });
    const form_data = new FormData();
    form_data.append("state_id", siteDetails.site_state_id);
    postRequest("city-all-active", form_data).then((res) => {
      if (res.s) {
        setCity(res.data);
      }
    });
    postRequest("medium-all-active").then((res) => {
      if (res.s) {
        setMedium(res.data);
      }
    });
    postRequest("medium-type-all-active").then((res) => {
      if (res.s) {
        setMediumtype(res.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={[Style.heading, { marginBottom: 20 }]}>Site Details</Text>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>State</Text>
            <DropDown
              disabled
              mode="outlined"
              placeholder="Select State"
              style={Style.input}
              data={state}
              exLabel="state"
              exValue="id"
              value={param?.site_state_id}
              onChange={(text) => {
                setParam({ ...param, site_state_id: text });
                const form_data = new FormData();
                form_data.append("state_id", text);
                postRequest("city-all-active").then((res) => {
                  if (res.s) {
                    setCity(res.data);
                  }
                });
              }}
              error={error.site_state_id ? true : false}
            />
            {error.task_state_id ? (
              <Text style={Style.textError}>{error?.site_state_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>City</Text>
            <DropDown
              disabled
              mode="outlined"
              placeholder="Select State"
              style={Style.input}
              data={city}
              exLabel="name"
              exValue="id"
              value={param?.site_city_id}
              onChange={(text) => {
                setParam({ ...param, site_city_id: text });
              }}
              error={error.site_city_id ? true : false}
            />
            {error.site_city_id ? (
              <Text style={Style.textError}>{error?.site_city_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>District/Block</Text>
            <TextInput
              disabled
              mode="outlined"
              placeholder="Address line"
              style={Style.input}
              value={param?.site_address}
              onChangeText={(text) =>
                setParam({ ...param, site_address: text })
              }
              error={error.site_address ? true : false}
            />
            {error.site_address ? (
              <Text style={Style.textError}>{error?.site_address}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Exact Location</Text>
            <TextInput
              disabled
              multiline
              numberOfLines={2}
              mode="outlined"
              placeholder="Area name"
              style={Style.input}
              value={param?.site_area_name}
              onChangeText={(text) =>
                setParam({ ...param, site_area_name: text })
              }
              error={error.site_area_name ? true : false}
            />
            {error.site_area_name ? (
              <Text style={Style.textError}>{error?.site_area_name}</Text>
            ) : null}
          </View>
        </View>
        <Text style={[Style.heading, { marginBottom: 20 }]}>
          Product Details
        </Text>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Medium</Text>
            <DropDown
              disabled
              mode="outlined"
              placeholder="Select Medium"
              data={medium}
              exLabel="name"
              exValue="id"
              style={Style.input}
              value={param?.medium_id}
              onChange={(text) => setParam({ ...param, medium_id: text })}
              error={error.medium_id ? true : false}
            />
            {error.medium_id ? (
              <Text style={Style.textError}>{error?.medium_id}</Text>
            ) : null}
          </View>
          <View style={Style.formControl}>
            <Text style={Style.label}>Medium Type</Text>
            <DropDown
              disabled
              mode="outlined"
              placeholder="Select Medium Type"
              data={mediumtype}
              exLabel="name"
              exValue="id"
              style={Style.input}
              value={param?.medium_type_id}
              onChange={(text) => setParam({ ...param, medium_type_id: text })}
              error={error.medium_type_id ? true : false}
            />
            {error.medium_type_id ? (
              <Text style={Style.textError}>{error?.medium_type_id}</Text>
            ) : null}
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={[Style.formControl, { width: "49%" }]}>
              <Text style={Style.label}>Size(W)</Text>
              <TextInput
                disabled
                keyboardType="number-pad"
                mode="outlined"
                placeholder="Enter Size(W)"
                style={[Style.input]}
                maxLength={6}
                value={param?.size_w}
                onChangeText={(text) => {}}
                error={error.size_w ? true : false}
              />
              {error.size_w ? (
                <Text style={Style.textError}>{error?.size_w}</Text>
              ) : null}
            </View>

            <View style={[Style.formControl, { width: "49%" }]}>
              <Text style={Style.label}>Size(H)</Text>
              <TextInput
                disabled
                keyboardType="number-pad"
                mode="outlined"
                placeholder="Enter Size(H)"
                style={Style.input}
                value={param?.size_h}
                onChangeText={(text) => setParam({ ...param, size_h: text })}
                error={error.size_h ? true : false}
              />
              {error.size_h ? (
                <Text style={Style.textError}>{error?.size_h}</Text>
              ) : null}
            </View>
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Free Size</Text>
            <TextInput
              disabled
              mode="outlined"
              placeholder="Enter Free Size"
              style={Style.input}
              value={param?.free_size}
              onChangeText={(text) => setParam({ ...param, free_size: text })}
              error={error.free_size ? true : false}
            />
            {error.free_size ? (
              <Text style={Style.textError}>{error?.free_size}</Text>
            ) : null}
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={[Style.formControl, { width: "49%" }]}>
              <Text style={Style.label}>NOS.</Text>
              <TextInput
                disabled
                keyboardType="number-pad"
                mode="outlined"
                placeholder="Enter NOS."
                style={Style.input}
                value={String(param?.nos)}
                onChangeText={(text) => setParam({ ...param, nos: text })}
                error={error.nos ? true : false}
              />
              {error.nos ? (
                <Text style={Style.textError}>{error?.nos}</Text>
              ) : null}
            </View>

            <View style={[Style.formControl, { width: "49%" }]}>
              <Text style={Style.label}>TOTAL SQ.FT.</Text>
              <TextInput
                disabled
                keyboardType="number-pad"
                mode="outlined"
                placeholder="Enter TOTAL SQ.FT."
                style={Style.input}
                value={param?.total_area_in_sqft}
                onChangeText={(text) =>
                  setParam({ ...param, total_area_in_sqft: text })
                }
                error={error.total_area_in_sqft ? true : false}
              />
              {error.total_area_in_sqft ? (
                <Text style={Style.textError}>{error?.total_area_in_sqft}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={Style.form}>
          <Text style={[Style.heading, { marginBottom: 20 }]}>
            Site Images To Upload
          </Text>
          <MultipleImages
            disabled={userType == "client"}
            data={images}
            onSelect={(filesArray) => {
              setImages([...images, ...filesArray]);
            }}
            onClear={() => setImages([])}
          />
        </View>

        <View style={Style.form}>
          {/* <Text style={[Style.heading, { marginBottom: 20 }]}>
            Any Information Or Remarks For Vendors
          </Text>
          <View style={Style.formControl}>
            <Text style={Style.label}>Remarks</Text>
            <TextInput
              disabled={userType == "client"}
              mode="outlined"
              placeholder="Enter Remarks"
              multiline
              numberOfLines={3}
              style={Style.input}
              value={param?.remarks}
              onChangeText={(text) => setParam({ ...param, remarks: text })}
              error={error.remarks ? true : false}
            />
            {error.remarks ? (
              <Text style={Style.textError}>{error?.remarks}</Text>
            ) : (
              <Text style={Style.textWarning}>
                MAXIMUM 250 CHARACTERS ALLOWED
              </Text>
            )}
          </View> */}

          <Button
            disabled={userType == "client" || !location}
            loading={loading}
            mode="contained"
            style={Style.button}
            uppercase={false}
            labelStyle={Style.buttonLabel}
            onPress={() => {
              setLoading(true);
              var validation = {};
              var proceed = true;
              const form_data = new FormData();
              form_data.append("file", images);
              form_data.append("latitude", location?.coords?.latitude);
              form_data.append("longitude", location?.coords?.longitude);
              for (let i in param) {
                if (!param[i]) {
                  validation[i] = "This field is required";
                  proceed = false;
                }
                form_data.append(i, param[i]);
              }
              setError({ ...validation });
              if (proceed) {
                return postRequest("campaign-site-create", form_data).then(
                  (res) => {
                    setLoading(false);

                    if (res.s) {
                      setError({
                        msg: "Site Added Successfully..!",
                      });
                      setTimeout(() => props.navigation.goBack(), 500);
                      return;
                    }
                    if (res.error) {
                      setError(res.error);
                    }
                  }
                );
              }
              setLoading(false);
            }}
          >
            Save
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

export default TaskDetails;
