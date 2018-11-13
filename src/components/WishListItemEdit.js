import React from 'react';
import { observer } from 'mobx-react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';

class WishListItemEdit extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <View>
                <TextInput 
                    placeholder='Name'
                    onChangeText={(name) => item.changeName(name)}
                />
                <TextInput 
                    placeholder='Price'
                    onChangeText={(price) => {
                        if (!isNaN(price)) item.changePrice(price)
                    }}
                />
            </View>
        )
    }
}

export default observer(WishListItemEdit);