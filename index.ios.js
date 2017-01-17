/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

export default class BackgroundLocationTest extends Component {
  componentDidMount() {
    const desiredStatus = 'WhenInUse';

    BackgroundGeolocation.configure({
      debug: true,
      desiredAccuracy: 100,
      distanceFilter: 100,
      autoSync: false,
      stopOnTerminate: false,
      disableMotionActivityUpdates: true,
      locationAuthorizationRequest: desiredStatus,
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log(location);
    });

    BackgroundGeolocation.on('providerchange', function({ status }) {
      console.log('- providerchange', status)
      const authorizationStatus = (function(status) {
        switch(status) {
          case BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS:
            return 'Always';
          case BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE:
            return 'WhenInUse';
          default:
            return undefined;
        }
      })(status);

      if (authorizationStatus == desiredStatus) {
        BackgroundGeolocation.start();
      }
    });

    BackgroundGeolocation.getCurrentPosition(location => {
      console.log('- location', location)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BackgroundLocationTest', () => BackgroundLocationTest);
