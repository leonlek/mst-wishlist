import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import WishListView from './src/components/WishListView';
import { WishList } from './src/models/WishList';
import { onSnapshot } from 'mobx-state-tree';
import { Item, } from 'native-base';

const initialState = {
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
};

const wishList = WishList.create(initialState);

// if (AsyncStorage.getItem('wishlishapp')) {
//   const json = JSON.parse(AsyncStorage.getItem('wishlistapp'));
//   if (WishList.is(json)) initialState = json;
// }

// onSnapshot(wishList, snapshot => {
//   AsyncStorage.setItem('wishlistapp', JSON.stringify(snapshot));
// })

export default class App extends React.Component {
  onSelectUser = (user) => {
    this.setState({ selectedUser: user });
  }
  render() {
    const { group } = this.props;
    //const seletedUser = group.users.get(this.state.seletedUser);
    return (
      <View style={styles.container}>
        <WishListView wishList={wishList} />
      </View>
    );
  }
}

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});
