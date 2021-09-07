import { StyleSheet, StatusBar, Platform } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 40,
    color: "#4285F4",
  },
  form: { width: "80%" },
  formControl: {
    marginBottom: 15,
  },
  label: { fontSize: 30 },
  input: {
    borderRadius: 0,
    fontSize: 25,
  },
  button: {
    borderRadius: 5,
    height: 60,
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 30,
    marginTop: 15,
  },
  textBig: {
    fontSize: 30,
  },
  textRegular: {
    fontSize: 25,
  },
});

export default Style;
