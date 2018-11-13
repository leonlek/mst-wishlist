import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';
import WishListItemView from './WishListItemView';

const WishListView = ({ wishList }) => (
    <View>
        {wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}
        <Text>Total : {wishList.totalPrice}THB</Text>
    </View>
);

export default observer(WishListView);