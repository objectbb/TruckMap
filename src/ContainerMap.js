import React, { Component } from 'react';
import { PropTypes } from "prop-types"
import { StyleSheet, Dimensions, View, TextInput } from 'react-native';
import Map from './Map';
import PersonSearch from './PersonSearch';
import { connect } from "react-redux"
import { styles } from './styles';
import Toast from 'react-native-simple-toast';
import {
    values,
    flatten,
    intersection,
    words,
    some,
    includes
} from "lodash"

class ContainerMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            marker: null
        }

        this.setLocation = this.setLocation.bind(this);
        this.randomCoords = this.randomCoords.bind(this);
        this.addPersontoMap = this.addPersontoMap.bind(this);
        this.peopleSearch = this.peopleSearch.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
        this.prepData = this.prepData.bind(this);
    }

    componentWillMount() {
        this.setLocation(41.8827779, -87.6849345);
        this.prepData();
    }

    prepData() {
        this.props.people.forEach((item) => {
            item.interests = item.interest_ids.map(
                (id) => this.props.interests.find((item) => item.id === id)
            );
            item.keywords = [item.name.first, item.name.last].concat(values(item.interests.map((item) => item.hobby.toLowerCase())))
        })
    }

    setLocation(latitude, longitude) {

        let { width, height } = Dimensions.get('window');
        let LATITUDEDELTA = 0.1022

        this.setState({
            region: {
                latitude: latitude + .02,
                longitude: longitude,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LATITUDEDELTA * (width / height),
            }
        });
    }

    generateURL(coords) {
        return "https://services.gisgraphy.com/reversegeocoding/search?format=json&lat=" +
            coords.latitude +
            "&lng=" + coords.longitude
    }

    async requestGeocode(params) {
        const URL = this.generateURL(params);

        const response = await fetch(URL)
        return await response.json()
    }

    addPersontoMap(item) {
        this.updateCoords(item);

        let errormsg = ' [' + item.coords.latitude + ', ' + item.coords.longitude + ']...please try again...';

        Toast.show('Validating [' + item.coords.latitude + ', ' + item.coords.longitude + ']...', Toast.SHORT);
        this.requestGeocode(item.coords).
        then(json => {

            if (json.error) {
                Toast.show(json.error + errormsg);
                return
            }

            if (json.result.length == 0 || !["HOUSE_NUMBER", "STREET"].includes(json.result[0].geocodingLevel)) {
                Toast.show('Not a legitimate address' + errormsg);
                return
            }

            this.setLocation(item.coords.latitude, item.coords.longitude)

            Toast.show('Successful [' + item.coords.latitude + ', ' + item.coords.longitude + ']...click marker');

            this.setState({
                marker: {
                    coords: item.coords,
                    title: item.name.first + ' ' + item.name.last,
                    info: item,
                    geocodeInfo: json.result[0],
                    interests: item.interests
                }
            })
        }).
        catch(error => Toast.show(error.message + errormsg))
    }

    peopleSearch(searchText) {

        let lsearchText = words(searchText.toLowerCase(), /[^ $]+/g)
        return (searchText) ?
            this.props.people.filter(
                (item) =>
                (lsearchText.filter((phrase) =>
                    (item.keywords.filter((word) => word.indexOf(phrase) > -1)).length > 0
                )).length >= lsearchText.length
            )
            : []
    }

    randomCoords(to, from, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    updateCoords(item) {
        item.coords = {
            latitude: this.randomCoords(49.3457868, 24.7433195, 7),
            longitude: this.randomCoords(-124.7844079, -66.9513812, 7)
        }
    }

    render() {

        return (
            <View style={styles.containermap_container}>
              <Map region={this.state.region} marker={this.state.marker}/>
               <PersonSearch people={this.peopleSearch} addPersontoMap={this.addPersontoMap} />
            </View>
        );
    }
}


function mapStateToProps(state) {
    const { people, interests } = state

    return {
        people,
        interests
    }
}

export default connect(mapStateToProps)(ContainerMap)