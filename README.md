# Android Image Prediction

An android application which captures image data from the camera to send it to the prediction server to evalute its content.

## Build

### Requirements

- [Node.js](https://nodejs.org/en/) v11.13.0 (No other version tested)
- npm v6.9.0 (No other version tested)
- [Android SDK](https://developer.android.com/studio/index.html#command-tools)
- Android SDK Platform 28
- adb v1.0.40 (for debug mode)

Set the environment variable `ANDROID_HOME` to point to the android sdk.

### Pull project dependencies

Install project related dependencies by running the following command:

```
$ npm install
```

### Building APK file

To build an apk file, simply run:

```
$ ./build.sh
```

The script will generate a `app-release.apk`. Copy the file onto your android device and run it.

### Running app in debug mode

If building an apk file is not working for you for some reason you can run the app in debug mode over adb.

1. Enable debug mode on your android device

2. Run adb server:

```
# adb start-server
```

3. Connect your android device to your pc
4. Android prompts you to allow the connected pc to debug your device
5. Run the app with:

```
$ react-native run-android
```
