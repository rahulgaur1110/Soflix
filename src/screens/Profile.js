import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Helper from '../assets/common/lib/Helper'
import ApiUrl from '../assets/common/lib/ApiUrl'

const Profile = ({navigation}) => {

    const signOutPress = async () => {
        Helper.confirm("Are you sure, you want to sign out?", (cb)=>{
            if (cb) {
                let data = {
                   
                    "platform": Helper.device_type,
                    "device_token": Helper.device_token //Static
                }
                Helper.makeRequest({ url: ApiUrl.SignOut, method: "POST", data: data }).then((response) => {
                    if (response.status == true) {

                Helper.setData("userdata", "")
                Helper.setData("token", "")
                navigation.replace('Login');
            }
           
            }).catch(err => {
              Helper.hideLoader()
            })
        } 
    });  
    }

    return (
        <ImageBackground style={[AppStyle.mainContainer]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >


            <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={AppImages.Back} style={{ marginBottom: 7 }} />
                    </TouchableOpacity>
                    <Text style={[AppStyle.subHeading, { paddingLeft: 10 }]}>Profile</Text>
                </View>

            </View>

            <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                   
                                <Image style={{ width: 100, height: 100, borderRadius: 100/2 }} source={AppImages.DisplayPic} />
                            
                    <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate('EditProfile')}>
                        <Image source={AppImages.Edit} />
                        <Text style={[AppStyle.text, {paddingBottom:10, }]}> Edit</Text>
                        </TouchableOpacity>
                   </View>

            <View style={{ marginVertical: 30, alignItems: 'center' }}>
            </View>

            
            <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')}>
                    <Text style={styles.options}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Watchlist')}>
                    <Text style={styles.options}>Watchlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>console.warn('StaticPage')}
                    >
                    <Text style={styles.options}>Terms of Usage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>console.warn('StaticPage')}
                    >
                    <Text style={styles.options}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>console.warn('StaticPage')}
                    >
                    <Text style={styles.options}>About us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>console.warn('DetailsPage')}
                    >
                    <Text style={styles.options}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>signOutPress()}>
                    <Text style={styles.options}>Sign Out</Text>
                    </TouchableOpacity>
                   </View>

            

        </ImageBackground>
    )
}

export default Profile

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 100
    },
    editButton: {
        backgroundColor: AppColor.orange1,
        borderRadius:20,
        flexDirection: 'row',
        width: 90,
        paddingHorizontal:10,flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        
    },
    options: {
        color: '#E0F1FF',
        fontSize: 15,
        lineHeight: 22,
        marginTop: 20,
        marginHorizontal:20
    },
})