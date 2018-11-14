import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
//import { Input } from 'react-native-elements';
//import { TextInput } from '@shoutem/ui';
import { Item, Input } from 'native-base';

class WishListItemEdit extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <View style={{ width: 300, length: 300 }}>
                <Item regular>
                    <Input 
                        placeholder='Name'
                        onChangeText={(name) => item.changeName(name)}
                    />
                </Item>
                <Item regular>
                    <Input 
                        placeholder='Price'
                        onChangeText={(price) => {
                            const p = parseFloat(price);
                            if (!isNaN(p)) item.changePrice(p);
                        }}
                    />
                </Item>
            </View>
        )
    }
}

export default observer(WishListItemEdit);