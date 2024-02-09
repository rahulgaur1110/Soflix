import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Header from '../assets/components/Header'
import ApiUrl from '../assets/common/lib/ApiUrl'
import { useIsFocused } from '@react-navigation/native'
import Helper from '../assets/common/lib/Helper'


const SubCategory = ({ navigation, route }) => {
const isFocused = useIsFocused()
    const [data, setData] = useState(LocalData);
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0)
    const [subCategory, setSubCategory] = useState([])

const[categoryId, setCategoryId] = useState(route?.params?.categoryId)
console.log('categoryId', categoryId)
const selectedCategory = subCategory.find((item) => item.id === categoryId)
const showSubCategories = selectedCategory?.active_sub_category



// console.log('subCategory:',showSubCategories)

useEffect(() => {
    getCategoryData();
}, [])

const getCategoryData = async () => {

   
    Helper.makeRequest({ url: ApiUrl.Categorylist, method: "POST",  }).then((response) => {

      if (response.status == true) {
        setSubCategory(response.data.data)
      }
      else {

        Helper.showToast(response.message);

      }
    }).catch(err => {
        Helper.showToast(err);
    })
  };


const showData = ({ item, index }) => {
    return (
        <View>
         <TouchableOpacity 
        onPress={()=>navigation.navigate('Category', { categoryId: item.id })}
        style={styles.catScroller} key={index}>
         <View style={styles.catBox}>
                        <Icon name='icons' size={30} color={'grey'} />
                    </View>
          <Text style={styles.catDetails}>{item?.name}</Text>
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
                <Text style={styles.heading}>SOFLIX</Text>
                    {/* {route?.params?.categoryName ? (
                    <Text style={styles.heading}>{route?.params?.categoryName} - SOFLIX</Text>)
                    :
                   ( <Text style={styles.heading}>SOFLIX</Text>)

                } */}
                   <View style={{ marginBottom: 40, alignItems: 'center' }}>
                <FlatList
                // keyExtractor={(item) => item.id}
                data={showSubCategories}
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

export default SubCategory

const styles = StyleSheet.create({
    smallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
    },
   
    heading: {
        color: AppColor.white,
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 20,
        fontWeight:'bold',
    },

    catBox: {
        padding: 19,
        borderColor: AppColor.orange2,
        borderWidth: 2,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 80
    },
    name: {
        fontSize: 15,
        color: '#767676',
    },
    catDetails: {
        fontSize: 18,
        color: AppColor.white,
        fontWeight:'bold',
        marginTop:10,
        textAlign:'center'
    },
    catScroller: {
        width:130,
        marginRight: 15,
        marginBottom:25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})