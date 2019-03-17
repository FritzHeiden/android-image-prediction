const GET = "get";

const TIMEOUT = 10000;

class PredictionService {
  constructor(ip, port) {
    this._ip = ip;
    this._port = port;
  }

  async checkConnection() {
    try {
      await this._sendRequest(GET, "/status");
      return true;
    } catch (e) {
      return false;
    }
  }

  async _sendRequest(method, uri) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.timeout = TIMEOUT;
      request.addEventListener("load", () => {
        resolve(request.response);
      });
      request.addEventListener("error", reject);
      request.open(method, `http://${this._ip}:${this._port}${uri}`, true);
      console.log("CONNECTING TO", `http://${this._ip}:${this._port}${uri}`);
      request.send();
    });
  }
}

export default PredictionService;
