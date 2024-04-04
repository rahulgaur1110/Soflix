import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Header from '../assets/components/Header'
import validationFunctions from '../assets/common/ValidateFunction'
import ApiUrl from '../assets/common/lib/ApiUrl'
import Helper from '../assets/common/lib/Helper'

const ChangePassword = ({navigation}) => {
    const [oldPassword, setOldpassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const SubmitChanges = async () => {


        if (validationFunctions.checkRequired('Old Password', oldPassword) &&
            validationFunctions.checkPassword('New Password', 8, 15, newPassword) &&
            validationFunctions.checkMatch('New Password', newPassword, 'Confirm Password', confirmPassword)) {
            // Helper.showLoader()
            console.log("hello");
            let data = {
                "old_password": oldPassword,
                "new_password": newPassword,
                "confirm_password": confirmPassword,
            }
            Helper.makeRequest({ url: ApiUrl.ChangePasssword, method: "POST", data: data }).then((response) => {
                if (response.status == true) {
                    // alert("response"+ response.message)
                    // Helper.hideLoader()
                    Helper.showToast(response.message);
                    setOldpassword("")
                    setNewpassword("")
                    setconfirmPassword("")
                    navigation.goBack();
                }
                else {
                    // Helper.hideLoader()
                    // alert(response.message)
                    Helper.showToast(response.message);

                }
            }).catch(err => {
                Helper.hideLoader()
                // console.log("Error:", err);
            })
        }
    };
    return (
        <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >

<Header onPress={() => navigation.goBack()}>Change Password</Header>

          

            <View style={{ marginVertical: 30, alignItems: 'center' }}>
            </View>

            <TextInput
                placeholder="Old Password"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
                secureTextEntry
                onChangeText={(value) => setOldpassword(value)}
            />
            <TextInput
                placeholder="New Password"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
                secureTextEntry
                onChangeText={(value) => setNewpassword(value)}

            />
            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
                secureTextEntry
                onChangeText={(value) => setconfirmPassword(value)}

            />

            <View style={{ paddingTop: 30 }}>
                <MainButton onPress={SubmitChanges}>Submit</MainButton>
            </View>

        </ImageBackground>
    )
}

export default ChangePassword

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