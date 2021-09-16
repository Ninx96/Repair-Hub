import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, FlatList, ScrollView } from "react-native";
import { Card, Snackbar, Text, TouchableRipple } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Dashboard = (props) => {
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
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
                onPress={() => {}}
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
      <Snackbar
        visible={error}
        style={{ backgroundColor: "#5cb85c" }}
        onDismiss={() => setError(null)}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>{error?.msg}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default Dashboard;
