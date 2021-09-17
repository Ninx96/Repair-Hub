import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, DataTable, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../../components/ContextComponent";
import Style from "../../styles/Style";

const UpdateStatus = (props) => {
  const { getSession, updateUser } = useContext(AuthContext);
  const { user, userType } = getSession();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});
  const [param, setParam] = useState({});
  return (
    <SafeAreaView style={Style.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={[Style.heading, { marginBottom: 20 }]}>Update Status</Text>
        <View style={Style.form}>
          <View style={Style.formControl}>
            <Text style={Style.label}>Select Status</Text>
            <TextInput
              disabled={loading}
              mode="outlined"
              placeholder="Enter Full Name"
              style={Style.input}
              value={param.name || param.company_name}
              onChangeText={(text) =>
                setParam({ ...param, company_name: text, name: text })
              }
              error={error.company_name || error.name ? true : false}
            />
            {error.company_name || error.name ? (
              <Text style={Style.textError}>
                {error?.company_name || error?.name}
              </Text>
            ) : null}
          </View>
          <View style={Style.formControl}>
            <Text style={Style.label}>Enter Remarks</Text>
            <TextInput
              disabled={loading}
              mode="outlined"
              placeholder="Enter Full Name"
              multiline
              numberOfLines={3}
              style={Style.input}
              value={param.name || param.company_name}
              onChangeText={(text) =>
                setParam({ ...param, company_name: text, name: text })
              }
              error={error.company_name || error.name ? true : false}
            />
            {error.company_name || error.name ? (
              <Text style={Style.textError}>
                {error?.company_name || error?.name}
              </Text>
            ) : null}
          </View>

          <DataTable>
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
            <ScrollView>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text style={Style.textSmall}>Status</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={Style.textSmall}>Remarks</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={Style.textSmall}>Date-Time</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </ScrollView>
          </DataTable>

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

export default UpdateStatus;
