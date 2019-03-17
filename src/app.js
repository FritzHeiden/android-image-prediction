import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Camera from "./camera";

const frequency = 0.2;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  camera: { flex: 1 },
  predictionText: { padding: 5 }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prediction: null };
    setTimeout(() => this.predictImage(), 1000 / frequency);
  }

  async predictImage() {
    const image = await this.captureImage();
    this.state.prediction = image;
    this.setState(this.state);
    setTimeout(() => this.predictImage(), 1000 / frequency);
  }

  async captureImage() {
    if (!this.camera) return;
    return this.camera.captureImage();
  }

  render() {
    const { prediction } = this.state;

    const text = `Prediction: ${
      prediction ? prediction.uri : "processing ..."
    }`;

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={ref => (this.camera = ref)} />
        <Text style={styles.predictionText}>{text}</Text>
      </View>
    );
  }
}

export default App;
