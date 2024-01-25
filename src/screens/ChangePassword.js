import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Header from '../assets/components/Header'

const ChangePassword = ({navigation}) => {
    return (
        <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background}
        imageStyle={{opacity:0.7}}
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
            />
            <TextInput
                placeholder="New Password"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
            />
            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
            />

            <View style={{ paddingTop: 30 }}>
                <MainButton onPress={() => {console.warn('Submitted successfully!');
            navigation.goBack();
            }}>Submit</MainButton>
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