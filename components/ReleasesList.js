import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import * as RootNavigation from '../RootNavigation'
import ImgList from './ImgList';

const color = require('../colors.json').default

let Loading = () => <ActivityIndicator size={57} color={color.dark} />

export default class ReleasesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 15,
            data: this.props.realeases.slice(0, 15),
        }
    }

    next15 = () => {
        let { i } = this.state;
        let copy = [...this.props.realeases]
        return copy.slice(i, i+15);   
    }

    handleEnd = () => {
        let { data, i } = this.state;
        let { realeases } = this.props;
        let copyData = [...data];
        let index = i

        if(realeases.length === copyData.length) {
            return this.setState({i: 0})
        } else {
            let toAdd = this.next15();
            return this.setState({data: [...copyData, ...toAdd], i: index+35})
        }
    }

    render() {
        return (
                <View>
                    <FlatList 
                        data={this.state.data}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <Item key={item.id} data={item} />}
                        onEndReached={this.handleEnd}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={!this.state.i ? <View /> : <Loading />}
                        ListHeaderComponent={<ImgList populars={this.props.populars}/>}
                    />
                </View>
        )
    }
}

class Item extends Component {

    getFontSize = (string) => {
        let size = nameDivWidth / (string / 1.9);
        if(size > 14) size = 14;
        return size < 11 ? 11 : size; 
    }

    goToManga = () => RootNavigation.navigate('Manga', {name: this.props.data.name});
    goToScan = () => RootNavigation.navigate('Scan', {link: this.props.data.scanLink})

    render() {
        let manga = this.props.data
        let backgroundColor = parseInt(manga.id) % 2 == 0 ? color.background : color.darkBackground
        return (
            <TouchableOpacity onPress={this.goToScan}>
                <View style={[s.itemContainer, {backgroundColor: backgroundColor}]}>
                    <View style={s.nameDiv}>
                        <TouchableOpacity onPress={this.goToManga}>
                            <Text style={[s.commonText, {fontSize: this.getFontSize(manga.name.length)}]}>{manga.name} : </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={s.scanDiv}>
                        <View>
                            <Text style={[s.commonText, {fontSize: this.getFontSize(manga.name.length)}]}>{manga.scanName}</Text>
                            {manga.infos ? <Text style={s.infoText}>{manga.infos}</Text> : null}
                        </View>
                        <View style={s.dateDiv}>
                            <Text style={{fontSize: 9}}>{manga.date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width;
const nameDivWidth = (width * 0.4) / 1; 
const scanDivWidth = (width * 0.6) / 1; 

const s = StyleSheet.create({
    container: {
        height: 300
    },
    title: {
        color: color.text,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    },
    itemContainer: {
        height: 75,
        width: '100%',
        flex: 0,
        flexDirection: 'row'
    },
    nameDiv: {
        width: nameDivWidth,
        height: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: color.borders,
        borderRightWidth: 1
    },
    commonText: {
        color: color.text,
        textAlign: 'center'
    },
    scanDiv: {
        width: scanDivWidth,
        height: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateDiv: {
        position: 'absolute',
        bottom: 0,
        right: 2
    },
    infoText : {
        color: '#BB4430', 
        textAlign: 'center', 
        fontSize: 10
    }
})