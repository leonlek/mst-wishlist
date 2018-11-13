import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Label } from 'react-native-elements';
import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
        }
    }
    renderEditable() {
        return (
            <View>
                <WishListItemEdit item={this.props.item} />
                <Button 
                    title='X'
                    onPress={() => this.setState({ isEditing: false })} 
                />
            </View>
        )
    }
    render() {
        const { item } = this.props;
        return this.state.isEditing ? (
            this.renderEditable()   
        ) : (
                <View style={{ flexDirection: "row" }}>
                    <Text>
                        {item.name} : price is => {item.price}
                    </Text>
                    <Button
                        title='EDIT'
                        onPress={() => this.setState({ isEditing: true})}
                    />
                </View>
        ) 
    }
}

// const WishListItemView = ({ item }) => (
//     <View>
//         <Text>{item.name} || price: {item.price}</Text>
//     </View>
// );

export default WishListItemView;
