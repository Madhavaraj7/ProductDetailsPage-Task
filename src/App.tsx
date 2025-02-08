import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './screens/ProductDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}