import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.iconButton}>
                <Icon name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    addToCartButton: {
        flex: 1,
        marginLeft: 10,
        height: 50,
        backgroundColor: '#1A7F65',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Footer;
