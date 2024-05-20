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

    const [query, setQuery] = useState('');
    const [filteredChannel, setFilteredChannel] = useState('');

    const [categoryId, setCategoryId] = useState(route?.params?.categoryId)
    const [categoryIcon, setCategoryIcon] = useState(route?.params?.categoryIcon)

    console.log('categoryId', categoryId)
    const selectedCategory = subCategory.find((item) => item.id === categoryId)
    const showSubCategories = selectedCategory?.active_sub_category


    console.log('subCategory1:', subCategory)

    console.log('subCategory:', showSubCategories)

    useEffect(() => {
        getCategoryData();
    }, [])

    const getCategoryData = async () => {


        Helper.makeRequest({ url: ApiUrl.Categorylist, method: "POST", }).then((response) => {

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

    const onPressCategory = (item) => {
        if (item.parent_id == 23) {
            console.log('category is Partner')
            navigation.navigate('VideoPlayer', { playlistId: item.id, isPartner: true, videoId: item?.parent_id })
        } else if (item.parent_id == 31) {
            console.log('category is TV Channel')
            navigation.navigate('VideoPlayer', { playlistId: item.id, isPartner: true, isChannel: true, videoId: item?.parent_id })
        } else {
            console.log('category is not Partner/TV Channel')
            navigation.navigate('Category', { categoryId: item.id, videoId: item?.parent_id })
        }
    }

    const showData = ({ item, index }) => {
        console.log('Item::',item);
        return (
            <View>
                <TouchableOpacity
                    onPress={() => onPressCategory(item)}
                    style={styles.catScroller} key={index}>

                    {item.parent_id == 23 || item.parent_id == 31 ?
                       ( <View style={styles.catBoxImage}>
                            <Image
                                source={{
                                    uri: item.image_path
                                }}
                                style={styles.trendThumbnail}
                            />
                        </View>)
                    :
                        (<View style={styles.catBox}>
                            <Icon name={categoryIcon} size={30} color={'grey'} />
                        </View>)
                    }

                    <Text style={styles.catDetails}>{item?.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleSearch = (query) => {
        const filtered = showSubCategories.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredChannel(filtered);
        console.log('filteredData:', filteredChannel)
        console.log('query:', query)

    };
    const renderEmptyComponent = () => (
        <Text style={{ color: 'white' }}>No data found</Text>
    );

    const backNavigation = () => {
        navigation.goBack()
        setFilteredChannel('')
        setQuery('');
    }

    return (
        <ImageBackground style={[AppStyle.mainContainer, { justifyContent: 'space-between' }]} resizeMode="stretch" source={AppImages.background}
            imageStyle={[AppStyle.imageContainer,]}
        >
            <View style={{ flex: 1 }}>

                <Header onPress={() => backNavigation()} />



                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                    {categoryId === 31 &&
                        <View style={AppStyle.searchBox}>
                            <Image source={AppImages.SearchGrey} style={styles.ImageStyle} />
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="#767676"
                                value={query}
                                onChangeText={(value) => setQuery(value)}
                                onSubmitEditing={() => handleSearch(query)}
                                style={[styles.textInput]}
                                autoCapitalize="none" />
                        </View>
                    }

                    {filteredChannel ?

                        <View style={{ marginBottom: 40, alignItems: 'center' }}>
                            <FlatList
                                // keyExtractor={(item) => item.id}
                                data={filteredChannel}
                                renderItem={showData}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={renderEmptyComponent}
                            />
                        </View>
                        :
                        <View style={{ marginBottom: 40, alignItems: 'center' }}>
                            <FlatList
                                // keyExtractor={(item) => item.id}
                                data={showSubCategories}
                                renderItem={showData}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    }
                    {/* {filteredChannel.length = [] &&
<Text>No data found</Text>
} */}
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
        // marginBottom: 20,
        fontWeight: 'bold',
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
    catBoxImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 120
    },
    name: {
        fontSize: 15,
        color: '#767676',
    },
    catDetails: {
        fontSize: 18,
        color: AppColor.white,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    },
    catScroller: {
        width: 130,
        marginRight: 10,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trendThumbnail: {
        // width: Constants.screenWidth/2.8,
        width: '100%',
        height: 180,
        borderRadius: 5,
        resizeMode: 'cover'
    },
    textInput: {
        color: 'white',
        fontSize: 14,
        backgroundColor: AppColor.black,
        borderRadius: 5,
        paddingLeft: 10,
        paddingVertical: 7
    },
})
