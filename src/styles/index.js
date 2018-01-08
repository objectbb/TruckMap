import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containermap_container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "column",
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    app_container: {
        flex: 1,
    },
    personsearch_container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    },
    personsearch_searchtext: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'stretch',
        backgroundColor: '#d2d7d3',
        padding: 5,
        margin: 5
    },
    personsearch_touchablehighlight: {
        margin: 10,
        height: 15
    },
    personsearch_scrollview: {
        height: '20%',
        alignSelf: 'stretch',
    },
    marker: {
        borderWidth: 1,
        borderColor: '#FFF',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40
    },
    marker_text: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});