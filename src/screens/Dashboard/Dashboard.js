import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card, Snackbar, Text } from "react-native-paper";
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
      form_data.append("client_id", user.id);
    } else {
      form_data.append("vendor_id", user.id);
    }
    postRequest("task-list", form_data).then((res) => {
      if (res.s) {
        setList(res.data);
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
              height: 100,
              borderWidth: 0.5,
              borderColor: "#000",
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View
                style={{
                  backgroundColor: "#4285F4",
                  width: "30%",
                  paddingLeft: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 30, color: "#FFF" }}>
                  {moment().format("DD MMM")}
                </Text>
                <Text style={{ fontSize: 20, color: "#DDD" }}>
                  {moment().format("LT")}
                </Text>
                <Text style={{ fontSize: 20, color: "#FFF" }}>Status</Text>
              </View>
              <View
                style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}
              >
                <Text style={{ fontSize: 30 }}>Fix My Appliances</Text>
                <Text style={{ fontSize: 20, color: "#888" }}>
                  Air Conditioner
                </Text>
                <Text style={{ fontSize: 20 }}>location</Text>
              </View>
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
