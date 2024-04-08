import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductVieweds } from '../redux/actions/productviewedAction'

// Dữ liệu mặt hàng cứng
// const dummyItems = [
//     {
//         id: 1,
//         nameProduct: 'Espresso martini',
//         description: 'Description 1',
//         price: 10,
//         image: 'https://img.jamieoliver.com/home/wp-content/uploads/2019/11/5.Espresso_martini_102.jpg',
//         category: 1
//     },
//     {
//         id: 2,
//         nameProduct: 'Double shot espresso',
//         description: 'Description 2',
//         price: 20,
//         image: 'https://file.hstatic.net/1000075078/file/_downloader.la_-61c5a3efe8a26_e89c52b940a049d7bc8aa114d2c03e5c_grande.jpg',
//         category: 1
//     },
//     // Thêm các mặt hàng khác nếu cần
// ];

const RecentlyViewed = ({ navigation, onViewItem }) => {
    const dispatch = useDispatch();
    const dummyItems = useSelector(state => state.listProduct.listProduct);


    // useEffect(() => {
    //     dispatch(fetchProductVieweds());
    //     console.log("listProductViewed.length  " + dummyItems.length);
    // }, [dispatch])

    const handleViewProduct = (item) => {
        navigation.navigate('ProductDetails', { productId: item.id });


    };

    return (
        <ScrollView >
            {dummyItems.map((item, index) => (
                item.viewed == 1 ?
                    <TouchableOpacity key={index} onPress={() => handleViewProduct(item)} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.nameProduct}</Text>
                    </TouchableOpacity>
                    : <></>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 20,
        flexDirection: 'row',
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: '#F3F3F3',
        padding: 20

    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    productName: {

        marginRight: 20,
        alignSelf: 'center',
        marginStart: 20,
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RecentlyViewed;
