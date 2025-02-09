import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Product {
    images: {
        primary: string;
    };
    discount: string;
    name: string;
    price: number;
    originalPrice: number;
    rating: {
        score: number;
        totalReviews: number;
    };
}

interface FrequentlyBoughtSectionProps {
    products: Product[];
}

const FrequentlyBoughtSection: React.FC<FrequentlyBoughtSectionProps> = ({ products }) => {
    const [scrollX, setScrollX] = useState(0);

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        setScrollX(scrollPosition);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Frequently Bought</Text>
                <TouchableOpacity>
                    <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {products.map((product, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.images.primary }} style={styles.image} />
                            <View style={styles.discountTag}>
                                <Text style={styles.discountText}>{product.discount}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.currentPrice}>${product.price}</Text>
                                <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>⭐ {product.rating.score}</Text>
                                <Text style={styles.reviewCount}>({product.rating.totalReviews})</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${(scrollX / (screenWidth * products.length * 0.5)) * 100}%`,
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 10,
        backgroundColor : "#FFFFFF"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeMoreText: {
        fontSize: 14,
        color: '#1A7F65',
        fontWeight: 'bold',
    },
    card: {
        width: screenWidth * 0.5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        height: 320,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    discountTag: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: '#E44A4A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    discountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 10,
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
    },
    priceContainer: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    currentPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    originalPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontSize: 12,
        color: '#333',
        marginRight: 5,
    },
    reviewCount: {
        fontSize: 12,
        color: '#888',
    },
    progressBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    progressBarBackground: {
        height: 4,
        width: '40%', 
        backgroundColor: '#ddd',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1A7F65',
    },
});

export default FrequentlyBoughtSection;
