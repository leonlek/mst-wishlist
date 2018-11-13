import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import WishListItemEdit from './WishListItemEdit';
import { WishListItem } from '../models/WishList';

class WishListItemEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: WishListItem.create({
                name: '', 
                price: 0,
            })
        }
    }
    onAdd = () => {
        this.props.wishList.add(this.state.entry);
        this.setState({
            entry: WishListItem.create({
                name: '',
                price: 0,
            })
        })
    }

    render() {
        return (
            <View>
                <WishListItemEdit item={this.state.entry} />
                <Button onPress={this.onAdd} title='ADD' />
            </View>
        )
    }
}

export default observer(WishListItemEntry);