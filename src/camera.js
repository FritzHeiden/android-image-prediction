import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

class Camera extends React.Component {
  async captureImage() {
    if (!this.camera) return;
    const options = {
      quality: 0.5,
      base64: true,
      doNotSave: true,
      orientation: "portrait"
      // width: "600"
    };
    const data = await this.camera.takePictureAsync(options);
    return data;
  }

  render() {
    const { style } = this.props;
    return (
      <View style={{ ...styles.container, ...style }}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          zoom={0.5}
          ratio={"1:1"}
        />
      </View>
    );
  }
}

export default Camera;
