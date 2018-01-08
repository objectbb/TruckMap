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
            marker: {
                coords: { latitude: 41.8827779, longitude: -87.6849345 },
                title: "2323 W. Washington Unit:2",
                description: "2323 W. Washington Unit:2"
            }
        }

        this.setLocation = this.setLocation.bind(this);
        this.randomCoords = this.randomCoords.bind(this);
        this.addPersontoMap = this.addPersontoMap.bind(this);
        this.peopleSearch = this.peopleSearch.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
    }

    componentWillMount() {
        this.setLocation(41.8827779, -87.6849345)
    }

    setLocation(latitude, longitude) {

        let { width, height } = Dimensions.get('window');
        let LATITUDEDELTA = 0.1022

        this.setState({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LATITUDEDELTA * (width / height),
            }
        });
    }


    addPersontoMap(item) {
        this.updateCoords(item)
        item.geocodeInfo = this.getGeocodeInfo(item);
        this.setLocation(item.coords.latitude, item.coords.longitude)

        this.setState({
            marker: {
                coords: item.coords,
                title: item.name.first + ' ' + item.name.last,
                description: this.email
            }
        })

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

    randomCoords(to, from, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    updateCoords(item) {
        item.coords = {
            latitude: this.randomCoords(48, 46, 7),
            longitude: this.randomCoords(-88, -86, 7)
        }
    }

    getGeocodeInfo(item) {
        //item.coords
    }

    render() {
        return (
            <View style={styles.container}>
              <Map region={this.state.region} marker={this.state.marker}/>
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