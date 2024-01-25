import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppImages from '../assets/common/AppImages'
import Constants from '../assets/common/Constants'
import AppColor from '../assets/common/AppColors'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import Helper from '../assets/common/lib/Helper'

const Splash = ({navigation}) => {

//   useEffect(() => {
    
//             setTimeout(() => {
//             navigation.replace('Login');
            
//         }, 1500); // amount of time the splash is shown from the time component is rendered
     
  
    
// }, []);

useEffect(() => {
  Helper.getData('userdata').then((res) => {
      if (res != null && res != ""){
          Helper.userId = res.id;
          navigation.replace('Dashboard');
      } else {
          setTimeout(() => {
          navigation.replace('Login');
          
      }, 1500); // amount of time the splash is shown from the time component is rendered
   
      }
})
  
}, []);

  return (
    <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background} imageStyle={{opacity:0.7}}>
    

          
          <Image style={[AppStyle.logo, {flex:1}]} source={AppImages.logo} />
          <MainButton onPress={()=> console.warn('Pressed!')}>Getting started</MainButton>
      
  </ImageBackground>
  )
}

export default Splash

const styles = StyleSheet.create({
    
   
    
    
});