import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const FilterCampaigns = (props) => {
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [error, setError] = useState({});
  const [params, setParams] = useState({
    state_id: "",
    city_id: "",
    area_name: "",
  });

  useEffect(() => {
    postRequest("state-all-active").then((res) => {
      if (res.s) {
        setState(res.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={[Style.heading, { marginBottom: 20 }]}>Campaign</Text>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>State</Text>
            <DropDown
              mode="outlined"
              placeholder="Select State"
              style={Style.input}
              data={state}
              exLabel="state"
              exValue="id"
              value={params?.state_id}
              onChange={(text) => {
                setParams({ ...params, state_id: text });
                const form_data = new FormData();
                form_data.append("state_id", text);
                postRequest("city-all-active", form_data).then((res) => {
                  if (res.s) {
                    setCity(res.data);
                  }
                });
              }}
              error={error.state_id ? true : false}
            />
            {error.state_id ? (
              <Text style={Style.textError}>{error?.state_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>City</Text>
            <DropDown
              mode="outlined"
              placeholder="Select City"
              style={Style.input}
              data={city}
              exLabel="name"
              exValue="id"
              value={params?.city_id}
              onChange={(text) => {
                setParams({ ...params, city_id: text });
                const form_data = new FormData();
                form_data.append(
                  userType == "client" ? "client_id" : "vendor_id",
                  text
                );
                form_data.append("city_id", text);
                postRequest("campaign-locations", form_data).then((res) => {
                  if (res.s) {
                    console.log(res);
                    setLocation(res.data);
                  }
                });
              }}
              error={error.city_id ? true : false}
            />
            {error.city_id ? (
              <Text style={Style.textError}>{error?.city_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Location</Text>
            <DropDown
              mode="outlined"
              placeholder="Select Location"
              style={Style.input}
              data={location}
              exLabel="task_area_name"
              exValue="task_area_name"
              value={params?.area_name}
              onChange={(text) => {
                setParams({ ...params, area_name: text });
              }}
              error={error.area_name ? true : false}
            />
            {error.area_name ? (
              <Text style={Style.textError}>{error?.area_name}</Text>
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
              for (let i in params) {
                if (!params[i]) {
                  validation[i] = "This field is required";
                  //   proceed = false;
                }
                form_data.append(i, params[i]);
              }
              setError({ ...validation });
              if (proceed) {
                props.navigation.navigate("Campaigns", params);
              }
            }}
          >
            Show Details
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterCampaigns;
