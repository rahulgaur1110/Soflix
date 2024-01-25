import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AppImages from '../assets/common/AppImages'
import AppStyle from '../assets/common/AppStyle'
import { LocalData } from '../assets/common/LocalData';
import Constants from '../assets/common/Constants';
import AppColor from '../assets/common/AppColors';

const Dashboard = ({ navigation }) => {

    const isCarousel = useRef(null);
    const [index1, setIndex1] = useState(0);

    const showCarousel = ({ item, index }) => {
        return (
            <View>

                <TouchableOpacity style={styles.carouselScroller}
                    onPress={() => navigation.navigate('VideoPlayer',{videoId: item.id})}
                    key={index}>
                    <Image
                        source={item.image}
                        style={styles.carouselThumbnail}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const showData = ({ item, index }) => {
        return (
            <View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('VideoPlayer',{videoId: item.id})}
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

    const showCategories = ({ item }) => {
        return (
            <View style={styles.catScroller}>
                <TouchableOpacity onPress={()=> navigation.navigate('TVChannel',{categoryName:item.category})}>
                    <View style={styles.catBox}>
                    <Icon name={item.icon} size={30} color={'grey'} />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={AppStyle.text}>{item.category}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        // <ScrollView style={{flex:1}}>

        <ImageBackground style={[AppStyle.mainContainer,]} resizeMode="stretch" source={AppImages.background} imageStyle={[AppStyle.imageContainer,] }>
            <View style={styles.header}>


                <Image style={[styles.logo,]} source={AppImages.logo} />

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={AppImages.DisplayPic} style={AppStyle.displayPic} />
                </TouchableOpacity>
            </View>

            <View style={{flex:2.5, }}>
                <Carousel
                layout={'default'}
                    data={LocalData}
                    ref={isCarousel}
                    renderItem={showCarousel}
                    sliderWidth={Constants.screenWidth-40}
                    itemWidth={Constants.screenWidth-40}
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
                dotsLength={LocalData.length}
                // activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'transparent',  marginBottom:12 }}
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


            <View style={{  flex:1, alignItems: 'center', }}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={LocalData}
                    renderItem={showCategories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{  flex:2, alignItems: 'center' ,marginTop:20}}>
                <Text style={styles.heading}>Recently Added</Text>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={LocalData}
                    renderItem={showData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={{height:50, flex:.5}}/>

        </ImageBackground>
        // </ScrollView>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        height:100
    },
    logo: {
        width: 230,
        resizeMode: 'contain'
    },
    trendThumbnail: {
        width: Constants.screenWidth / 3.8,
        // width:150,
        height: 150,
        borderRadius: 5
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
    catBox:{
        padding:17,
        borderColor:AppColor.orange2,
        borderWidth:2,
        borderRadius:33,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
        width:75
    },
    trendThumbnail: {
        width: Constants.screenWidth / 3.8,
        // width:150,
        height: 155,
        borderRadius: 5
    },
    carouselScroller: {
        // borderColor: AppColor.orange1,
        // borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10,
    },
    carouselThumbnail: {
        // width: Constants.screenWidth,
        // width:150,
        height: 250,
        borderRadius: 10,
        resizeMode: 'contain',
        alignItems: 'center',

    },
})