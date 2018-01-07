import React, { Component } from 'react';
import { PropTypes } from "prop-types"
import { StyleSheet, Dimensions, View, TextInput } from 'react-native';
import Map from './Map';
import PersonSearch from './PersonSearch';
import { connect } from "react-redux"

class ContainerMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            interests: [],
            markers: [{
                    key: 1,
                    coords: { latitude: 41.8827779, longitude: -87.6849345 },
                    title: "2323 W. Washington Unit:2",
                    description: "2323 W. Washington Unit:2"
                },
                {
                    key: 2,
                    coords: { latitude: 41.8774014, longitude: -87.6900847 },
                    title: "323 N Western #3",
                    description: "323 N Western #3"
                },
                {
                    key: 3,
                    coords: { latitude: 41.9240041, longitude: -87.6875425 },
                    title: "2323 N Western 2C",
                    description: "2323 N Western 2C"
                }
            ]
        }

        this.setLocation = this.setLocation.bind(this);
        this.currMarkers = this.currMarkers.bind(this);
        this.randomCoords = this.randomCoords.bind(this);
        this.addPersontoMap = this.addPersontoMap.bind(this);
        this.peopleSearch = this.peopleSearch.bind(this);
    }

    componentWillMount() {
        this.setLocation(41.8827779, -87.6849345)
    }

    setLocation(latitude, longtitude) {

        let { width, height } = Dimensions.get('window');
        let LATITUDEDELTA = 0.1022

        this.setState({
            region: {
                latitude: latitude,
                longitude: longtitude,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LATITUDEDELTA * (width / height),
            }
        });
    }

    currMarkers() {
        return this.state.markers.filter((item) => item.coords);
    }

    addPersontoMap(item) {
        updateCoords(item)
        item.geocodeInfo = getGeocodeInfo(item);
        setLocation(item.coords.latitude, item.coords.longtitude)
    }

    peopleSearch(searchText) {
        let lsearchText = searchText.toLowerCase();

        return (searchText) ?
            this.props.people.filter(
                (item) => {
                    return item.name.first.includes(lsearchText) || item.name.last.includes(lsearchText)
                }
            ) : []
    }

    randomCoords() {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    updateCoords(item) {
        item.coords = { latitude: this.randomCoords, longitude: this.randomCoords }
    }

    getGeocodeInfo(item) {
        //item.coords
    }

    render() {
        return (
            <View style={styles.container}>
              <Map region={this.state.region} markers={this.currMarkers}/>
               <PersonSearch people={this.peopleSearch} addPersontoMap={this.addPersontoMap} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "column",
        flex: 1
    },
});

function mapStateToProps(state) {
    const { people, interests } = state

    return {
        people,
        interests
    }
}

export default connect(mapStateToProps)(ContainerMap)