import { NavigationContainer } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, FlatList, ScrollView, Image } from "react-native";
import {
  Badge,
  Button,
  Card,
  DataTable,
  FAB,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import Swiper from "react-native-swiper";
import _ from "lodash";

import { AuthContext } from "../../components/ContextComponent";
import DatePicker from "../../components/DatePicker";
import DropDown from "../../components/DropDownComponent";
import ImageView from "../../components/ImageView";
import { postRequest, taskImages } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Sites = (props) => {
  const {
    campaign_id,
    campaign_name,
    status_id,
    start_date,
    end_date,
    city,
    state,
    params,
  } = props.route.params;
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getAsync = async () => {
      const form_data = new FormData();
      form_data.append(
        userType == "client" ? "client_id" : "vendor_id",
        user.id
      );
      form_data.append("campaign_id", campaign_id);
      for (let i in params) {
        form_data.append(i, params[i]);
      }
      const res = await postRequest("campaign-site-list", form_data);

      if (res.s) {
        setList(res.data.data);
        setLoading(false);
        return;
      }
      setError({ msg: "Could not connect to the server" });
      setLoading(false);
    };

    getAsync();
  }, [status]);

  const RenderComponent = ({ item }) => {
    if (userType == "client") {
      return (
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
            Location : {item?.site_area_name}
          </Text>
          <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
            Size : {item.size_w} x {item.size_h}
          </Text>
          <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
            Media : {item?.medium?.name}
          </Text>
          <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
            Media Type : {item?.medium_type?.name}
          </Text>
          {item.free_size != "" && (
            <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
              Free Size : {item?.free_size}
            </Text>
          )}
          <Text style={{ fontSize: 26, color: "#fe5f5b" }}>
            Total Sqft : {item?.total_area_in_sqft}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {item.site_images.split(",").map((item, idx) => (
              <View style={{ margin: 5, marginHorizontal: 10 }}>
                <ImageView
                  key={idx}
                  source={{ uri: taskImages + item }}
                  style={{
                    height: 100,
                    width: 90,
                  }}
                />
                <Badge style={{ alignSelf: "center" }}>{idx + 1}</Badge>
              </View>
            ))}
            {/* <FlatList
              data={item.site_images.split(",")}
              renderItem={({ item }) => (
                <ImageView
                  source={{ uri: taskImages + item }}
                  style={{
                    height: 100,
                    width: 90,
                    marginHorizontal: 5,
                  }}
                />
              )}
              keyExtractor={(_, idx) => idx + "img"}
              horizontal
              style={{ height: 120 }}
            /> */}
          </View>
        </View>
      );
    }

    return (
      <Card
        style={{
          borderWidth: 0.5,
          borderColor: "#000",
          marginVertical: 10,
        }}
        onPress={() =>
          props.navigation.navigate("TaskDetails", {
            siteDetails: item,
            campaign_id: campaign_id,
          })
        }
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#282f80",
              // item.current_status_id == 1
              //   ? "#f0ad4e"
              //   : item.current_status_id == 2
              //   ? "#4285F4"
              //   : "#d9534f",
              width: "30%",
              paddingLeft: 10,
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 30, color: "#FFF" }}>
              {moment(item?.created_at).format("DD MMM")}
            </Text>
            <Text style={{ fontSize: 20, color: "#EEE" }}>
              {moment(item?.created_at).format("LT")}
            </Text>
            {/* <Text style={{ fontSize: 20, color: "#FFF" }}>
              {item.current_status_id == 1
                ? "Pending"
                : item.current_status_id == 2
                ? "Verified"
                : "Cancelled"}
            </Text> */}
          </View>
          <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
            {userType != "client" && (
              <Text style={{ fontSize: 28 }} numberOfLines={2}>
                {item?.medium?.name || "N/A"}
              </Text>
            )}
            {userType != "client" && (
              <Text style={{ fontSize: 20, color: "#888" }} numberOfLines={1}>
                {item?.medium_type?.name || "N/A"}
              </Text>
            )}
            <Text style={{ fontSize: 20 }} numberOfLines={2}>
              {item?.site_address}, {item?.site_area_name}, {item?.state?.state}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={[Style.container, { alignItems: "center" }]}>
      <FlatList
        style={{ width: "90%" }}
        data={list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={Style.heading}>My Sites</Text>
              {/* {userType != "client" && (
                <Button
                  mode="text"
                  labelStyle={{ fontSize: 25 }}
                  onPress={() =>
                    setStatus({
                      start_date: start_date,
                      end_date: end_date,
                      campaign_id: campaign_id,
                    })
                  }
                >
                  Edit End Date
                </Button>
              )} */}
            </View>
            {userType == "client" && (
              <View>
                <Text style={{ fontSize: 24 }}>
                  Campaign Name : {campaign_name || "N/A"}
                </Text>
                <Text style={{ fontSize: 24 }}>
                  Duration : {moment(start_date).format("DD MMM YYYY")} -{" "}
                  {moment(end_date).format("DD MMM YYYY")}
                </Text>
                <Text style={{ fontSize: 24 }}>State : {state || "N/A"}</Text>

                <Text style={{ fontSize: 24 }}>City : {city || "N/A"}</Text>

                <Text style={{ fontSize: 24 }}>
                  Agency : {user.company_name || "N/A"}
                </Text>

                <Text style={{ fontSize: 26, color: "#282f80", marginTop: 20 }}>
                  INSTALLED SITE PHOTOGRAPHS
                </Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <Text style={Style.label}>
            {loading ? "Loading..." : "No Result Found"}
          </Text>
        }
        renderItem={RenderComponent}
        keyExtractor={(item, index) => index.toString()}
      />

      <Portal>
        <Modal
          visible={status}
          dismissable={false}
          contentContainerStyle={[Style.container, { paddingTop: 0 }]}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
            <IconButton
              icon="chevron-left"
              size={35}
              onPress={() => setStatus(null)}
            />
          </View>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <Text style={[Style.heading, { marginBottom: 20 }]}>
              Update End-Date
            </Text>
            <View style={Style.form}>
              <View style={Style.formControl}>
                <Text style={Style.label}>Start Date</Text>
                <TextInput
                  disabled
                  mode="outlined"
                  style={Style.input}
                  value={moment(status?.start_date).format("DD/MM/YYYY")}
                />
              </View>
              <View style={Style.formControl}>
                <Text style={Style.label}>End Date</Text>
                <DatePicker
                  value={status?.end_date}
                  onValueChange={(date) =>
                    setStatus({ ...status, end_date: date })
                  }
                  inputStyles={Style.input}
                />
                {error.new_remarks ? (
                  <Text style={Style.textError}>{error?.new_remarks}</Text>
                ) : null}
              </View>

              <Button
                mode="contained"
                style={Style.button}
                uppercase={false}
                labelStyle={Style.buttonLabel}
                onPress={() => {
                  var validation = {};
                  var proceed = true;
                  const form_data = new FormData();
                  form_data.append("id", 1);
                  for (let i in status) {
                    if (!status[i]) {
                      validation[i] = "This field is required";
                      proceed = false;
                    }
                    form_data.append(i, status[i]);
                  }
                  setError({ ...validation });
                  if (proceed) {
                    postRequest("campaign-update", form_data).then((res) => {
                      if (res.s) {
                        setStatus(null);
                        // setError({ msg: res.msg });
                        //return setTimeout(() => props.navigation.goBack(), 500);
                      }
                      if (res.error) {
                        return setError(res.error);
                      }
                      setError({ msg: res.msg });
                    });
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
        visible={error.msg}
        style={{ backgroundColor: "#5cb85c" }}
        onDismiss={() => setError({})}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>{error?.msg}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default Sites;
