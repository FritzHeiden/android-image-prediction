import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Camera from "./camera";
import PredictionService from "./prediction-service";

const frequency = 0.2;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  camera: { flex: 1 },
  predictionText: { padding: 5 }
});

class PredictionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prediction: null };
    setTimeout(() => this.predictImage(), 1000 / frequency);
  }

  async predictImage() {
    const { predictionService } = this.props;
    this.state.prediction = null;
    this.setState(this.state);
    const image = await this.captureImage();
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
    this.setState(this.state);
    setTimeout(() => this.predictImage(), 1000 / frequency);
  }

  async captureImage() {
    if (!this.camera) return;
    return this.camera.captureImage();
  }

  render() {
    const { prediction } = this.state;

    const text = `Prediction: ${prediction || "Processing ..."}`;

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={ref => (this.camera = ref)} />
        <Text style={styles.predictionText}>{text}</Text>
      </View>
    );
  }
}

export default PredictionView;
