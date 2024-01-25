import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import validationFunctions from '../assets/common/ValidateFunction'
import Helper from '../assets/common/lib/Helper'
import ApiUrl from '../assets/common/lib/ApiUrl'

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const callRegister = () => {

       
            if (validationFunctions.checkAlphabet('Name',5,30, name) &&
            validationFunctions.checkNumber('Mobile', 7,15, mobile) &&
                validationFunctions.checkEmail('Email',email) && 
                validationFunctions.checkRequired('Country', country) && 
                validationFunctions.checkPassword('Password',7,15, password) && 
                validationFunctions.checkMatch('Password', password, 'ConfirmPassword', confirmPassword)) {
                // Helper.showLoader()
                
                let data = {
                    "email": email,
                    "password": password,
                    "name": name,
                    // "s_name": '',
                    "country_name": country,
                    "mobile": mobile
                }
    
    
                Helper.makeRequest({ url: ApiUrl.Register, method: "POST", data: data }).then((response) => {

                    if (response.status == true) {
                        console.log('data:', data)
                        // Helper.hideLoader()
                        setName("")
                        setEmail("")
                        setMobile("")
                        setCountry("")
                        setPassword("")
                        setConfirmPassword("")
                        Alert.alert("Your email has been registered Successfully!")
                    }
                    else {
                        // Helper.hideLoader()
                        // alert("response" + response.message)
                        Helper.showToast(response.message);
    
                    }
                }).catch(err => {
                    // Helper.hideLoader()
                    console.log(err);
                })
        }
    }

        return (
            <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background} imageStyle={{ opacity: 0.7 }}>

<ScrollView>

                <Image style={[AppStyle.logo,]} source={AppImages.logo} />
                <View style={{ marginBottom: 30, marginTop: -20, alignItems: 'center' }}>
                    <Text style={styles.title}>Create Your Account</Text>
                </View>
                <TextInput
                    placeholder="Full Name"
                    value={name}
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    onChangeText={(val) => setName(val)}
                    maxLength={30}
                    // secureTextEntry={data.secureTextEntry ? true : false}
                    returnKeyType="next"
                    onSubmitEditing={() => { Mobile.focus(); }}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder="Mobile"
                    value={mobile}
                    placeholderTextColor="#9E9E9E"
                    onChangeText={(val) => setMobile(val)}
                    returnKeyType='next'
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    keyboardType="numeric"
                    blurOnSubmit={false}
                    onSubmitEditing={() => { Email.focus(); }}
                    ref={(input) => { Mobile = input; }}
                />
                
                <TextInput
                placeholder="Email"
                value={email}
                autoFocus
                placeholderTextColor="#9E9E9E"
                style={[AppStyle.textInput]}
                autoCapitalize="none"
                onChangeText={(val) => setEmail(val)}
                maxLength={30}
                returnKeyType="next"
                onSubmitEditing={() => { Country.focus(); }}
                    ref={(input) => { Email = input; }}
                blurOnSubmit={false}
            />
                <TextInput
                    placeholder="Country"
                    value={country}
                    onChangeText={(val) => setCountry(val)}
                    returnKeyType='next'
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    onSubmitEditing={() => { Password.focus(); }}
                    ref={(input) => { Country = input; }}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                    returnKeyType='next'
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    secureTextEntry
                    onSubmitEditing={() => { ConfirmPassword.focus(); }}
                    ref={(input) => { Password = input; }}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(val) => setConfirmPassword(val)}
                    returnKeyType='next'
                    placeholderTextColor="#9E9E9E"
                    style={[AppStyle.textInput]}
                    autoCapitalize="none"
                    maxLength={30}
                    secureTextEntry
                    // onSubmitEditing={() => { Password.focus(); }}
                    ref={(input) => { ConfirmPassword = input; }}
                    blurOnSubmit={false}
                />
                <View style={{ paddingTop: 20 }}>
                    <MainButton onPress={() => callRegister()}>Register</MainButton>
                </View>
                <View style={[styles.smallContainer, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    <Text style={AppStyle.text}> Already have an account?  </Text>
                    <TouchableOpacity style={{ paddingTop: 7 }} onPress={() => navigation.navigate('Login')}>
                        <Text style={AppStyle.links}>Login</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            </ImageBackground>
        )
    }

    export default Register

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