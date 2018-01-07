import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux'
import store from "./src/reducers/combine"

import App from './src/App';

class TruckMap extends Component {
    render() {
        return (
            <Provider store={store}>
          <App />
        </Provider>
        );
    }
}

AppRegistry.registerComponent('TruckMap', () => TruckMap);