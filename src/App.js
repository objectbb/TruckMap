import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { connect } from "react-redux"
import {
    StyleSheet,
    View
} from 'react-native';

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
            <View style={styles.container}>
            <ContainerMap />
          </View>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default connect(null)(App)