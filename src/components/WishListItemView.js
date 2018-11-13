import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';
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
                <WishListItemEdit item={this.state.clone} />
                <Button 
                    title='X'
                    onPress={this.onCancelEdit} 
                />
                <Button 
                    title='SAVE'
                    onPress={this.onSaveEdit} 
                />
            </View>
        )
    }
    onToggleEdit = () => {
        this.setState({ 
            isEditing: true,
            clone: clone(this.props.item)
        })
    }
    onCancelEdit = () => {
        this.setState({ isEditing: false });
    }
    onSaveEdit = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone));
        this.setState({ 
            isEditing: false,
            clone: null,
         })
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
                        onPress={this.onToggleEdit}
                    />
                    <Button
                        title='X'
                        onPress={item.remove}
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
