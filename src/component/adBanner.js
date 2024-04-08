import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import avatar1 from '../image/avt.jpeg';


const AdBanner = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.bannerImage} source={{ uri: 'https://cdn-merchant.vinid.net/images/gallery/vinshop-seo/image_upload_1670041590_ban-gio-qua-tet-7.jpg' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    bannerImage: {
        width: 400,
        height: 200,
        borderRadius: 10,
    },
});

export default AdBanner;
