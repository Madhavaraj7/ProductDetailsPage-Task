import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ColorSelector = ({ variants, onSelect }: { variants: any[]; onSelect: (variant: any) => void }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleSelect = (variant: any) => {
    setSelectedVariant(variant);
    onSelect(variant);
  };

  return (
    <View style={styles.container}>
      {variants.map((variant, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorButton,
            selectedVariant.name === variant.name && styles.selectedColor,
          ]}
          onPress={() => handleSelect(variant)}
        >
          <View style={[styles.colorBox, { backgroundColor: variant.colorCode }]} />
          <Text style={styles.colorText} numberOfLines={1}>
            {variant.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  colorButton: {
    flexDirection: 'row', // Ensures horizontal layout
    alignItems: 'center',
    width: '48%', // Keeps buttons on the same line (2 per row)
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#fff',
  },
  selectedColor: {
    borderColor: '#006400', // Dark green for the selected border
  },
  colorBox: {
    width: 30, // Size of the color box
    height: 30,
    borderRadius: 5,
    marginRight: 10, // Space between the color box and text
  },
  colorText: {
    fontSize: 16, // Font size for better readability
    color: '#000',
    fontWeight: '500',
    flexShrink: 1, // Ensures text resizes if space is limited
  },
});

export default ColorSelector;
