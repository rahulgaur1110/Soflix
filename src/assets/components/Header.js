import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children } from 'react'
import AppImages from '../common/AppImages'
import AppStyle from '../common/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import VectorIcon from "../../screens/VectorIcon";

const Header = ({ onPress, children }) => {

    const navigation = useNavigation();

  return (
    <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onPress}>
                        <VectorIcon
                            size={20}
                            color={'white'}
                            iconName={'arrowleft'}
                            iconSet={'AntDesign'}
                        />
                    {/*<AntDesign name="arrowleft" size={20} color={'white'} style={{ marginBottom: 7 }}/>*/}

                        {/* <Image source={AppImages.Back} style={{ marginBottom: 7 }} /> */}
                    </TouchableOpacity>
                    <Text style={[AppStyle.subHeading, { paddingLeft: 10 }]}>{children}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                <Image source={AppImages.DisplayPic} style={AppStyle.displayPic} />
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
