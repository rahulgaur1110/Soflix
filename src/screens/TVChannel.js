import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Header from '../assets/components/Header'


const TVChannel = ({ navigation, route }) => {

    const [data, setData] = useState(LocalData);
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0)

const[category, setCategory] = useState(route?.params?.categoryName)


const showData = ({ item, index }) => {
    return (
        <View>
            
        <TouchableOpacity 
        onPress={()=>console.warn(item.channelName,' pressed')}
        style={styles.catScroller} key={index}>
          <Image
            source={item.channel}
            style={styles.trendThumbnail}
          />
          <Text style={styles.catDetails}>{item.channelName}</Text>
        </TouchableOpacity>
        </View>
    );
};

    return (
        <ImageBackground style={[AppStyle.mainContainer, { justifyContent: 'space-between' }]} resizeMode="stretch" source={AppImages.background}
            imageStyle={{ opacity: 0.7 }}
        >
            <View style={{ flex: 1 }}>

            <Header onPress={() => navigation.goBack()} />



                <View style={{  alignItems: 'center',justifyContent:'center' , flex:1}}>
                    {route?.params?.categoryName ? (
                    <Text style={styles.heading}>{route?.params?.categoryName} - SOFLIX</Text>)
                    :
                   ( <Text style={styles.heading}>SOFLIX</Text>)

                }
                    
                   <View style={{ marginVertical: 30, alignItems: 'center' }}>
                <FlatList
                keyExtractor={(item) => item.id}
                data={LocalData}
                renderItem={showData}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                />
            </View>
                </View>



            </View>

        </ImageBackground>
    )
}

export default TVChannel

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
   
    heading: {
        color: AppColor.white,
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 20,
        fontWeight:'bold',
    },


    informationView: {
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: Constants.screenWidth / 3.8,
        // height: 31,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 1, marginRight: 10,
        marginBottom: 14,
        backgroundColor: 'transparent',
        borderColor: '#767676',
    },
    buttonPressed: {
        backgroundColor: AppColor.orange1
    },
    informationView1: {
        borderRadius: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 1, marginRight: 10,
        marginBottom: 14,

    },
    whitetext: {
        color: 'white',
    },
    name: {
        fontSize: 15,
        color: '#767676',
    },
    bottom: {
        backgroundColor: AppColor.orange1,
        borderRadius: 35,
        paddingVertical: 18,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 50,
        // marginTop:'20%'
    },
    title: {
        fontSize: 20,
        color: AppColor.white,
        lineHeight: 28,
        fontWeight: 'bold',
        marginBottom:20
    },
    catDetails: {
        fontSize: 18,
        color: AppColor.white,
        fontWeight:'bold',
        marginTop:10
    },
    catScroller: {
        marginRight: 15,
        marginBottom:25,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    trendThumbnail: {
        width: Constants.screenWidth/2.8,
        // width:150,
       height:185,
        borderRadius: 5
    },
    searchBox: {
        backgroundColor: AppColor.black,
        borderRadius: 10,
        // paddingLeft: 20,
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 20
    },
    textInput: {
        color: 'white',
        fontSize: 14,
        backgroundColor: AppColor.black,
        borderRadius: 5,
        paddingLeft: 10,
        paddingVertical: 7
    },
    ImageStyle: {

        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignItems: 'center',
    },
})