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
        backgroundColor: '#AEE1F5',
        padding: 5,
        margin: 5,
        opacity: 0.8
    },
    personsearch_searchtext_item: {
        fontWeight: 'bold',
    },
    personsearch_touchablehighlight: {
        margin: 2,
        height: 15,
        opacity: 0.6,
        backgroundColor: '#FDE3A7'
    },
    personsearch_scrollview: {
        height: '10%',
        alignSelf: 'stretch'
    },
    mapmarker: {
        zIndex: 9999999
    },
    mapmarker_callout: {
        height: 150,
        borderRadius: 2
    },
    mapmarker_geocode_callout: {
        marginTop: 5
    },
    mapmarker_fields_callout: {
        fontWeight: 'bold'
    },
    mapmarker_geocode_row_callout: {
        fontSize: 10,
    },
    mapmarker_scrollview_callout: {
        margin: 2,
        padding: 2,
        borderWidth: 0.5,
        borderColor: '#C0392B',
        width: '65%',
        height: 50
    },
    mapmarker_header_callout: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
});