import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WishListView from './src/components/WishListView';
import { WishList } from './src/models/WishList';

const wishList = WishList.create({
  items: [
    {
        name: "LEGO Mindstorms EV3",
        price: 349.95,
        image: "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
    },
    {
        name: "Miracles - C.S. Lewis",
        price: 12.91,
        image:
            "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg"
    }
  ]
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WishListView wishList={wishList} />
      </View>
    );
  }
}

setInterval(() => {
  wishList.items[0].changePrice(wishList.items[0].price + 1)
}, 1000)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
