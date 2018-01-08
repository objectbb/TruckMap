import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

class PersonSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' }
        this.changeSearchText = this.changeSearchText.bind(this);
    }

    changeSearchText(search) {
        this.setState({ searchText: search });
    }

    render() {
        return (
            <View style={styles.container}>
            < TextInput style = {styles.searchText}
                onChangeText = {
                (text) => this.changeSearchText(text) }
                value = { this.state.searchText }
            />
            <ScrollView style={styles.scrollview}>
            {
                this.props.people(this.state.searchText).map((item,index) => (
                    <TouchableHighlight key={index} style={styles.personSearch}
                    onPress={() => this.props.addPersontoMap(item)} >
                        <Text key={index} >{item.name.first} {item.name.last}</Text>
                    </TouchableHighlight>
              ))
            }
           </ScrollView>


              </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    },
    searchText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'stretch',
        backgroundColor: '#d2d7d3',
        padding: 5,
        margin: 5
    },
    personSearch: {
        margin: 10,
        height: 15
    },
    scrollview: {
        height: '20%'
    }

});

export default PersonSearch;