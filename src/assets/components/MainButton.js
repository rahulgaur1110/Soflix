import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children } from 'react'
import AppColor from '../common/AppColors'

const MainButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.splashText}>{children}</Text>
  </TouchableOpacity>
  )
}

export default MainButton

const styles = StyleSheet.create({
    splashText: {
        fontSize: 22,
        textAlign: 'center',
        color: AppColor.white
        
    },
    button:{
        backgroundColor:AppColor.orange1,
        
        borderRadius:35,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        height:65
    },
})