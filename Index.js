import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import WishListView from './src/components/WishListView';
import { Group } from './src/models/Group';
import { onSnapshot } from 'mobx-state-tree';
import { Text, Item, Picker, Button, Icon } from 'native-base';

export default class Index extends React.Component {
  constructor(props) {
    super(props) 
    this.state = ({
      selectedUser: null
    })
    
    console.log('test test', Array.from(this.props.group.users))
    Array.from(this.props.group.users).map(user => {
      console.log('users:', user)
    })
  }
  
  onSelectUser = (user) => {
    this.setState({ selectedUser: user });
  }
  
  render() {
    const { group } = this.props;
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
        <Button onPress={group.reload}><Text>RELOAD</Text></Button>
        <Button onPress={group.drawLots}><Text>Draw Lots</Text></Button>
        {selectedUser && <User user={selectedUser} />}
      </View>
    );
  }
}

const User = observer(({ user }) => (
  <View style={{ width: 300, length: 300 }}>
    <WishListView wishList={user.wishList} />
    <Button onPress={user.getSuggestions}>
      <Text>Suggestions</Text>
      <Text>{user.recipient ? user.recipient.name : ''}</Text>
      {user.recipient && <WishListView wishList={user.recipient.wishList} />}
    </Button>
  </View>
)) 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});


{/* <Picker 
  mode='dropdown'
  placeholder='select user'
  iosIcon={<Icon name="ios-arrow-down" />}
  selectedValue={this.state.selectedUser}
  onValueChange={(user) => this.onSelectUser(user)}
>
  {Array.from(group.users.values()).map(user => 
    <Picker.Item label={user.name} key={user.id} value={user.id} />
    )}
</Picker> */}

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

