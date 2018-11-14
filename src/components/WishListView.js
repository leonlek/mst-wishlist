import React from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';

import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';

const WishListView = ({ wishList }) => (
    <View style={{ width: 300, length: 300 }}>
        {wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}
        <Text>Total : {wishList.totalPrice}THB</Text>
        <WishListItemEntry wishList={wishList} />
    </View>
);

export default observer(WishListView);