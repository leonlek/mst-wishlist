import React, { Component } from 'react';
import { View, Text } from 'react-native';

const WishListItemView = ({ item }) => (
    <View>
        <Text>{item.name} || price: {item.price}</Text>
    </View>
);

export default WishListItemView;
