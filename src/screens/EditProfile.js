import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Header from '../assets/components/Header'

const EditProfile = ({navigation}) => {
    return (
        <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >

<Header onPress={() => navigation.goBack()}>Edit Profile</Header>

        
            <View style={{ marginVertical: 30, alignItems: 'center' }}>
            </View>

            <TextInput
                placeholder="Full Name"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
            />
            <TextInput
                placeholder="Mobile"
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                blurOnSubmit={false}
            />

            <View style={{ paddingTop: 30 }}>
                <MainButton onPress={() => console.warn('Pressed Submit!')}>Submit</MainButton>
            </View>

        </ImageBackground>
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