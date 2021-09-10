import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Button, Card, IconButton, Snackbar, Text } from "react-native-paper";
import Style from "../../styles/Style";

const UserType = (props) => {
  const [selected, setSelected] = useState("client");
  const [error, setError] = useState(null);
  return (
    <SafeAreaView style={Style.container}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <IconButton
          icon=""
          size={35}
          //onPress={() => props.navigation.goBack()}
        />
      </View>

      <View style={{ marginBottom: "20%" }}>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ height: 100, width: 150 }}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
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

      <View style={{ marginVertical: "10%" }}>
        <Button
          mode="contained"
          style={{ height: 40, width: 200, borderRadius: 50 }}
          labelStyle={{ fontSize: 25 }}
          uppercase={false}
          onPress={() => {
            if (!selected) {
              return setError({ message: "Please select an option first" });
            }
            props.navigation.navigate("Login", { type: selected });
          }}
        >
          Next
        </Button>
      </View>
      <Snackbar
        visible={error}
        style={{ backgroundColor: "#d9534f" }}
        onDismiss={() => setError(null)}
      >
        <Text style={[Style.textRegular, { color: "#FFF" }]}>
          {error?.message}
        </Text>
      </Snackbar>
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
        backgroundColor: "#FFF",
      }}
      onPress={() => onPress(value)}
    >
      <IconButton icon={icon} color="#4285F4" size={60} />
      <Text style={{ fontSize: 25, textAlign: "center" }}>{title}</Text>
    </Card>
  );
};

export default UserType;
