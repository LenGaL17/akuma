import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as RootNavigation from '../RootNavigation'
import ViewsMenu from './ViewsMenu';
import { isScanInHistory, addToHistory } from '../API/historyFunctions';

const color = require('../colors.json').default

export default class ScanItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            seen: false,
            scan: this.props.scan,
        }
        this._isMounted = false;
    }
    
    async componentDidMount() {
        this._isMounted = true
        this._isMounted && this.setState({seen: await isScanInHistory(this.props.name, this.props.scan.id)})
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getFontsize(length) {
        let size = infoWidth / (length / 1.9);
        if(size > 16) size = 16;
        return size < 11 ? 11 : size;
    }

    onPressHandler = async () => {
        let scan = this.state.scan;
        RootNavigation.navigate('Scan', {link: scan.link});
        await addToHistory(this.props.name, this.props.img, scan.id)
    }

    render() {
        let scan = this.state.scan;
        return (
            <TouchableWithoutFeedback onPress={this.onPressHandler}>
                <View style={[s.scan, {backgroundColor: this.state.seen ? color.darkBackground : color.background}]}>
                    <View style={s.numDiv}>
                        <Text style={[s.text]}>{scan.id}</Text>
                    </View>
                    <View style={s.nameDiv}>
                        <Text style={[{fontSize: this.getFontsize(this.props.length), marginLeft: 3, flex: 1}, s.text]}>{scan.name}</Text>
                        <ViewsMenu id={scan.id} name={this.props.name} img={this.props.img} setState={bool => this.setState({seen: bool})} updateDisplay={this.props.updateDisplay} favorite={this.props.favorite}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const width = Dimensions.get('window').width;
const infoWidth = (width * 0.9) / 1;

const s = StyleSheet.create({
    scan: {
        height: 40,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.dark,
    },
    numDiv:{
        flex: 0.1,
        borderRightWidth: 1,
        borderRightColor: color.dark,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameDiv:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },    
    text: {
        color: color.text,
    },
});