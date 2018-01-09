import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from './styles';

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
            <View style={styles.personsearch_container}>
            < TextInput style = {styles.personsearch_searchtext}
                onChangeText = {
                (text) => this.changeSearchText(text) }
                value = { this.state.searchText }
            />
            <ScrollView style={styles.personsearch_scrollview}>
            {
                this.props.people(this.state.searchText).map((item,index) => (
                    <TouchableHighlight key={index} style={styles.personsearch_touchablehighlight}
                    onPress={() => this.props.addPersontoMap(item)} >
                        <Text style={styles.personsearch_searchtext_item} key={index} >{item.name.first} {item.name.last}</Text>
                    </TouchableHighlight>
              ))
            }
           </ScrollView>
           </View>
        );

    }
}


export default PersonSearch;