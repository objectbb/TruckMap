import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from './MapMarker';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <MapView
              provider={this.props.provider}
              region={this.props.region}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={false}
            >
              <MapMarker
                  marker={this.props.marker}
                />
            </MapView>

        );
    }
}


const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
});


export default Map;