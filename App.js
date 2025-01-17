import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=birdsus&format=json&case=default")
            .then((response) => response.json())
            .then((json) => {
                if (originalData.length < 1) {
                    setData(json);
                    originalData = json;
                }
            })
    }, []);

    const filterData = (text) => {
        if (text !== '') {
            const filteredData = originalData.filter((item) =>
                item?.ScientificName?.toLowerCase().includes(text.toLowerCase())
            );
            setData(filteredData);
        } else {
            setData(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{item?.BirdName || 'Unknown'}</Text>
                <Text style={styles.subtitle}>{item?.ScientificName || 'N/A'}</Text>
                <Text style={styles.subtitle}>{item?.SpeciesName || 'N/A'}</Text>
                <Text style={styles.subtitle}>{item?.ID || 'N/A'}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.header}>Bird Species</Text>
            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Search by scientific name"
                onChangeText={(text) => filterData(text)}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item?.ID.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#4caf89',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,215,0,0.59)',
        color: '#330202',
    },

    card: {
        backgroundColor: '#bfec60',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        color: '#8507a1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#58605e',
    },
});

export default App;
