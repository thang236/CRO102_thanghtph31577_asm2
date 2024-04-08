import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, RefreshControl, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QuantitySelector from '../component/quantitySelector';
import { MyTheme, useTheme } from '../Themes/MyTheme'
import { addToCartAPI, removeCartItemAPI, fetchCart, updateCartItemAPI } from '../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'


// const dummyData = [
//     {
//         id: 1,
//         nameProduct: 'Product 1',
//         description: 'Description 1',
//         price: 10,
//         image: 'https://via.placeholder.com/150',
//         quantity: 1
//     },
//     {
//         id: 2,
//         nameProduct: 'Product 2',
//         description: 'Description 2',
//         price: 20,
//         image: 'https://via.placeholder.com/150',
//         quantity: 1
//     },
//     // Add more dummy data as needed
// ];

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartItems.cartItems)
    const { theme, toggleTheme } = useTheme();


    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(products.length);
    const [refreshing, setRefreshing] = useState(false);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch])

    const handleRemoveCart = (id) => {
        // Implement your logic for removing an item from the cart here
        console.log(`Removing item with ID: ${id}`);
    };

    const handleQuantityChange = (newQuantity, index) => {
        // Write your logic to handle quantity change here
    };

    const renderProductItem = ({ item, index }) => (
        <View>
            <View style={[styles.itemContainer]}>
                <Image style={styles.productImage} source={{ uri: item.image }} />
                <View style={styles.infoItem}>
                    <Text style={[styles.titleSmall, { color: theme.textColor }]}>{item.nameProduct}</Text>
                    <Text>{item.description}</Text>
                    <Text style={styles.price}>$ {item.price}</Text>
                    <QuantitySelector
                        initialValue={item.quantity}
                        onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity, index)}
                    />
                </View>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => handleRemoveCart(item.id)}>
                    <Ionicons name="trash" size={30} color="#055E38" />
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: theme.textColor }}>My Cart</Text>
            </View>
            <View style={styles.boxText}>
                <Ionicons name="bag-check" size={20} color="#FF7B33" style={styles.cartIcons} />
                <Text style={{ color: '#FF7B33', fontSize: 16, fontWeight: '500', color: theme.textColor }}>You have {totalItems} items in your cart</Text>
            </View>
            <FlatList
                style={{ marginBottom: 20 }}
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    backIcon: {
        position: 'absolute',
        left: 15,
    },
    boxText: {
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        height: 50,
        width: '80%',
        backgroundColor: '#FFF4EE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    cartIcons: {
        marginRight: 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginStart: 25,
        marginTop: 30,
    },
    productImage: {
        height: 120,
        width: 120,
        borderRadius: 20,
    },
    infoItem: {
        marginStart: 20,
        width: '50%'
    },
    titleSmall: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 15,
    },
    line: {
        width: '90%',
        height: 1,
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 25,
        borderColor: '#E5E5E5',
    },
});

export default Cart;
