import React from "react";
import { Image, TouchableHighlight } from "react-native";
import { Portal, Modal, IconButton } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageView = (props) => {
  const [modal, setModal] = React.useState(false);

  //console.log(props.source);

  return (
    <>
      <Portal>
        <Modal
          visible={modal}
          dismissable={false}
          transparent={true}
          contentContainerStyle={{
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100%",
          }}
          onDismiss={() => {
            setModal(false);
          }}
        >
          <IconButton
            icon="close"
            size={30}
            color="#fff"
            style={{ alignSelf: "flex-end" }}
            onPress={() => setModal(false)}
          />

          {/* <Image
            source={props.source}
            style={{
              width: "100%",
              height: "80%",
              resizeMode: "contain",
            }}
          /> */}
          <ImageViewer
            imageUrls={[
              { url: props.source.uri, props: { source: props.source } },
            ]}
          />
        </Modal>
      </Portal>
      <TouchableHighlight
        style={props.style}
        onPress={() => {
          setModal(true);
        }}
      >
        <Image {...props} />
      </TouchableHighlight>
    </>
  );
};

export default ImageView;
