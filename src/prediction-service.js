const GET = "get";
const POST = "post";

const TIMEOUT = 10000;

const NO_NUMBER_RECOGNIZED = "no_number_recognized";

class PredictionService {
  constructor(ip, port) {
    this._ip = ip;
    this._port = port;
  }

  async predictNumber(base64Data) {
    const response = await this._sendRequest(
      POST,
      "/prediction/predict_number",
      base64Data,
      {
        "Content-Type": "text/plain; charset=utf-8"
      }
    );
    return JSON.parse(response).prediction;
  }

  async checkConnection() {
    try {
      await this._sendRequest(GET, "/status");
      return true;
    } catch (e) {
      return false;
    }
  }

  async _sendRequest(method, uri, data = "", headers) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.timeout = TIMEOUT;
      request.addEventListener("load", () => {
        resolve(request.response);
      });
      request.addEventListener("error", reject);
      request.open(method, `http://${this._ip}:${this._port}${uri}`, true);
      if (headers) {
        Object.keys(headers).forEach(header =>
          request.setRequestHeader(header, headers[header])
        );
      }
      console.log("CONNECTING TO", `http://${this._ip}:${this._port}${uri}`);
      request.send(data);
    });
  }
}

PredictionService.NO_NUMBER_RECOGNIZED = NO_NUMBER_RECOGNIZED;

export default PredictionService;
