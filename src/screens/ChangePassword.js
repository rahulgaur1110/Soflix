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
import VectorIcon from "./VectorIcon";

const ChangePassword = ({navigation}) => {
    const [oldPassword, setOldpassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [oldPasswordSecure, setOldPasswordSecure] = useState(true);
    const [newPasswordSecure, setNewPasswordSecure] = useState(true);
    const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

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

            <View style={styles.textInputBox}>
                <TextInput
                    placeholder="Old Password"
                    placeholderTextColor="#9E9E9E"
                    autoCapitalize="none"
                    style={styles.textInputStyle}
                    maxLength={30}
                    blurOnSubmit={false}
                    secureTextEntry={oldPasswordSecure}
                    onChangeText={(value) => setOldpassword(value)}
                />
                <TouchableOpacity onPress={() => setOldPasswordSecure(!oldPasswordSecure)}>
                    {oldPasswordSecure ?
                        <VectorIcon
                          size={18}
                          color={'grey'}
                          iconName={'eye'}
                          iconSet={'Entypo'}
                        />
                        :
                        <VectorIcon
                          size={18}
                          color={'grey'}
                          iconName={'eye-with-line'}
                          iconSet={'Entypo'}
                        />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textInputBox}>
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#9E9E9E"
                    autoCapitalize="none"
                    style={styles.textInputStyle}
                    maxLength={30}
                    blurOnSubmit={false}
                    secureTextEntry={newPasswordSecure}
                    onChangeText={(value) => setNewpassword(value)}
                />
                <TouchableOpacity onPress={() => setNewPasswordSecure(!newPasswordSecure)}>
                    {newPasswordSecure ?
                        <VectorIcon
                            size={18}
                            color={'grey'}
                            iconName={'eye'}
                            iconSet={'Entypo'}
                        />
                        :
                        <VectorIcon
                            size={18}
                            color={'grey'}
                            iconName={'eye-with-line'}
                            iconSet={'Entypo'}
                        />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textInputBox}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#9E9E9E"
                    autoCapitalize="none"
                    style={styles.textInputStyle}
                    maxLength={30}
                    blurOnSubmit={false}
                    secureTextEntry={confirmPasswordSecure}
                    onChangeText={(value) => setconfirmPassword(value)}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}>
                    {confirmPasswordSecure ?
                        <VectorIcon
                            size={18}
                            color={'grey'}
                            iconName={'eye'}
                            iconSet={'Entypo'}
                        />
                        :
                        <VectorIcon
                            size={18}
                            color={'grey'}
                            iconName={'eye-with-line'}
                            iconSet={'Entypo'}
                        />
                    }
                </TouchableOpacity>
            </View>

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
    textInputBox: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#1F222A',
        borderRadius: 10,
        marginBottom:20,
        paddingHorizontal: 10,
        paddingVertical:14
    },
    textInputStyle:{
        color: 'white',
        fontSize: 14,
        flex:1
    }
})
