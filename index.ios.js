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
  View,
  TouchableOpacity,
} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

function Button({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

export default class BackgroundLocationTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
    };
  }

  componentDidMount() {
    BackgroundGeolocation.on('location', (location) => {
      console.log('location event', location);
    });

    BackgroundGeolocation.configure({
      debug: true,
      desiredAccuracy: 100,
      distanceFilter: 100,
      autoSync: false,
      stopOnTerminate: false,
      disableMotionActivityUpdates: true,
      locationAuthorizationRequest: 'WhenInUse',
    }, () => {
      console.log('configuration complete...')
      this.setState({ enabled: true });
    });
  }

  getLocation() {
    BackgroundGeolocation.start(() => {
      console.log('Tracking started...');
    });
  }

  stopTracking() {

    BackgroundGeolocation.stop(() => {
      console.log('Tracking stopped...');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.enabled ?
          [
            <Button key="1" onPress={this.getLocation}>Start tracking</Button>,
            <Button key="2" onPress={this.stopTracking}>Stop tracking</Button>,
          ]
        :
          <Text>Loading...</Text>
        }
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
