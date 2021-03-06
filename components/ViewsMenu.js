import React, { Component, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, ColorPropType } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Entypo } from '@expo/vector-icons'; 
const color = require('../colors.json').default

import { addToHistory, removeFromHistory, addMultipleToHistory, removeMultipleFromHistory } from '../API/historyFunctions';
import { update } from './Favorites';

export default function ViewsMenu(props) {
    const menu = useRef();
  
    const showMenu = () => menu.current.show();

    const handleAddToHistory = async () => {
        await addToHistory(props.name, props.img, props.id)
        props.setState(true)
        if(props.favorite) await update(props.name)
        menu.current.hide()
    }

    const handleRemoveFromHistory = async () => {
        await removeFromHistory(props.name, props.id)
        props.setState(false)
        if(props.favorite) await update(props.name) 
        menu.current.hide()
    }
    
    const handleMultipleAddToHistory = async () => {
        await addMultipleToHistory(props.name, props.img, props.id)
        menu.current.hide()
        props.updateDisplay()
        if(props.favorite) await update(props.name)
    }

    const handleMultipleRemoveToHistory = async () => {
        await removeMultipleFromHistory(props.name, props.id)
        menu.current.hide()
        props.updateDisplay()
        if(props.favorite) await update(props.name)
    }

    return(
        <View style={s.dotsDiv}>
            <Menu ref={menu} button={<Button showMenu={showMenu}/>}>
                <MenuItem onPress={handleAddToHistory}>Marquer comme vu</MenuItem>
                <MenuItem onPress={handleRemoveFromHistory}>Marquer comme non vu</MenuItem>
                <MenuDivider />
                <MenuItem onPress={handleMultipleAddToHistory}>Marquer précédent comme vu</MenuItem>
                <MenuItem onPress={handleMultipleRemoveToHistory}>Marquer précédent comme non vu</MenuItem>
            </Menu>
        </View>
    )
}

const s = StyleSheet.create({
    dotsDiv: {
        marginRight: 5
    }
})

function Button (props) {
    return (
        <TouchableWithoutFeedback onPress={() => props.showMenu()}>
            <View>
                <Entypo name="dots-three-vertical" size={20} color={color.text} />
            </View>
        </TouchableWithoutFeedback>
    )
}