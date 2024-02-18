# SplintInvest demo app
By Luka Djordjevic (lulo.djordjevic@gmail.com)

## About

This is a simple react-native app that uses [Alpha Vantage API](https://www.alphavantage.co/documentation/) to retrieve stocks lists and show them on the **Home page**. You can the click on a particular stock and see it's **Stock details page**.

The app is set up to use 'demo' API key. This is fine but all the stock details pages will be displaying IBM data.<br>
You can edit `/src/constants.ts` and switch to a private key which allows a few dozen calls per day. You can also provide you own key.

## Installation

### Android

You'll need Node and Android Studio. I used Android 13 (Tiramisu) SDK. Make sure you have at least one working simulator.
Then clone repo and from there run:<br>
`npm install`<br>
`npm start`<br>

That will start Metro bundler. Press 'a' to start android dev server, and simulator should fire up automatically.

If that doesn't work, you can try running the app from Android Studio. Just open folder `/android` and run it.

You can also try running on a physical phone. You can find instructions [here](https://reactnative.dev/docs/running-on-device).

### IOS

On macOs, you'll need Xcode, Node and CocoaPods installed. You can add them with homebrew. Then just<br>
`npm install`<br>
`cd ios`<br>
`pod install`<br>
`cd ..`<br>
`npm start`<br>

Finally press 'i' and that should be it.
