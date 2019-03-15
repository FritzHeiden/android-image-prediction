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
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
        />
      </View>
    );
  }
}

export default Camera;
