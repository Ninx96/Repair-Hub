import { StyleSheet, StatusBar, Platform } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    paddingTop: 10,
  },
  heading: {
    fontSize: 40,
    color: "#fe5f5b",
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
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 30,
    // marginTop: Platform.OS == "android" ? 15 : 8,
    alignSelf: "center",
  },
  textBig: {
    fontSize: 30,
  },
  textRegular: {
    fontSize: 25,
  },
  textSmall: {
    fontSize: 20,
  },
  textError: { color: "#d9534f", fontSize: 20 },
  textWarning: { color: "#f0ad4e", fontSize: 20 },
});

export default Style;
