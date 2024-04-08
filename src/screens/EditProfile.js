import {Image, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native'
import React, { useEffect, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Header from '../assets/components/Header'
import ApiUrl from '../assets/common/lib/ApiUrl'
import Helper from '../assets/common/lib/Helper'
import Config from '../assets/common/lib/Config'
import OpenCamera from '../assets/components/OpenCamera'

const EditProfile = ({navigation}) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [updatedImage, setUpdatedImage] = useState(false);
    const [profileFile, setProfileFile] = useState('');



    useEffect(() => {

        Helper.getData('userdata').then((res) => {
            setName(res.name);
            setLastname(res.s_name);
            setemail(res.email);
            setmobile(res.mobile);
            setProfileImage(Config.ImageUrl + res.profile_pic);
            // console.log(Config.ImageUrl + res.profile_pic)
            // console.log("this image:",profileImage)
        })

    }, []);



    const uploadImage = () => {
        OpenCamera.open((file) => {
            console.log('on cancel',file);
            if (file.didCancel==true){
                console.log("else hello", file)
                setProfileImage(profileImage);
            } else
            if (file.assets[0].uri) {
                console.log("--------------------------")
                console.log("hello2", file.assets[0].uri)
                setProfileImage(file.assets[0].uri);
                setUpdatedImage(true);
                setProfileFile(file.assets[0].uri);
            } else {
                console.log("else hello", file)
                setProfileImage(profileImage);
            }
        });
    }

    const updateChanges = async () => {

        // if (emailValid && passwordValid && mobileValid) {

        // Helper.showLoader()
        let tempdata = new FormData();
        tempdata.append('name', name);
        tempdata.append('s_name', lastname);
        tempdata.append('email', email);
        tempdata.append('mobile', mobile);
        if (updatedImage) {

            tempdata.append('profile_pic', {
                uri: profileFile,
                name: `${String(new Date().getTime() + ".jpg")}`,
                type: 'image/jpg'
            });
        }
        Helper.makeRequest({ url: ApiUrl.EditProfile, method: "POST", data: tempdata, isImage: true }).then((response) => {

            if (response.status == true) {
                Helper.setData('userdata', response.data.user)
                Helper.showToast(response.message);
                // Helper.hideLoader()
                navigation.goBack()

            }
            else {
                // Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log("Error:", err)
        })


    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{position:'absolute'}}>
            <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background}
                             imageStyle={AppStyle.imageContainer}
            >

                <Header onPress={() => navigation.goBack()}>Edit Profile</Header>



                <View style={{ alignItems: 'center', marginBottom:20 ,width: 100, height: 100,alignSelf:'center' }}>
                    {profileImage &&
                        <TouchableOpacity onPress={() => { uploadImage() }}>

                            <Image style={{ width: 100, height: 100, borderRadius: 100/2 }} source={{ uri: profileImage }} />

                            <Image style={{ position: 'absolute', right: '19%', bottom: '4%' }} source={AppImages.Edit} />
                        </TouchableOpacity>
                    }
                </View>

                <TextInput
                    placeholder="Full Name"
                    value={name}
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    blurOnSubmit={false}
                    onChangeText={(value)=>setName(value)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput, {color:'grey'}]}
                    autoCapitalize="none"
                    maxLength={30}
                    blurOnSubmit={false}
                    // onChangeText={(value)=>setemail(value)}
                    editable={false}
                />
                <TextInput
                    placeholder="Mobile"
                    value={mobile}
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    blurOnSubmit={false}
                    onChangeText={(value)=>setmobile(value)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                />

                <View style={{ paddingTop: 30 }}>
                    <MainButton onPress={updateChanges}>Submit</MainButton>
                </View>

            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    smallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        color: AppColor.white,
        fontSize: 30,
        fontWeight: 'bold',
    },

})
