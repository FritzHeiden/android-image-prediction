import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flexDirection: "column" }
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{"Hello World"}</Text>
      </View>
    );
  }
}

export default App;
