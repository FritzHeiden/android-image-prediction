import React from "react";

import ConnectionView from "./connection-view";
import PredictionView from "./prediction-view";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { predictionService: null };
  }

  handleConnection(predictionService) {
    this.state.predictionService = predictionService;
    this.setState(this.state);
  }

  render() {
    const { predictionService } = this.state;

    if (!predictionService) {
      return <ConnectionView onConnect={this.handleConnection.bind(this)} />;
    } else {
      return <PredictionView predictionService={predictionService} />;
    }
  }
}

export default App;
