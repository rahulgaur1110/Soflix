import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import AppImages from '../common/AppImages'
import AppStyle from '../common/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Helper from '../common/lib/Helper'
import Config from '../common/lib/Config'

const Header = ({ onPress, children }) => {

    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState('');


    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            Helper.getData('userdata').then((res) => {
                
                setProfileImage(Config.ImageUrl + res.profile_pic);
        
          })
          console.log("focus success")
        });
        return () => {
          // clean up event listener
          focusListener.remove();
        };
      }, []);

  return (
    <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onPress}>
                    <AntDesign name="arrowleft" size={20} color={'white'} style={{ marginBottom: 7 }}/>

                        {/* <Image source={AppImages.Back} style={{ marginBottom: 7 }} /> */}
                    </TouchableOpacity>
                    <Text style={[AppStyle.subHeading, { paddingLeft: 10 }]}>{children}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                <Image source={{uri:profileImage}} style={AppStyle.displayPic} />
                </TouchableOpacity>
            </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: 10,
        height:100
    },
})