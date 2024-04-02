import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
import AppImages from '../assets/common/AppImages';
import MainButton from '../assets/components/MainButton';
import AppStyle from '../assets/common/AppStyle';
import validationFunctions from '../assets/common/ValidateFunction';
import Helper from '../assets/common/lib/Helper';
import ApiUrl from '../assets/common/lib/ApiUrl';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const LoginCall = async () => {
    if (
      validationFunctions.checkEmail('Email', email) &&
      validationFunctions.checkRequired('password', password)
    ) {
      // Helper.showLoader()
      console.log('hello!');
      // FormData bunch
      let data = {
        email: email,
        password: password,
        device_type: Helper.device_type,
        device_token: Helper.device_token, //Static
      };
      Helper.makeRequest({url: ApiUrl.Login, method: 'POST', data: data})
        .then(response => {
          if (response.status == true) {
            Helper.setData('userdata', response.data.data);
            Helper.setData('token', response.data.token);
            Helper.userId = response.data.data.id;
            // Helper.hideLoader()
            navigation.replace('Dashboard');
          } else {
            // Helper.hideLoader()
            // alert("response"+ response.message)
            Helper.showToast(response.message);
          }
        })
        .catch(err => {
          //   Helper.hideLoader()
          console.log(err);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <ImageBackground
        style={[AppStyle.mainContainer]}
        resizeMode="stretch"
        source={AppImages.background}
        imageStyle={AppStyle.imageContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <Image
            style={[AppStyle.logo, {marginVertical: 30}]}
            source={AppImages.logo}
          />
        </TouchableWithoutFeedback>
        <TextInput
          placeholder="Email"
          value={email}
          placeholderTextColor="#9E9E9E"
          style={[AppStyle.textInput]}
          autoCapitalize="none"
          onChangeText={val => setEmail(val)}
          maxLength={30}
          // secureTextEntry={data.secureTextEntry ? true : false}
          returnKeyType="next"
          // onSubmitEditing={() => { Password1.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor="#9E9E9E"
          style={[AppStyle.textInput]}
          autoCapitalize="none"
          onChangeText={val => setPassword(val)}
          maxLength={30}
          secureTextEntry
          // secureTextEntry={data.secureTextEntry ? true : false}
          returnKeyType="next"
          // onSubmitEditing={() => { Password1.focus(); }}
          blurOnSubmit={false}
        />
        <View style={{paddingTop: 40}}>
          <MainButton onPress={() => LoginCall()}>Login</MainButton>
        </View>
        <View style={styles.smallContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={AppStyle.links}>Forgot password?</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[AppStyle.text, {textAlign: 'center', lineHeight: 19}]}>
              {' '}
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              style={{paddingTop: 7}}
              onPress={() => navigation.navigate('Register')}>
              <Text style={[AppStyle.links, {lineHeight: 32}]}>Sign up?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  smallContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
