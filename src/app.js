import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Camera from "./camera";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  camera: { flex: 1 }
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} />
      </View>
    );
  }
}

export default App;
