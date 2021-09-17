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

const Dashboard = (props) => {
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [list, setList] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const form_data = new FormData();
    if (userType == "client") {
      form_data.append("vendor_id", 1);
    } else {
      form_data.append("vendor_id", user.id);
    }
    postRequest("task-list", form_data).then((res) => {
      if (res.s) {
        setList(res.data.data);
        return;
      }
      setError({ msg: "Could not connect to the server" });
    });
  }, []);
  return (
    <SafeAreaView style={(Style.container, { alignItems: "center" })}>
      <Text style={Style.heading}>My Tasks</Text>

      <FlatList
        style={{ width: "90%" }}
        data={list}
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
                style={{
                  backgroundColor:
                    item.current_status_id == 1
                      ? "#f0ad4e"
                      : item.current_status_id == 2
                      ? "#4285F4"
                      : "#d9534f",
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
                  setStatus({ task_id: item.id });
                }}
              >
                <View>
                  <Text style={{ fontSize: 30, color: "#FFF" }}>
                    {moment(item.created_at).format("DD MMM")}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#EEE" }}>
                    {moment(item.created_at).format("LT")}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#FFF" }}>
                    {item.current_status_id == 1
                      ? "Pending"
                      : item.current_status_id == 2
                      ? "Completed"
                      : "Cancelled"}
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}
                onPress={() => {}}
              >
                <View>
                  <Text style={{ fontSize: 28 }} numberOfLines={2}>
                    {item.medium.name || "N/A"}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#888" }}>
                    {item.medium_type.name || "N/A"}
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    {item.task_city_name}, {item.state} - {item.pincode}
                  </Text>
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
                    { label: "Completed", value: 2 },
                    { label: "Cancelled", value: 3 },
                  ]}
                  onChange={(val) => {
                    setStatus({ ...status, current_status_id: val });
                  }}
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
                onPress={() => {}}
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

export default Dashboard;
