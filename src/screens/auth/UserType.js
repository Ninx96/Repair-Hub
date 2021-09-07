import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import Style from "../../styles/Style";

const UserType = (props) => {
  const [selected, setSelected] = useState(null);
  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ height: 100, width: 150 }}
        />
      </View>
      <View style={{}}>
        <Text style={Style.heading}>Select User Type</Text>
      </View>

      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ItemType
          icon={{
            uri: "https://icon-library.com/images/client-icon/client-icon-1.jpg",
          }}
          title="Client"
          value="client"
          selected={selected == "client"}
          onPress={setSelected}
        />
        <ItemType
          icon={{
            uri: "https://icon-library.com/images/vendor-icon/vendor-icon-12.jpg",
          }}
          title="Vendor"
          value="vendor"
          selected={selected == "vendor"}
          onPress={setSelected}
        />
      </View>

      <View style={{}}>
        <Button
          mode="contained"
          style={{ height: 40, width: 200, borderRadius: 50 }}
          labelStyle={{ fontSize: 25 }}
          uppercase={false}
          onPress={() => props.navigation.navigate("Login")}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const ItemType = ({ icon, title, selected, onPress, value }) => {
  return (
    <Card
      style={{
        height: 150,
        width: 150,
        borderRadius: 40,
        borderColor: "#4285F4",
        borderWidth: selected ? 2 : 0,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      }}
      onPress={() => onPress(value)}
    >
      <IconButton icon={icon} color="#4285F4" size={60} />
      <Text style={{ fontSize: 25, textAlign: "center" }}>{title}</Text>
    </Card>
  );
};

export default UserType;
