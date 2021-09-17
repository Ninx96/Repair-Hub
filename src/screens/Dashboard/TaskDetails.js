import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, DataTable, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import DropDown from "../../components/DropDownComponent";
import { postRequest } from "../../services/RequestServices";
import Style from "../../styles/Style";

const TaskDetails = (props) => {
  const { getSession, updateUser } = useContext(AuthContext);
  const { user, userType } = getSession();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});
  const [param, setParam] = useState({});

  // utility

  const [state, setState] = useState([]);
  const [medium, setMedium] = useState([]);
  const [mediumtype, setMediumtype] = useState([]);

  useEffect(() => {
    postRequest("state-all-active").then((res) => {
      if (res.s) {
        setState(res.data);
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
            <Text style={Style.label}>Address</Text>
            <TextInput
              multiline
              numberOfLines={2}
              mode="outlined"
              placeholder="Enter param"
              style={Style.input}
              value={param?.task_address}
              onChangeText={(text) =>
                setParam({ ...param, task_address: text })
              }
              error={error.task_address ? true : false}
            />
            {error.task_address ? (
              <Text style={Style.textError}>{error?.task_address}</Text>
            ) : null}
          </View>
          <View style={Style.formControl}>
            <Text style={Style.label}>Area</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Area"
              style={Style.input}
              value={param?.task_area_name}
              onChangeText={(text) =>
                setParam({ ...param, task_area_name: text })
              }
              error={error.task_area_name ? true : false}
            />
            {error.task_area_name ? (
              <Text style={Style.textError}>{error?.task_area_name}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Pincode</Text>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter Pincode"
              style={Style.input}
              maxLength={6}
              value={param?.task_pincode}
              onChangeText={(text) => {}}
              error={error.task_pincode ? true : false}
            />
            {error.task_pincode ? (
              <Text style={Style.textError}>{error?.task_pincode}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>City</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter City"
              style={Style.input}
              value={param?.task_city_name}
              onChangeText={(text) =>
                setParam({ ...param, task_city_name: text })
              }
              error={error.param ? true : false}
            />
            {error.task_city_name ? (
              <Text style={Style.textError}>{error?.task_city_name}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>State</Text>
            <DropDown
              mode="outlined"
              placeholder="Select State"
              style={Style.input}
              data={state}
              exLabel="state"
              exValue="id"
              value={param?.task_state_id}
              onChange={(text) => setParam({ ...param, task_state_id: text })}
              error={error.task_state_id ? true : false}
            />
            {error.task_state_id ? (
              <Text style={Style.textError}>{error?.task_state_id}</Text>
            ) : null}
          </View>

          <View style={Style.formControl}>
            <Text style={Style.label}>Contact Mobile</Text>
            <TextInput
              mode="outlined"
              placeholder="Enter Contact No."
              style={Style.input}
              value={param?.task_mobile}
              onChangeText={(text) => setParam({ ...param, task_mobile: text })}
              error={error.task_mobile ? true : false}
            />
            {error.task_mobile ? (
              <Text style={Style.textError}>{error?.task_mobile}</Text>
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
                keyboardType="number-pad"
                mode="outlined"
                placeholder="Enter NOS."
                style={Style.input}
                value={param?.nos}
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
            Any Information Or Remarks For Vendors
          </Text>
          <View style={Style.formControl}>
            <Text style={Style.label}>Remarks</Text>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter Remarks"
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
          </View>

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
    </SafeAreaView>
  );
};

export default TaskDetails;
