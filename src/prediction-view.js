import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Dimensions from "Dimensions";

import Camera from "./camera";
import PredictionService from "./prediction-service";

const device = Dimensions.get("window");

const IDLE = "idle";
const TAKING_PHOTO = "taking_photo";
const PREDICTING = "predicting";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  camera: { width: device.width, height: device.width },
  cameraWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  controlsWrapper: { padding: 20, paddingBottom: 50 },
  predictionText: { marginBottom: 20 }
});

class PredictionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prediction: null, status: IDLE };
  }

  async predictImage() {
    const { predictionService } = this.props;
    this.state.prediction = null;
    this.state.status = TAKING_PHOTO;
    this.setState(this.state);
    const image = await this.captureImage();
    this.state.status = PREDICTING;
    this.setState(this.state);
    let prediction = "";
    try {
      prediction = await predictionService.predictNumber(image.base64);
    } catch (e) {
      console.warn("Failed to predict number:", e);
    }
    if (prediction === PredictionService.NO_NUMBER_RECOGNIZED) {
      prediction = "No number recognized.";
    }
    this.state.prediction = prediction;
    this.state.status = IDLE;
    this.setState(this.state);
  }

  async captureImage() {
    if (!this.camera) return;
    return this.camera.captureImage();
  }

  render() {
    const { prediction, status } = this.state;

    let text = "Prediction: ";
    switch (status) {
      case IDLE:
        text += prediction || "Take photo to predict number";
        break;
      case TAKING_PHOTO:
        text += "Capturing photo ...";
        break;
      case PREDICTING:
        text += "Processing ...";
        break;
    }

    return (
      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          {/* <View style={styles.camera} /> */}
          <Camera style={styles.camera} ref={ref => (this.camera = ref)} />
        </View>
        <View style={styles.controlsWrapper}>
          <Text style={styles.predictionText}>{text}</Text>
          <Button
            title={"Take Photo"}
            onPress={this.predictImage.bind(this)}
            disabled={status === PREDICTING}
          />
        </View>
      </View>
    );
  }
}

export default PredictionView;
