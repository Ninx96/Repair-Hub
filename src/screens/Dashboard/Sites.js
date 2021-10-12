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
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const Sites = (props) => {
  const { campaign_id } = props.route.params;
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
    });
  }, [status]);
  return (
    <SafeAreaView style={(Style.container, { alignItems: "center" })}>
      <FlatList
        style={{ width: "90%" }}
        data={list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={Style.heading}>My Sites</Text>}
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
                <Text style={{ fontSize: 28 }} numberOfLines={2}>
                  {item?.medium?.name || "N/A"}
                </Text>
                <Text style={{ fontSize: 20, color: "#888" }} numberOfLines={1}>
                  {item?.medium_type?.name || "N/A"}
                </Text>
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
    </SafeAreaView>
  );
};

export default Sites;
