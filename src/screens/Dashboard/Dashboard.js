import moment from "moment";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card, Text } from "react-native-paper";
import Style from "../../styles/Style";

const Dashboard = (props) => {
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.heading}>My Tasks</Text>

      <FlatList
        style={{ width: "90%" }}
        data={[{}, {}, {}, {}]}
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
    </SafeAreaView>
  );
};

export default Dashboard;
