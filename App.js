import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import WishListView from './src/components/WishListView';
import { Group } from './src/models/Group';
import { onSnapshot } from 'mobx-state-tree';
import { Text, Item, Picker, Button, Icon } from 'native-base';

let initialState = {
  users: {
    "a342": {
        id: "a342",
        name: "Homer",
        gender: "m"
    },
    "5fc2": {
        id: "5fc2",
        name: "Marge",
        gender: "f"
    },
    "663b": {
        id: "663b",
        name: "Bart",
        gender: "m"
    },
    "65aa": {
        id: "65aa",
        name: "Maggie",
        gender: "f"
    },
    "ba32": {
        id: "ba32",
        name: "Lisa",
        gender: "f"
    }
  } 
}

const group = Group.create(initialState);

export default class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = ({
      selectedUser: null
    })
  }
  onSelectUser = (user) => {
    this.setState({ selectedUser: user });
  }
  render() {
    //const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUser);
    return (
      <View style={styles.container}>
        <Item picker>
          <Picker 
            mode='dropdown'
            placeholder='select user'
            iosIcon={<Icon name="ios-arrow-down" />}
            selectedValue={this.state.selectedUser}
            onValueChange={(user) => this.onSelectUser(user)}
          >
            {Array.from(group.users.values()).map(user => 
              <Picker.Item label={user.name} key={user.id} value={user.id} />
              )}
          </Picker>
        </Item>
        {selectedUser && <WishListView wishList={selectedUser.wishList} />}
        {selectedUser && <Button block onPress={selectedUser.getSuggestions}><Text>Suggestions</Text></Button>}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});


// const initialState = {
//   items: [
//     {
//         name: "LEGO Mindstorms EV3",
//         price: 349.95,
//         image: "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
//     },
//     {
//         name: "Miracles - C.S. Lewis",
//         price: 12.91,
//         image:
//             "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg"
//     }
//   ]
// };

// const wishList = WishList.create(initialState);

// if (AsyncStorage.getItem('wishlishapp')) {
//   const json = JSON.parse(AsyncStorage.getItem('wishlistapp'));
//   if (WishList.is(json)) initialState = json;
// }

// onSnapshot(wishList, snapshot => {
//   AsyncStorage.setItem('wishlistapp', JSON.stringify(snapshot));
// })


// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000)

