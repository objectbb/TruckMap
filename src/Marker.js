import React, { Component, View, Text, Animated, StyleSheet} from "react-native";
import { Marker } from 'react-native-maps';

export default class MapMarker extends Component {
  render() {
    const { title, description, coordinate } = this.props;

    return (
      <Marker coordinate={coordinate}>
        <View style={styles.marker}>
          <Text style={styles.text}>{description}</Text>
        </View>
      </Marker>
    )
  }
}

const styles = StyleSheet.create({
  marker: {
    borderWidth: 1,
    borderColor: '#FFF',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  bus: {
    backgroundColor: '#333'
  },
  rail90: {
    backgroundColor: '#D11241'
  },
  rail100: {
    backgroundColor: '#0069AA'
  },
  rail190: {
    backgroundColor: '#FFC423'
  },
  rail200: {
    backgroundColor: '#008752'
  },
  rail290: {
    backgroundColor: '#D25D13'
  }
})


