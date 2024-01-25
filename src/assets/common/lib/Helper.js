import React, { Component } from 'react'
import { Keyboard, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import Config from './Config';
import DeviceInfo from 'react-native-device-info'




export class Helper extends Component {

    static userId = 0; 
    static baseUrl = '';
    static mainApp;
    static toast;
    static Loader;
    static device_type = Platform.OS == 'android' ? 'ANDROID' : 'IOS';
    static device_token = 'SIMULATOR';
    static hasNotch = DeviceInfo.hasNotch();
    static banner_path = '';
    static video_path = '';
    static video_cover_path = '';
    static top_movies = [];
    static search_text='';
    static watchlistValue=false;

    static registerLoader(mainApp) {
        Helper.mainApp = mainApp;
    }

    static registerLoged(mainApp) {
        Helper.mainApp = mainApp;
    }

    static showLoader() {
        Keyboard.dismiss();
        Helper.mainApp.setState({ loader: true })
    }

    static hideLoader() {
        Helper.mainApp.setState({ loader: false })
    }

    static registerToast(toast) {
        Helper.toast = toast;
    }

    static showToast(msg) {
        if (msg) {
            Toast.show(msg, {
                duration: 2000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        }
    }

    static alert(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }

    static alertTitle(title, alertMessage, cb) {
        Alert.alert(
            title,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }

    static confirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'Cancel', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static confirmPopUp(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'YES', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'NO', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static permissionConfirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'NOT NOW', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
                { text: 'SETTINGS', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }

    static cameraAlert(alertMessage, Camera, Gallery, Cancel, cbCamera, cbGallery) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: Camera, onPress: () => { if (cbCamera) cbCamera(true); console.log('OK Pressed') } },
                { text: Gallery, onPress: () => { if (cbGallery) cbGallery(true); console.log('OK Pressed') } },
                { text: Cancel, onPress: () => { if (cbCamera) cbCamera(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }
  
    static async setData(key, val) {
        try {
            let tempval = JSON.stringify(val);
            await AsyncStorage.setItem(`@${key}`, tempval);
        } catch (error) {
            console.error(error, "AsyncStorage")
        }
    }

    static async getData(key) {
        // return await EncryptedStorage.getItem(key).then((response) => {return response});

        try {
            let value = await AsyncStorage.getItem(`@${key}`);
            if (value) {
                let newvalue = JSON.parse(value);
                return newvalue;
            } else {
                return value;
            }
        } catch (error) {
            console.error(error, "AsyncStorage")
        }
    }

    static getFormData(obj) {
        let formData = new FormData();
        for (let i in obj) {
            formData.append(i, obj[i]);
        }
        return formData;
    }


// function with object
    static async makeRequest({url, method, data, isImage}) {
        

        let finalUrl = Config.BaseUrl + url;
        let token = await this.getData("token");;
        var varheaders = {
            Accept: 'application/json',
            'Content-Type': isImage ? 'multipart/form-data' : 'application/json',
        }

        if (token) varheaders['Authorization'] = 'Bearer ' + token;

        let apiData;
        if (isImage) {
            apiData = data
        } else {
            apiData = data ? JSON.stringify(data) : null
        }
        let apiKit = {
            method: method,
            headers: varheaders,
        }
        if (apiData) apiKit['body'] = apiData;

        return NetInfo.fetch().then(state => {
            if (state.isConnected) {
                return fetch(finalUrl, apiKit)
                    .then((response) => {
                        return response.json()
                    })
                    .then((responseJson) => {
                        console.log("Api Header---", JSON.stringify(varheaders))
                        console.log('')
                        console.log("Api URL*************** ", finalUrl);
                        console.log('')
                        console.log('')
                        console.log("Api Data Send--------  ", apiData);
                        console.log('')
                        console.log('')
                        console.log("Api Resp--------- ", JSON.stringify(responseJson))
                        console.log('')
                        console.log('')

                        return responseJson;
                    })
                    .catch((error, a) => {
                        console.warn("API Request Fail. Api URL *************** ", finalUrl);
                        console.warn("Api Data Send--------  ", apiData);
                        console.warn("A Error---->  ", error);
                        return false
                    });
            } else {
                Toast.show('Please check your internet connection.');
                return false
            }
        })
    }
}

export default Helper
