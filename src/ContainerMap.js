import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { StyleSheet, Dimensions, View, TextInput } from 'react-native';
import Map from './Map';
import PersonSearch from './PersonSearch';
import { connect } from 'react-redux'
import { styles } from './styles';
import Toast from 'react-native-root-toast';

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
        this.searchPeople = this.searchPeople.bind(this);
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
        let LATITUDEDELTA = 0.1022;
        let OFFSET = .02;

        this.setState({
            region: {
                latitude: latitude + OFFSET,
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

    toastMsg(msg, duration) {
        let toast = Toast.show(msg, {
            duration: duration,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });

    }

    addPersontoMap(item) {
        this.updateCoords(item);

        let errormsg = ' [' + item.coords.latitude + ', ' + item.coords.longitude + ']...please try again...';

        this.toastMsg('Validating [' + item.coords.latitude + ', ' + item.coords.longitude + ']...', Toast.durations.SHORT);
        this.requestGeocode(item.coords).
        then(json => {

            if (json.error) {
                this.toastMsg(json.error + errormsg, Toast.durations.LONG);
                return
            }

            if (json.result.length == 0 || !["HOUSE_NUMBER", "STREET"].includes(json.result[0].geocodingLevel)) {
                this.toastMsg('Not a legitimate address' + errormsg, Toast.durations.LONG);
                return
            }

            this.setLocation(item.coords.latitude, item.coords.longitude)

            this.toastMsg('Successful [' + item.coords.latitude + ', ' + item.coords.longitude + ']...click marker', Toast.durations.LONG);

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
        catch(error => this.toastMsg(error.message + errormsg, Toast.durations.LONG))
    }

    searchPeople(searchText) {

        let lsearchText = words(searchText.toLowerCase(), /[^ $]+/g)
        let length = lsearchText.length

        return (searchText) ?
            this.props.people.filter(
                (item) =>
                (lsearchText.filter((phrase) =>
                    (item.keywords.filter((word) => word.indexOf(phrase) > -1)).length > 0
                )).length == length
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
               <PersonSearch people={this.searchPeople} addPersontoMap={this.addPersontoMap} />
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