import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, Button, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

import { addProductAPI, deleteProductApi, fetchProducts, toggleCheckApi, toggleFAVApi, updateProductApi } from '../redux/actions/productAction'
import { fetchComment, addCommentAPI } from '../redux/actions/commentAction'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'



const ProductDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const listProduct = useSelector(state => state.listProduct.listProduct)
    const comments = useSelector(state => state.commentItem.commentItem);


    const [selectedSize, setSelectedSize] = useState('small');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isViewed, setIsViewed] = useState(false);
    const [comment, setComment] = useState('');
    const [userUID, setUserUID] = useState('');
    const [product, setProduct] = useState({
        id: 1,
        nameProduct: 'Cappuccino',
        description: 'Cappuccino, an Italian classic, blends strong espresso with velvety steamed milk and frothy foam.',
        price: 4.99,
        image: 'https://classiccoffee.com.vn/files/common/the-nao-la-ly-ca-phe-capuchino-ngon-chuan-vi-7nvpe.png',
        category: 'Coffee',
        isFavorite: false,
        viewed: 0,
    });



    const route = useRoute();
    const { productId } = route.params;

    const getData = () => {
        const temp = listProduct.find(row => row.id == productId);

        setProduct(temp);
        setIsFavorite(temp.isFavorite);
        if (temp.viewed == 1) {
            setIsViewed(true);
        } else {
            setIsViewed(false);
        }

        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(11111, user.displayName);
                setUserUID(user.uid);
            }
        });



    }

    useEffect(() => {
        console.log(123);
        getData();


    }, [productId, dispatch])

    useEffect(() => {

        dispatch(fetchComment());

    }, [dispatch])



    const handleAddToCartPress = () => {
        // Mock API call to add product to cart
        Alert.alert('Notification', 'Add to cart complete');
    };

    const handleSizePress = (size) => {
        setSelectedSize(size);
    };

    const handleFavoritePress = () => {

        let updateFav = { isFavorite: !isFavorite };

        dispatch(toggleFAVApi({ id: product.id, data: updateFav }))
            .then((result) => {
                Alert.alert(`Product ${isFavorite ? 'removed from' : 'added to'} favorites`);

            })
            .catch((err) => console.log("error: " + err))
        setIsFavorite(!isFavorite);
    };


    const handleCheckPress = () => {
        let updateCheck = { viewed: 0 };
        if (isViewed) {
            updateCheck.viewed = 0;
        } else {
            updateCheck.viewed = 1;
        }



        dispatch(toggleCheckApi({ id: product.id, data: updateCheck }))
            .then((result) => {
                console.log("Check thanh cong");

            })
            .catch((err) => console.log("error: " + err))
        setIsViewed(!isViewed);
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            // setComments([...comments, comment]);
            // setComment('');
            let newData = {
                idProduct: product.id,
                idUser: userUID,
                message: comment
            }
            dispatch(addCommentAPI(newData))
                .then((result) => {
                    setComment('');
                }).catch((err) => console.log(err))

        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: product.image }} />
                <View style={styles.overlay}>
                    <Text style={styles.overlayTextLarge}>{product.nameProduct}</Text>
                    <Text style={styles.overlayTextSmall}>{product.description}</Text>
                </View>
                <View style={styles.overlayBottom} />
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={30} color="#FF0000" style={styles.heartIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.checkButton} onPress={handleCheckPress}>
                    <Ionicons name={isViewed ? 'checkmark-circle' : 'checkmark-circle-outline'} size={30} color="#ADFF1D" style={styles.heartIcon} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.information}>
                    <View style={styles.flexRow}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Size</Text>

                    </View>

                    <View style={styles.flexRow1}>
                        <TouchableOpacity
                            style={[
                                styles.boxSize,
                                selectedSize === 'small' && { borderColor: '#015C33', backgroundColor: '#015C33' },
                            ]}
                            onPress={() => handleSizePress('small')}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Small</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.boxSize,
                                selectedSize === 'medium' && { borderColor: '#015C33', backgroundColor: '#015C33' },
                            ]}
                            onPress={() => handleSizePress('medium')}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.boxSize,
                                selectedSize === 'large' && { borderColor: '#015C33', backgroundColor: '#015C33' },
                            ]}
                            onPress={() => handleSizePress('large')}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Large</Text>
                        </TouchableOpacity>
                    </View>


                    {/* About section */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 25, marginTop: 30 }}>About</Text>
                    <Text style={{ marginHorizontal: 25, marginTop: 10 }}>{product.description}</Text>

                    {/* Add to cart button */}
                    <TouchableOpacity style={styles.btnAdd} onPress={handleAddToCartPress}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Add To Cart     |      ${product.price}</Text>
                    </TouchableOpacity>

                    {/* Comments section */}
                    <View style={{ marginTop: 100 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 25 }}>Comments</Text>


                        {comments.map((comment, index) => (
                            Number(comment.idProduct) == product.id ? (
                                <View key={index} style={{ marginHorizontal: 25, marginTop: 10 }}>
                                    <Text>{ }</Text>
                                    <Text key={index} >{comment.message}</Text>

                                </View>
                            ) : (
                                <></>
                            )
                        ))}

                        <TextInput
                            style={{ marginHorizontal: 25, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10 }}
                            placeholder="Write a comment..."
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                        />

                        <TouchableOpacity onPress={() => handleCommentSubmit()} style={{ alignSelf: 'center', marginTop: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'gray', borderRadius: 20 }}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 40,
        paddingLeft: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayTextLarge: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    overlayTextSmall: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'normal',
    },
    overlayBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: 'black',
    },
    information: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 23,
        marginTop: 30,
        marginBottom: 30,
    },
    flexRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 23,
        marginBottom: 30,
    },
    boxSize: {
        height: 40,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAdd: {
        backgroundColor: '#005223',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: 60,
        zIndex: 1,
    },
    checkButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    heartIcon: {
        fontWeight: 'bold',
    },
    commentContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: '#005223',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentList: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    commentItem: {
        marginBottom: 10,
    },
    commentText: {
        fontSize: 16,
    },
});


export default ProductDetails;

