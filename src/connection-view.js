import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import PredictionService from "./prediction-service";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
    height: 300,
    width: 350,
    borderColor: "black"
  },
  heading: { fontSize: 30, marginBottom: 30 },
  inputLabel: { marginBottom: 10 },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  error: {
    padding: 5,
    backgroundColor: "red",
    marginBottom: 10
  },
  errorText: {
    color: "white"
  }
});

class ConnectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverString: "192.168.178.20:8080" };
  }

  async handleConnect() {
    const { serverString } = this.state;
    const { onConnect } = this.props;
    if (!serverString || !onConnect) return;
    const { 0: ip, 1: port } = serverString.split(":");
    const predictionService = new PredictionService(ip, port);
    if (await predictionService.checkConnection()) {
      onConnect(predictionService);
    } else {
      this.state.connectionError = true;
      this.setState(this.state);
    }
  }

  handleTextChange(text) {
    this.state.serverString = text;
    this.state.connectionError = false;
    this.setState(this.state);
  }

  render() {
    const { connectionError } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>{"Image Prediction"}</Text>
          {connectionError ? (
            <View style={styles.error}>
              <Text
                style={styles.errorText}
              >{`Could not connect to server. Please check your network connectivity or your provided IP and Port!`}</Text>
            </View>
          ) : null}
          <Text style={styles.inputLabel}>
            {"Enter IP and port of prediction server (<ip>:<port>):"}
          </Text>
          <TextInput
            autoComplete={"off"}
            keyboardType={"number-pad"}
            style={styles.textInput}
            onChangeText={this.handleTextChange.bind(this)}
            value={this.state.serverString}
          />
          <Button title={"Connect"} onPress={this.handleConnect.bind(this)} />
        </View>
      </View>
    );
  }
}

export default ConnectionView;
