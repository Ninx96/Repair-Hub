import React, { useState, useEffect } from "react";
import { Image, View, FlatList } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as ImageManipulator from "expo-image-manipulator";
import { Button, IconButton, Modal, Portal, Text } from "react-native-paper";
import Style from "../styles/Style";

const MultipleImages = ({ onSelect, onClear, data = [], disabled }) => {
  const [images, setImages] = useState([]);
  const [header, setHeader] = useState(
    <Text style={{ flexGrow: 1, fontWeight: "bold", fontSize: 18 }}>
      Selected 0 files
    </Text>
  );
  const [modal, setModal] = useState(false);

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

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ height: 100, width: 100, marginHorizontal: 5 }}
          />
        )}
        horizontal
        keyExtractor={(item, index) => index.toString()}
      />

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
          color="#4285F4"
          icon="camera"
          style={Style.button}
          labelStyle={Style.buttonLabel}
          uppercase={false}
          onPress={() => {
            setModal(true);
          }}
        >
          Choose Files
        </Button>
        <Button
          mode="contained"
          color="red"
          style={Style.button}
          labelStyle={Style.buttonLabel}
          uppercase={false}
          onPress={onClear}
        >
          Clear
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
    </View>
  );
};

export default MultipleImages;
