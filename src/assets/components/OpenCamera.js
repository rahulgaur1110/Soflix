import { Platform, Dimensions,Alert,Linking, Modal,View,Text} from "react-native";
import * as ImagePicker from "react-native-image-picker"


import { check, request, PERMISSIONS, openSettings } from 'react-native-permissions';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round((dimensions.width * 9) / 16);
let imageWidth = dimensions.width;


export default class OpenCamera {

    static cameraAlert(alertMessage, Camera, Gallery, Cancel, cbCamera, cbGallery) {
        Alert.alert(
            "Soflix",
            alertMessage,
            [
                { text: Camera, onPress: () => { if (cbCamera) cbCamera(true); console.log('OK camera') } },
                { text: Gallery, onPress: () => { if (cbGallery) cbGallery(true); console.log('OK gallery') } },
                { text: Cancel, onPress: () => { if (cbCamera) cbCamera(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }
  

    static async open(cb) {
        OpenCamera.cameraAlert("Select image from...", "Camera", "Gallery", "Cancel", (statusCamera) => {
            if (statusCamera) {
                OpenCamera.checkPremission(PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.IOS.CAMERA, cb, "Camera");
            }
        }, (statusGallery) => {
            if (statusGallery) {
                OpenCamera.checkPremission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.IOS.PHOTO_LIBRARY, cb, "Gallery");
            }
        });
    }

    static selecteImage(cb, launchType) {
        const options = {
            title: 'Select Avatar',
            quality: 0.7,
            maxWidth:200,
            maxHeight:200,
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };


        // if (launchType == "Camera") {
        //     ImagePicker.launchCamera(options, (response) => {
        //         // console.log(response);
        //         // console.log('response Camera', JSON.stringify(response.assets[0].uri))
        //         // console.log('response Camera', JSON.stringify(response));
        //         // cb(response, launchType);
        //         cb(response.assets[0], launchType);
        //     });
        // } else if (launchType == 'Gallery') {
        //     ImagePicker.launchImageLibrary(options, (response) => {
        //         console.log('response Gallery', JSON.stringify(response.assets[0].uri));
        //         // cb(response, launchType);
        //         cb(response.assets[0], launchType);
        //     });
        // }

        if (launchType == "Camera") {
            ImagePicker.launchCamera(options, (response) => {
                cb(response, launchType);
            });
        } else if (launchType == 'Gallery') {
            ImagePicker.launchImageLibrary(options, (response) => {
                cb(response, launchType);
            });
        }
    }

    static checkPremission = async (androidType, iosType, cb, launchType) => {
        await check(Platform.select({
            android: androidType,
            ios: iosType
        })).then(result => {
            console.log('result--------------  ',result,launchType)
            if (result == "granted") {
                if (launchType == "Camera" || launchType == "Gallery") {
                    this.selecteImage(cb, launchType);
                }
                if (launchType == "image" || launchType == "video") {
                    if (launchType == "image") {
                        this.selecteImage(cb, launchType);
                    } else {
                        this.selecteImage(cb, launchType);
                    }
                }
                return;
            }
            if (result == "unavailable" || result == "denied") {
                request(
                    Platform.select({
                        android: androidType,
                        ios: iosType
                    })
                ).then((status) => {
                    if (status == "granted") {
                        console.log('You can use the camera');
                        if (launchType == "Camera" || launchType == "Gallery") {
                            this.selecteImage(cb, launchType);
                        }
                    } else {
                        this.DeniedPermissionPopup(launchType)
                        console.log('camera permission denied', iosType);
                    }
                });
                
            }
            if (result == "blocked") {
                this.DeniedPermissionPopup(launchType)
            }

        });
    }

    static  DeniedPermissionPopup(type) {
        var msg;
            msg = `App doesn't have ${type} access permissions. Please go to settings and allow Soflix for ${type} access permissions.`
        Alert.alert(
            'Soflix',
            msg
            ,
            [
                { text: 'Cancel', onPress: () => {console.log('OK Pressed') } },
                { text: 'Settings', onPress: () => this.openSettingPage() },
            ],
            { cancelable: false }
        )

    }
    static openSettingPage() {
        if(Platform.OS == 'android'){
            Linking.openSettings()
        }
        else{
            Linking.canOpenURL('app-settings:').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle settings url');
                } else {
                    return Linking.openURL('app-settings:');
                }
            }).catch(err => console.error('An error occurred', err));
        }

    }


}