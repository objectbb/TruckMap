import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView, Dimensions, WebView } from "react-native";
import Marker from 'react-native-maps';
import MapView from 'react-native-maps';
import { styles } from './styles';


class MapMarker extends Component {
    render() {
        const { marker } = this.props;

        return (
            <MapView.Marker
              key={marker.key}
               coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
                style={styles.mapmarker}
            >

              <MapView.Callout style={styles.mapmarker_callout}>
                  <Text style={styles.mapmarker_header_callout}>{marker.info.name.title} {marker.info.name.first} {marker.info.name.last} </Text>
                   <Text><Text style={styles.mapmarker_fields_callout}>dob:</Text> {marker.info.dob} <Text style={styles.mapmarker_fields_callout}>gender:</Text> {marker.info.gender} </Text>
                  <Text>{marker.info.email} </Text>
                  <Text>{marker.info.phone}</Text>

                  <View style={styles.mapmarker_geocode_callout}>
                    <Text style={styles.mapmarker_fields_callout}> Geocode Info </Text>
                    <ScrollView style={styles.mapmarker_scrollview_callout}>
                    {Object.keys(marker.geocodeInfo).map(function(keyName, keyIndex) {
                        return (<Text key={keyIndex} style={[styles.mapmarker_geocode_row_callout,{backgroundColor: (keyIndex % 2 == 0) ? '#ecf0f1' : '#fff' } ]}>
                        <Text style={styles.mapmarker_fields_callout}> {keyName}:</Text> {marker.geocodeInfo[keyName] }
                        </Text>)
                      })}
                    </ScrollView>
                  </View>
              </MapView.Callout>
            </MapView.Marker>
        )
    }
}

export default MapMarker;