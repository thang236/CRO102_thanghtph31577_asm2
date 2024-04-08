import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { addProductAPI, deleteProductApi, fetchProducts, updateProductApi } from '../redux/actions/productAction'



const HotProducts = ({ hotProducts, navigation }) => {







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
            data={hotProducts}
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

export default HotProducts;
