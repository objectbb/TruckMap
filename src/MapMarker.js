import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet } from "react-native";
import Marker from 'react-native-maps';
import MapView from 'react-native-maps';

class MapMarker extends Component {
    render() {
        const { marker } = this.props;

        return (
            <MapView.Marker
              key={marker.key}
               coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
            />
        )
    }
}

export default MapMarker;