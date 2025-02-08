import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import localImage from '../assets/size.png'; // Adjust path based on location

type SizeProps = {
  width?: string;
  depth?: string;
  height?: string;
  seatWidth?: string;
  seatDepth?: string;
  seatHeight?: string;
  imageUri?: string;
};

const SizeComponent = ({
  width = 'N/A',
  depth = 'N/A',
  height = 'N/A',
  seatWidth = 'N/A',
  seatDepth = 'N/A',
  seatHeight = 'N/A',
  imageUri,
}: SizeProps) => {
  const [expanded, setExpanded] = useState(false);

  const renderRow = (label: string, value: string, isLast: boolean) => (
    <View style={[styles.row, !isLast && styles.rowWithDivider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Collapsible Header */}
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>Size Details</Text>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={22} color="blue" />
      </TouchableOpacity>

      {/* Expanded Content */}
      {expanded && (
        <View style={styles.details}>
          <View style={styles.table}>
            {width !== 'N/A' && renderRow('Width:', width, false)}
            {depth !== 'N/A' && renderRow('Depth:', depth, false)}
            {height !== 'N/A' && renderRow('Height:', height, false)}
            {seatWidth !== 'N/A' && renderRow('Seat Width:', seatWidth, false)}
            {seatDepth !== 'N/A' && renderRow('Seat Depth:', seatDepth, false)}
            {seatHeight !== 'N/A' && renderRow('Seat Height:', seatHeight, true)} {/* Last row */}
          </View>

          {/* Display Image if available */}
          <Image source={localImage} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    marginTop: 10,
  },
  table: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowWithDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  value: {
    fontSize: 14,
    color: '#444',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default SizeComponent;
