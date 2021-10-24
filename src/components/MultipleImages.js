import React, { useState, useEffect } from "react";
import { Image, View, FlatList } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Style from "../styles/Style";

const MultipleImages = ({ onSelect, onClear, data = [], disabled }) => {
  const [images, setImages] = useState([]);
  const [header, setHeader] = useState(
    <Text style={{ flexGrow: 1, fontWeight: "bold", fontSize: 18 }}>
      Selected 0 files
    </Text>
  );
  const [modal, setModal] = useState(false);
  const [modalImage, setmodalImage] = useState(false);

  const _renderDoneButton = (count, onSubmit) => {
    if (!count)
      return (
        <Text style={{ flexGrow: 1, fontWeight: "bold", fontSize: 18 }}>
          Selected {count} files
        </Text>
      );
    return [
      <Text style={{ flexGrow: 1, fontWeight: "bold", fontSize: 18 }}>
        Selected {count} files
      </Text>,
      <Button
        mode="text"
        color="blue"
        uppercase={false}
        onPress={onSubmit}
        labelStyle={{ fontSize: 25 }}
      >
        Done
      </Button>,
    ];
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(uri, [], {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    });
    return file;
  };

  const Upload = async () => {
    try {
      const Camera = await ImagePicker.getCameraPermissionsAsync();

      if (!Camera.granted) {
        ImagePicker.requestCameraPermissionsAsync();
      } else {
        const options = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.1,
          allowsMultipleSelection: true,
        };
        ImagePicker.launchCameraAsync(options).then((result) => {
          if (!result.cancelled) {
            const form_data = {
              name: Date.now() + ".jpg",
              type: "image/jpeg",
              uri: result.uri,
            };
            onSelect([form_data]);
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item, index) => (
          <TouchableRipple
            key={index}
            onPress={() => setmodalImage({ uri: item.uri })}
          >
            <>
              {!disabled && (
                <IconButton
                  icon="close"
                  color="#FFF"
                  size={15}
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    top: -8,
                    right: -10,
                    elevation: 10,
                  }}
                  onPress={() => {
                    data.splice(index, 1);
                    onClear();
                  }}
                />
              )}
              <Image
                source={{ uri: item.uri }}
                style={{
                  height: 100,
                  width: 90,
                  marginHorizontal: 5,
                  marginVertical: 15,
                }}
              />
            </>
          </TouchableRipple>
        ))}
      </View>

      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          },
          disabled ? { display: "none" } : null,
        ]}
      >
        <Button
          mode="contained"
          icon="camera"
          style={Style.button}
          labelStyle={Style.buttonLabel}
          uppercase={false}
          onPress={Upload}
        >
          Camera
        </Button>
        <Button
          mode="contained"
          color="#0096FF"
          icon="image-multiple"
          style={Style.button}
          labelStyle={Style.buttonLabel}
          uppercase={false}
          onPress={() => {
            setModal(true);
          }}
        >
          Gallery
        </Button>
      </View>

      <Portal>
        <Modal
          visible={modal}
          dismissable={false}
          contentContainerStyle={{ flex: 1, backgroundColor: "#FFF" }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                icon="chevron-left"
                size={30}
                color="black"
                onPress={() => setModal(false)}
              />
              {header}
            </View>

            <ImageBrowser
              onChange={(num, onSubmit) => {
                setHeader(_renderDoneButton(num, onSubmit));
              }}
              callback={(callback) => {
                callback
                  .then(async (photos) => {
                    const cPhotos = [];
                    for (let photo of photos) {
                      const pPhoto = await _processImageAsync(photo.uri);
                      cPhotos.push({
                        uri: pPhoto.uri,
                        name: photo.filename,
                        type: "image/jpg",
                      });
                      onSelect(cPhotos);
                      setModal(false);
                    }
                  })
                  .catch((e) => console.log(e));
              }}
            />
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={modalImage}
          dismissable={false}
          transparent={true}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100%",
          }}
          onDismiss={() => {
            setmodalImage(false);
          }}
        >
          <IconButton
            icon="close"
            size={30}
            color="#fff"
            style={{ alignSelf: "flex-end" }}
            onPress={() => setmodalImage(false)}
          />
          <Image
            source={modalImage}
            style={{
              width: "100%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default MultipleImages;
