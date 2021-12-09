import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, FAB, Text } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const FilterSites = (props) => {
  const routeParams = props.route.params;
  const { getSession } = useContext(AuthContext);
  const { userType, user } = getSession();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [error, setError] = useState({});
  const [params, setParams] = useState({
    state_id: routeParams.state_id,
    city_id: routeParams.city_id,
    area_name: "",
  });

  useEffect(() => {
    const form_data = new FormData();
    // form_data.append(userType == "client" ? "client_id" : "vendor_id", user.id);
    form_data.append("campaign_id", routeParams.campaign_id);
    form_data.append("city_id", routeParams.city_id);
    postRequest("campaign-site-locations", form_data).then((res) => {
      if (res.s) {
        setLocation(res.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={[Style.heading, { marginBottom: 20 }]}>
          {routeParams?.campaign_name}
        </Text>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>State</Text>
            <Text style={[Style.label, { color: "#fe5f5b" }]}>
              {routeParams?.state}
            </Text>
            {/* <DropDown
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
            /> */}
            {error.state_id ? (
              <Text style={Style.textError}>{error?.state_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>City</Text>
            <Text style={[Style.label, { color: "#fe5f5b" }]}>
              {routeParams?.city}
            </Text>
            {/* <DropDown
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
                  user.id
                );
                form_data.append("city_id", text);
                postRequest("campaign-site-locations", form_data).then(
                  (res) => {
                    if (res.s) {
                      console.log(res);
                      setLocation(res.data);
                    }
                  }
                );
              }}
              error={error.city_id ? true : false}
            /> */}
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
              exLabel="site_area_name"
              exValue="site_area_name"
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
                  proceed = false;
                }
                form_data.append(i, params[i]);
              }
              setError({ ...validation });
              if (proceed) {
                props.navigation.navigate("Sites", {
                  ...routeParams,
                  params: params,
                });
              }
            }}
          >
            Show Details
          </Button>
        </View>
      </ScrollView>
      {userType != "client" &&
        routeParams.status_id == 2 &&
        location.length == 0 && (
          <FAB
            icon="plus"
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onPress={() =>
              props.navigation.navigate("TaskDetails", {
                siteDetails: null,
                campaign_id: routeParams.campaign_id,
              })
            }
          />
        )}
    </SafeAreaView>
  );
};

export default FilterSites;
