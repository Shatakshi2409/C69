import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permission from 'expo-permissions'

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
const {status}=await Permissions.askAsync(Permissions.CAMERA);
this.setState({
    hasCameraPermission:status==='granted',
    scanned:false,
    buttonState:'clicked'
})
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({scanned:true,scannedData:data, buttonState:'normal'})
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==='clicked' && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
style={StyleSheet.absoluteFillObject}
                ></BarCodeScanner>
            )
        }
        else if(button ==='normal'){
    return(

        <View> 
            <Text> {
                hasCameraPermission===true ? this.state.scannedData:'request camera permission'
                } </Text>
    <TouchableOpacity
    onPress={this.getCameraPermission}
    >
        <Text>Scan QR Code</Text>
    </TouchableOpacity>
        </View>
    )}
}}