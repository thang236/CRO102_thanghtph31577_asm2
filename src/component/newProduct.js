import React, { useEffect, useState } from 'react';

import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NewProducts = ({ navigation, newProducts }) => {


    // const newProducts = [
    //     { id: 1, name: 'Espresso martini', image: 'https://img.jamieoliver.com/home/wp-content/uploads/2019/11/5.Espresso_martini_102.jpg' },
    //     { id: 2, name: 'Double shot espresso', image: 'https://file.hstatic.net/1000075078/file/_downloader.la_-61c5a3efe8a26_e89c52b940a049d7bc8aa114d2c03e5c_grande.jpg' },
    //     { id: 3, name: 'Double shot espresso', image: 'https://file.hstatic.net/1000075078/file/_downloader.la_-61c5a3efe8a26_e89c52b940a049d7bc8aa114d2c03e5c_grande.jpg' },
    //     // Add more new products as needed
    // ];
    // const [newProducts, setNewProducts] = useState([]);


    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
            <View style={styles.productItem}>
                <Image style={styles.productImage} source={{ uri: item.image }} />
                <Text style={styles.productName}>{item.nameProduct}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            horizontal
            data={newProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20,
    },
    productItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 190,
        width: 170,
        borderRadius: 10,
        backgroundColor: '#F3F3F3',
        marginRight: 20,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productName: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewProducts;
