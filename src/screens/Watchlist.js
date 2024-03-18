import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Header from '../assets/components/Header'
import ApiUrl from '../assets/common/lib/ApiUrl'
import Helper from '../assets/common/lib/Helper'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

const Watchlist = ({navigation}) => {
  const isFocused = useIsFocused()

    const [watchlist, setWatchlist] = useState([]);


    const getWatchlist = async () => {
        Helper.makeRequest({ url: ApiUrl.Watchlist, method: "POST" }).then((response) => {
                 
          if (response.status == true) {
        Helper.banner_path=response.data.banner_path;
        Helper.video_path=response.data.video_path;
        Helper.video_cover_path=response.data.video_cover_path;
        setWatchlist(response.data.data)
        //   Helper.hideLoader()
        }
        else {
        //   Helper.hideLoader()
          Helper.showToast(response.message);
    
        }
         
      }).catch(err => {
        Helper.hideLoader()
      })
      };


      useFocusEffect(
        React.useCallback(() => {
          getWatchlist();
        }, [])
      );

    const showData = ({ item, index }) => {
        return (
            <View>
                
            <TouchableOpacity 
            onPress={()=>navigation.navigate('VideoPlayer',{videoId: item?.video?.id})}
            style={styles.catScroller} key={index}>
              <Image
                source={{ uri: item?.video?.cover_path }}
                style={styles.trendThumbnail}
              />
              <Text>{item.id}</Text>
            </TouchableOpacity>
            </View>
        );
    };

    return (
        <ImageBackground style={[AppStyle.mainContainer,{paddingBottom:80}]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >

<Header onPress={() => navigation.goBack()}>Watchlist</Header>


            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                {/* <FlatList
                keyExtractor={(item) => item.id}
                data={watchlist}
                renderItem={showData}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                /> */}
                 <FlatList
                    keyExtractor={(item) => item.id}
                    data={watchlist}
                    renderItem={showData}
                    numColumns={2}
                    // showsHorizontalScrollIndicator={false}
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
        marginLeft: 0,
        marginBottom:15,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    trendThumbnail: {
        width: Constants.screenWidth/2.4,
        // width:150,
       height:200,
        borderRadius: 5,
        resizeMode:'contain'
    },
})