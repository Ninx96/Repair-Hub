import { NavigationContainer } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, FlatList, ScrollView } from "react-native";
import {
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
import RenderHtml from "react-native-render-html";

import { AuthContext } from "../../components/ContextComponent";
import DatePicker from "../../components/DatePicker";
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Sites = (props) => {
  const { campaign_id, start_date, end_date } = props.route.params;
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const form_data = new FormData();
    form_data.append("campaign_id", campaign_id);
    postRequest("campaign-site-list", form_data).then((res) => {
      if (res.s) {
        setList(res.data.data);
        return;
      }
      setError({ msg: "Could not connect to the server" });
      s;
    });
  }, [status]);
  return (
    <SafeAreaView style={[Style.container, { alignItems: "center" }]}>
      <FlatList
        style={{ width: "90%" }}
        data={list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={Style.heading}>My Sites</Text>
            {userType != "client" && (
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
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <Card
            style={{
              height: 140,
              borderWidth: 0.5,
              borderColor: "#000",
              marginVertical: 10,
            }}
            onPress={() =>
              props.navigation.navigate("TaskDetails", { siteDetails: item })
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
              <View
                style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}
              >
                {userType != "client" && (
                  <Text style={{ fontSize: 28 }} numberOfLines={2}>
                    {item?.medium?.name || "N/A"}
                  </Text>
                )}
                {userType != "client" && (
                  <Text
                    style={{ fontSize: 20, color: "#888" }}
                    numberOfLines={1}
                  >
                    {item?.medium_type?.name || "N/A"}
                  </Text>
                )}
                <Text style={{ fontSize: 20 }} numberOfLines={2}>
                  {item?.site_address}, {item?.site_area_name},{" "}
                  {item?.state?.state}
                </Text>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {userType != "client" && (
        <FAB
          icon="plus"
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onPress={() =>
            props.navigation.navigate("TaskDetails", {
              siteDetails: null,
              campaign_id,
            })
          }
        />
      )}
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
