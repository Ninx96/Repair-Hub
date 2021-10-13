import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Platform, View } from "react-native";

const DropDown = ({
  style,
  onChange,
  placeholder,
  label,
  value,
  data = [],
  disabled,
  mode,
  left,
  error,
  exLabel = "label",
  exValue = "value",
}) => {
  const [visible, setVisible] = useState(false);

  const showValue = () => {
    if (value) {
      const index = data.findIndex((item) => item.value == value);
      const { label } = data[index];
      return label;
    }
    return placeholder;
  };

  return (
    <TextInput
      error={error}
      mode={mode}
      label={label}
      style={style}
      disabled={disabled}
      render={(props) =>
        Platform.OS == "ios" ? (
          <>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentContainerStyle={{
                  bottom: 0,
                  width: "100%",
                  position: "absolute",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                    backgroundColor: "#E5E4E2",
                  }}
                >
                  <Button
                    labelStyle={{ fontSize: 18 }}
                    mode="text"
                    uppercase={false}
                    color="#007AFF"
                    onPress={() => setVisible(false)}
                  >
                    Done
                  </Button>
                </View>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    height: 200,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Picker
                    enabled={!disabled}
                    prompt="Select an Option"
                    selectedValue={value}
                    style={{ margin: 0, width: "100%" }}
                    onValueChange={(val, index) => {
                      onChange(val, index);
                    }}
                  >
                    <Picker.Item label={placeholder} value="" />
                    {data.map((item, index) => (
                      <Picker.Item
                        label={item[exLabel]}
                        value={item[exValue]}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </Modal>
            </Portal>
            <TouchableRipple
              onPress={() => setVisible(true)}
              style={{ flex: 1, justifyContent: "center", paddingLeft: 10 }}
            >
              <Text style={{ marginLeft: 35, fontSize: 16, marginTop: 10 }}>
                {showValue()}
              </Text>
            </TouchableRipple>
          </>
        ) : (
          <Picker
            {...props}
            selectedValue={value}
            style={{
              flex: 1,
              marginLeft: left ? 35 : 0,
            }}
            onValueChange={onChange}
            enabled={!disabled}
          >
            <Picker.Item label={placeholder} value="" />
            {data.map((item, index) => (
              <Picker.Item
                label={item[exLabel]}
                value={item[exValue]}
                key={index}
              />
            ))}
          </Picker>
        )
      }
      right={<TextInput.Icon name="chevron-down" disabled={disabled} />}
      left={left}
    />
  );
};

export default DropDown;
