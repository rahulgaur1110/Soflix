import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AppImages from '../assets/common/AppImages'
import AppStyle from '../assets/common/AppStyle'
import { LocalData } from '../assets/common/LocalData';
import Constants from '../assets/common/Constants';
import AppColor from '../assets/common/AppColors';
import ApiUrl from '../assets/common/lib/ApiUrl';
import Helper from '../assets/common/lib/Helper';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Config from '../assets/common/lib/Config';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {

    const isCarousel = useRef(null);
    const [index1, setIndex1] = useState(0);
    const [bannerData, setBannerData] = useState([])
    const [topMovieData, setTopMovieData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [trendingData, setTrendingData] = useState([])
    const [eventData, setEventData] = useState([])
    const [kidShowData, setKidShowData] = useState([])
    const [popularData, setPopularData] = useState([])
    const [loading, setLoading] = useState(true);

    const getBannerData = async () => {
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.BannerList, method: "POST" }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setBannerData(response.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
            // getTopMovies();  
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
        getTopMovies();
    };

    const getCategoryData = async () => {
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.Categorylist, method: "POST" }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setCategoryData(response.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
    };
    const getTrendingData = async () => {
        let data = {
            type: "is_trending"
        }
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setTrendingData(response.data.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
    };

    const getEventData = async () => {
        let data = {
            category_id: "16"
        }
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setEventData(response.data.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
    };

    const getKiddiesData = async () => {
        let data = {
            category_id: "27"
        }
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setKidShowData(response.data.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
    };

    const getPopularData = async () => {
        let data = {
            type: "is_popular"
        }
        // Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {

            if (response.status == true) {
                Helper.banner_path = response.data.banner_path;
                Helper.video_path = response.data.video_path;
                Helper.video_cover_path = response.data.video_cover_path;
                setPopularData(response.data.data.data)

                //   Helper.hideLoader()
            }
            else {
                //   Helper.hideLoader()
                Helper.showToast(response.message);

            }
        }).catch(err => {
            // Helper.hideLoader()
            console.log(err)
        })
    };

    useEffect(() => {
        getBannerData();
        getCategoryData();
        getTrendingData();
        getEventData();
        getKiddiesData();
        getPopularData();
        setLoading(false);
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getBannerData();
            getCategoryData();
            getTrendingData();
            getEventData();
            getKiddiesData();
            getPopularData();
        }, [])
      );

    const getTopMovies = async () => {

        let data = {
            "type": "is_top"
        }
        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {

            if (response.status == true) {
                setTopMovieData(response.data.data.data)
            }
            else {

                Helper.showToast(response.message);

            }
        }).catch(err => {

        })
    };
    const showCarousel = ({ item, index }) => {
        return (
            <View>

                <TouchableOpacity style={styles.carouselScroller}
                    onPress={() => navigation.navigate('VideoPlayer', { videoId: item.video_id })}
                    key={index}>
                    <Image
                        source={{ uri: Config.ImageUrl + Helper.banner_path + item.file_path }}
                        style={styles.carouselThumbnail}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const showData = ({ item, index }) => {
        return (
            <View key={'category_'+index}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('VideoPlayer', { videoId: item.id })}
                    style={styles.catScroller} key={'categoryButton_'+index}>
                    <Image key={'categoryImage_'+index}
                        // source={item.image}
                        source={{ uri: item?.cover_path }}
                        style={styles.trendThumbnail}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const onPressCategory = (item) => {
        // console.log('HomeItem:', item);
        if (item.active_sub_category != null && item.active_sub_category != undefined && item.active_sub_category.length > 0) {
            console.log('active_sub_category is not blank')
            navigation.navigate('SubCategory', { categoryId: item.id, categoryIcon: item.icon })
        } else {
            console.log('active_sub_category is blank')
            navigation.navigate('Category', { categoryId: item.id })
        }
    }

    const showCategories = ({ item, index }) => {
        return (
            <View style={styles.catScroller}>
                <TouchableOpacity key={index}
                    onPress={() => onPressCategory(item)}
                // onPress={() => navigation.navigate('TVChannel', { categoryId: item.id })}
                >

                    <View style={styles.catBox}>
                        <Icon name={item.icon} size={30} color={'grey'} />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={[AppStyle.text, { alignSelf: 'center' }]}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    return (

        <ImageBackground style={[AppStyle.mainContainer,]} resizeMode="stretch" source={AppImages.background} imageStyle={AppStyle.imageContainer}>
            <ScrollView>
            <View style={styles.header}>


                <Image style={[styles.logo,]} source={AppImages.logo} />

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={AppImages.DisplayPic} style={AppStyle.displayPic} />
                </TouchableOpacity>
            </View>
            { bannerData.length<0 ?
            <ActivityIndicator size="large" style={styles.indicator} /> :
   
      <>
            <View style={{ flex: 2.5, }}>
                <Carousel
                    layout={'default'}
                    data={bannerData}
                    ref={isCarousel}
                    renderItem={showCarousel}
                    sliderWidth={Constants.screenWidth - 40}
                    itemWidth={Constants.screenWidth - 40}
                    autoplay={true}
                    loop={true}
                    autoplayDelay={2000}
                    autoplayInterval={3000}
                    onSnapToItem={index => setIndex1(index)}
                />
                <Pagination
                    carouselRef={isCarousel}
                    activeDotIndex={index1}
                    tappableDots={true}
                    dotsLength={bannerData.length}
                    // activeDotIndex={activeSlide}
                    containerStyle={{ backgroundColor: 'transparent', marginBottom: 12 }}
                    dotStyle={{
                        width: 30,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: -5,
                        backgroundColor: AppColor.orange1,

                    }}
                    inactiveDotStyle={{
                        backgroundColor: AppColor.white,
                        width: 10,

                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center', }}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={categoryData}
                    renderItem={showCategories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            

           <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 20 }}>
              { trendingData.length > 0 ? (<Text style={styles.heading}>Recently Added</Text>): null}
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={trendingData}
                    renderItem={showData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 20 }}>
            { popularData.length > 0 ? (<Text style={styles.heading}>Most Watched</Text>): 
           null}

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={popularData}
                    renderItem={showData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 20 }}>
            { eventData.length > 0 ? (<Text style={styles.heading}>Events</Text>): null}

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={eventData}
                    renderItem={showData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ flex: 2, alignItems: 'flex-start', marginTop: 20 }}>
            { kidShowData.length > 0 ? (<Text style={styles.heading}>Kiddies Corner</Text>): null}

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={kidShowData}
                    renderItem={showData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            </>}
            <View style={{ height: 60, flex: .5 }} />
            </ScrollView>
           
        </ImageBackground>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        height: 100
    },
    indicator: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        width: 230,
        resizeMode: 'contain'
    },
    heading: {
        color: AppColor.white,
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 10
    },

    catScroller: {
        marginRight: 14,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    catBox: {
        padding: 17,
        borderColor: AppColor.orange2,
        borderWidth: 2,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 75
    },
    trendThumbnail: {
        width: Constants.screenWidth / 3.8,
        // width:150,
        height: 155,
        borderRadius: 5,
        resizeMode:'contain'
    },
    carouselScroller: {
        // borderColor: AppColor.orange1,
        // borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10,
    },
    carouselThumbnail: {
        // width: Constants.screenWidth,
        width: '100%',
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover',
        alignItems: 'center',

    },
})