import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Header from '../assets/components/Header'

const Watchlist = ({navigation}) => {

    const showData = ({ item, index }) => {
        return (
            <View>
                
            <TouchableOpacity 
            // onPress={()=>navigation.navigate('VideoPlayer',{videoId: item.id})}
            style={styles.catScroller} key={index}>
              <Image
                source={item.image}
                style={styles.trendThumbnail}
              />
              <Text>{item.id}</Text>
            </TouchableOpacity>
            </View>
        );
    };

    return (
        <ImageBackground style={[AppStyle.mainContainer,{paddingBottom:80}]} resizeMode="stretch" source={AppImages.background}
        imageStyle={{opacity:0.7}}
        >

<Header onPress={() => navigation.goBack()}>Watchlist</Header>


            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <FlatList
                keyExtractor={(item) => item.id}
                data={LocalData}
                renderItem={showData}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                />
            </View>

            
            

        </ImageBackground>
    )
}

export default Watchlist

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
    catScroller: {
        marginHorizontal: 8,
        marginBottom:15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    trendThumbnail: {
        width: Constants.screenWidth/2.6,
        // width:150,
       height:185,
        borderRadius: 5
    },
})