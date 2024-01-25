import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import validationFunctions from '../assets/common/ValidateFunction'
import Helper from '../assets/common/lib/Helper'
import ApiUrl from '../assets/common/lib/ApiUrl'

const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const onSubmit = async () => {
      
        if (
        validationFunctions.checkEmail('Email',email)) {
           
        // Helper.showLoader()


    let data = {
        "email": email,
       
    }
    Helper.makeRequest({ url: ApiUrl.ForgotPassword, method: "POST", data: data }).then((response) => {

        if (response.status == true) {
            // Helper.hideLoader()
            // setModalVisible(true)
            setEmail("")
            alert(response.message)

            Helper.showToast(response.message);
        }
        else {
            // Helper.hideLoader()
            alert(response.message)
            Helper.showToast(response.message);

        }
    }).catch(err => {
        // Helper.hideLoader()
        console.log(err)
    })
}
}
    return (
        <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background} imageStyle={{ opacity: 0.7 }}>

            <View style={styles.header}>

                <View style={{ }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={AppImages.Back} style={{ marginBottom: 7 }} />
                    </TouchableOpacity>
                </View>
                
            </View>

            <Image style={[AppStyle.logo, { marginTop: 15 }]} source={AppImages.logo} />
            <View style={{ marginBottom: 30, marginTop: -20, alignItems: 'center' }}>
                <Text style={styles.title}>Reset Your Password</Text>
            </View>

            <TextInput
                placeholder="Email"
                value={email}
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                maxLength={30}
                onChangeText={(value) => setEmail(value)}
            />

            <View style={{ paddingTop: 30 }}>
                <MainButton onPress={() => onSubmit()}>Submit</MainButton>
            </View>

        </ImageBackground>
    )
}

export default ResetPassword

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
    }
})