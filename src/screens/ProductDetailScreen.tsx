import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { fetchProductDetails } from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Share Icon
import ColorSelector from '../components/ColorSelector';
import ProductDescription from '../components/ProductDescription';
import SizeComponent from '../components/SizeComponent';
import ReviewSection from '../components/ReviewSection';
import FrequentlyBoughtSection from '../components/FrequentlyBoughtSection';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);

    useEffect(() => {
        const loadProductDetails = async () => {
            try {
                const data = await fetchProductDetails();
                if (data && data.product) {
                    const { primary, gallery } = data.product.images;
                    const uniqueImages = Array.from(new Set([primary, ...gallery.map((img: { url: any; }) => img.url)]));

                    setProduct({
                        ...data.product,
                        images: uniqueImages,
                        isBestSeller: true,
                    });
                    setSelectedImage(uniqueImages[0]);
                    setSelectedVariant(data.product.variants[0]); // Default to the first variant
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        loadProductDetails();
    }, []);

    const handleVariantSelect = (variant: any) => {
        setSelectedVariant(variant);
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!product) {
        return <Text>Failed to load product details.</Text>;
    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 80 }]}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: selectedImage || product.images[0] }}
                        style={styles.mainImage}
                    />

                    {product.isBestSeller && (
                        <View style={styles.bestSellerTag}>
                            <Text style={styles.bestSellerText}>Best Seller</Text>
                        </View>
                    )}

                    <View style={styles.thumbnailOverlay}>
                        {product.images.map((image: string, index: number) => (
                            <TouchableOpacity key={index} onPress={() => setSelectedImage(image)}>
                                <View
                                    style={[
                                        styles.thumbnailWrapper,
                                        selectedImage === image && styles.selectedThumbnailWrapper,
                                    ]}
                                >
                                    <Image source={{ uri: image }} style={styles.thumbnail} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Product Title with Share Icon */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{product.name}</Text>
                    <TouchableOpacity onPress={() => console.log('Share pressed')}>
                        <Icon name="share-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Price, Discount, and Original Price in One Line */}
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>${selectedVariant.price.current}</Text>
                    <Text style={styles.originalPrice}>${selectedVariant.price.original}</Text>
                    <View style={styles.discountTag}>
                        <Text style={styles.discountText}>{selectedVariant.price.discount}</Text>
                    </View>
                </View>

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ {product.rating.score}</Text>
                    <Text style={styles.reviewCount}>({product.rating.totalReviews})</Text>
                </View>

                <Text style={styles.shortDescription}>{product.description.short}</Text>
                <View style={styles.divider} />


                {/* Color Selector */}
                <ColorSelector
                    variants={product.variants}
                    onSelect={handleVariantSelect}
                />
                <View style={styles.divider} />
                <ProductDescription
                    short={product.description.short}
                    long={product.description.long}
                />
                <View style={styles.divider} />
                <SizeComponent
                    width={product.dimensions.width}
                    depth={product.dimensions.depth}
                    height={product.dimensions.height}
                    seatWidth={product.dimensions.seatWidth}
                    seatDepth={product.dimensions.seatDepth}
                    seatHeight={product.dimensions.seatHeight}
                />

                <View style={styles.divider} />
                <ReviewSection reviews={product.reviews} />

                {product.frequentlyBoughtWith && product.frequentlyBoughtWith.length > 0 && (
                    <FrequentlyBoughtSection products={product.frequentlyBoughtWith} />
                )}



            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "white"
    },
    imageContainer: {
        width: '100%',
        height: 450,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bestSellerTag: {
        position: 'absolute',
        top: 10,
        left: 5,
        backgroundColor: '#E44A4A',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    bestSellerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    thumbnailOverlay: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailWrapper: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
    selectedThumbnailWrapper: {
        borderColor: 'green',
        borderWidth: 2,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    title: {
        fontSize: 16, // Made it smaller
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    currentPrice: {
        fontSize: 30, // Made it BIGGER
        color: 'black',
        fontWeight: 'bold',
    },
    discountTag: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: '#E44A4A', // Background is red
        borderTopLeftRadius: 15,  // Only two edges have border-radius
        borderBottomRightRadius: 15,
    },
    discountText: {
        fontSize: 16, // Made it slightly bigger
        color: 'white', // Text is white
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
        fontSize: 15, // Made it bigger
        marginLeft: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ratingText: {
        fontSize: 16,
        color: 'black',
        marginRight: 5,
    },
    reviewCount: {
        fontSize: 14,
        color: '#555',
    },
    shortDescription: {
        fontSize: 16,
        marginTop: 10,
        color: '#333',
    },
    divider: {
        height: 2,
        backgroundColor: '#ccc', // Light gray color
        marginVertical: 11, // Spacing above and below
    },
});

export default ProductDetailScreen;
