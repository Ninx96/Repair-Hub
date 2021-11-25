import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, FlatList, ScrollView } from "react-native";
import {
  Button,
  Card,
  DataTable,
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
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Campaigns = (props) => {
  const params = props.route.params;
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const form_data = new FormData();
    form_data.append(userType == "client" ? "client_id" : "vendor_id", user.id);
    for (let i in params) {
      form_data.append(i, params[i]);
    }
    postRequest("campaign-list", form_data).then((res) => {
      if (res.s) {
        setList(res.data.data);
        return;
      }
      setError({ msg: "Could not connect to the server" });
    });
  }, [status]);

  return (
    <SafeAreaView style={[Style.container, { alignItems: "center" }]}>
      <FlatList
        style={{ width: "90%" }}
        data={list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={Style.heading}>My Campaigns</Text>}
        renderItem={({ item, index }) => (
          <Card
            style={{
              height: 120,
              borderWidth: 0.5,
              borderColor: "#000",
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TouchableRipple
                disabled={true}
                style={{
                  backgroundColor:
                    item.current_status_id == 1 ? "#f0ad4e" : "#282f80",
                  width: "30%",
                  paddingLeft: 10,
                  justifyContent: "center",
                }}
                onPress={() => {
                  const form_data = new FormData();
                  form_data.append("task_id", item.id);
                  postRequest("task-status-log", form_data).then((res) => {
                    if (res.s) {
                      setLogs(res.data);
                    }
                  });
                  setStatus({
                    task_id: item.id,
                    current_status_id: "",
                    new_remarks: "",
                  });
                }}
              >
                <View>
                  {/* <Text style={{ fontSize: 30, color: "#FFF" }}>
                    {moment(item?.created_at).format("DD MMM")}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#EEE" }}>
                    {moment(item?.created_at).format("LT")}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#FFF" }}>
                    {item.current_status_id == 1 ? "Pending" : "Verified"}
                  </Text> */}
                </View>
              </TouchableRipple>
              <TouchableRipple
                style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}
                onPress={() =>
                  props.navigation.navigate("FilterSites", {
                    campaign_id: item.id,
                    status_id: item?.current_status_id,
                    start_date: item?.start_date,
                    end_date: item?.end_date,
                    campaign_name: item?.title,
                    agency: item?.vendor?.name,
                  })
                }
              >
                <View>
                  <Text style={{ fontSize: 35 }} numberOfLines={2}>
                    {item?.title || "N/A"}
                  </Text>
                  {/* <Text style={{ fontSize: 20, color: "#888" }}>
                    {item?.client?.company_name || "N/A"}
                  </Text> */}
                  {userType == "client" && (
                    <Text style={{ fontSize: 20 }}>
                      {moment(item?.start_date).format("DD/MM/YYYY")} -{" "}
                      {moment(item?.end_date).format("DD/MM/YYYY")}
                    </Text>
                  )}
                </View>
              </TouchableRipple>
            </View>
          </Card>
        )}
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
              Update Status
            </Text>
            <View style={Style.form}>
              <View style={Style.formControl}>
                <Text style={Style.label}>Select Status</Text>
                <DropDown
                  mode="outlined"
                  placeholder="Select Status"
                  style={Style.input}
                  data={[
                    {
                      label: "Pending",
                      value: 1,
                    },
                    { label: "Verified", value: 2 },
                    { label: "Cancelled", value: 3 },
                  ]}
                  value={status?.current_status_id}
                  onChange={(val) => {
                    setStatus({ ...status, current_status_id: val });
                  }}
                  error={error.current_status_id ? true : false}
                />
                {error.current_status_id ? (
                  <Text style={Style.textError}>
                    {error?.current_status_id}
                  </Text>
                ) : null}
              </View>
              <View style={Style.formControl}>
                <Text style={Style.label}>Enter Remarks</Text>
                <TextInput
                  disabled={loading}
                  mode="outlined"
                  placeholder="Enter Remarks"
                  multiline
                  numberOfLines={3}
                  style={Style.input}
                  onChangeText={(text) =>
                    setStatus({ ...status, new_remarks: text })
                  }
                  error={error.new_remarks ? true : false}
                />
                {error.new_remarks ? (
                  <Text style={Style.textError}>{error?.new_remarks}</Text>
                ) : null}
              </View>

              {/* <DataTable>
                <DataTable.Header style={{ backgroundColor: "#4285F4" }}>
                  <DataTable.Cell>
                    <Text style={[Style.textRegular, { color: "#FFF" }]}>
                      Status
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={[Style.textRegular, { color: "#FFF" }]}>
                      Remarks
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={[Style.textRegular, { color: "#FFF" }]}>
                      Date-Time
                    </Text>
                  </DataTable.Cell>
                </DataTable.Header>
              </DataTable> */}

              <Button
                mode="contained"
                style={Style.button}
                uppercase={false}
                labelStyle={Style.buttonLabel}
                onPress={() => {
                  var validation = {};
                  var proceed = true;
                  const form_data = new FormData();
                  form_data.append("task_id", status.task_id);
                  for (let i in status) {
                    if (!status[i]) {
                      validation[i] = "This field is required";
                      proceed = false;
                    }
                    form_data.append(i, status[i]);
                  }
                  setError({ ...validation });
                  if (proceed) {
                    postRequest("task-status", form_data).then((res) =>
                      setStatus(null)
                    );
                  }
                }}
              >
                Save
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      {/* <Snackbar
        visible={error}
        style={{ backgroundColor: "#5cb85c" }}
        onDismiss={() => setError(null)}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>{error?.msg}</Text>
      </Snackbar> */}
    </SafeAreaView>
  );
};

export default Campaigns;
