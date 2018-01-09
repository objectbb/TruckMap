import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { connect } from "react-redux"
import { StyleSheet, View } from 'react-native';
import { styles } from './styles';

import {
    loadInterests,
    loadPeople
} from "./actions"

import ContainerMap from './ContainerMap';

class App extends Component {

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(loadInterests())
        dispatch(loadPeople())
    }

    render() {
        return (
            <View style={styles.app_container}>
            <ContainerMap dispatch={this.dispatch} />
          </View>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect(null)(App)