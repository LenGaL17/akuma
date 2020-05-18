import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import ReleasesList from './ReleasesList';
import ImgList from './ImgList';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populars: this.props.data.populars,
            releases: this.props.data.releases
        }
    }

    render() {
        return (
            <View>
                <ImgList data={this.state.populars}/>
                <ReleasesList data={this.state.releases}/>
            </View>
        )
    }
}

const height = Dimensions.get('window').height * 2