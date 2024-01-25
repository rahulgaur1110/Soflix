import { BackHandler, Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation-locker';
import AppImages from '../assets/common/AppImages'
import AppStyle from '../assets/common/AppStyle'
import { LocalData } from '../assets/common/LocalData';
import Constants from '../assets/common/Constants';
import AppColor from '../assets/common/AppColors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ApiUrl from '../assets/common/lib/ApiUrl';
import Config from '../assets/common/lib/Config';
import Helper from '../assets/common/lib/Helper';
import { useFocusEffect } from '@react-navigation/native';



const VideoPlayer = ({ navigation, route }) => {
    const [height, setHeight] = useState();
    const [videoId, setVideoId] = useState(route.params.videoId);
    const selectedVideo = LocalData.find((item) => item.id === videoId)
    const commentData = selectedVideo.comments.commentData
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    const playerRef = useRef()

    useFocusEffect(
        useCallback(() => {
          
          return () => {
            Orientation.lockToPortrait();
          };
        }, []),
      );

    // on device back action
    // useEffect(() => {
    //     const backAction = () => {
    //       // Navigate to the previous screen (if available)
    //       navigation.goBack();
    //       Orientation.lockToPortrait();
    //       return true; // Return true to prevent default behavior (exit the app)
    //     };
    
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    //     // Cleanup the event listener when the component is unmounted
    //     return () => backHandler.remove();
    //   }, [navigation]);


    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        return () => {
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    const handleOrientation = orientation => {
        if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
            setIsFullScreen(true);
            StatusBar.setHidden(true);
        } else {
            setIsFullScreen(false);
            StatusBar.setHidden(false);
        }
    };

    const handleFullscreen = () => {
        if (isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    };

    const toggleFullScreen = () => {
        console.log(isFullScreen, Orientation.getInitialOrientation())
        if (isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    };



    const goBack = () => {
        navigation.goBack();
        Orientation.lockToPortrait();
    }

    const showData = ({ item, index }) => {
        return (
            <View>

                <TouchableOpacity
                    onPress={() => navigation.push('VideoPlayer',{videoId: item.id})}
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

    const showComments = ({ item, index }) => {
        return (

            <View style={styles.commentSection}>
                <View style={styles.commentIcon}>
                    <EvilIcons name="user" size={25} color={'white'} />
                </View>
                <View style={styles.commentDetails}>
                    <Text style={[styles.catDetails, { color: '#ccc' }]}>{item.userName}</Text>
                    <Text style={styles.catDetails}>{item.commentText}</Text>
                </View>
            </View>
        );
    };

    const showEpisodes = ({ item, index }) => {
        return (
            <View style={styles.episodeSection}>
                <View style={styles.episodeDetails}>
                    {/* <Image
                        style={styles.play}
                        source={require('../assets/Images/play.png')} /> */}
                    <Image
                        source={item.image}
                        style={styles.episodeThumbnail}
                    />
                </View>
                <View style={styles.episodeBox}>
                    <Text style={styles.episodeName}>{item.eName}</Text>
                    <Text style={styles.catDetails}>{item.duration}</Text>
                    <Text style={styles.details}>
                        Lorem ipsum dolor sit amet, consectetuer
                        adipiscing elit, sed diam nonummy nibh euismod.
                    </Text>
                </View>


            </View>
        );
    };


    return (
        <ImageBackground style={[AppStyle.mainContainer, { paddingHorizontal: 0,paddingTop:0 }]} resizeMode="stretch" source={AppImages.background} imageStyle={{ opacity: 0.3, }}>
            <TouchableOpacity onPress={() => goBack()}
                style={{ position: 'absolute', top: 40, left: 10, zIndex: 1 }}
            >
                {/* <Image source={AppImages.Back} /> */}
                <AntDesign name="arrowleft" size={20} color={AppColor.black} />

            </TouchableOpacity>

            <TouchableOpacity onPress={handleFullscreen}
                style={{ position: 'absolute', top: 40, right: 10, zIndex: 1 }}
            >
                <Entypo name="resize-full-screen" size={20} color={AppColor.black} />
            </TouchableOpacity>


            <View style={isFullScreen ? styles.videoFullContainer : styles.videoContainer}>
                <Video
                    // source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                    source={{ uri: selectedVideo.videoURL }}
                    style={isFullScreen ? styles.videoFullScreen : styles.videoStyle}
                    controls={true}
                    ref={playerRef}
                    // ref={(ref) => { this.playerRef = ref }}
                    resizeMode="cover"
                />
            </View>

            {!isFullScreen &&
                <ScrollView style={styles.container}>
 {selectedVideo.playlist &&
                    <View>
                        <View style={styles.headerBG}>
                            <Text style={styles.title}>Playlist</Text>
                        </View>
                        <FlatList
                        data={LocalData}
                        renderItem={showEpisodes}
                        />
                        
                    </View>
}

                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>

                    <View style={styles.movieHeading}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}>
                            <Image style={{ width: Constants.screenWidth / 5, height: 130 }}
                                source={require('../assets/Images/movieIcon.png')}
                            />
                            <View style={styles.headingDetails}>
                                <Text style={styles.title}>{selectedVideo.name}</Text>
                                <Text style={styles.catDetails}>{selectedVideo.category} <Text style={{ color: AppColor.orange1 }}>| </Text>{selectedVideo.language}</Text>
                                <Text style={styles.catDetails}>2023</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.watchList]}

                        >
                            <Image source={AppImages.MenuAdd} />
                            <Text style={{ color: AppColor.white, fontSize: 12 }}>Watchlist</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.details}>
                            {selectedVideo.description}
                        </Text>
                        <Text style={styles.title}>Star Cast</Text>
                        <Text style={styles.details}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.
                        </Text>

                        <Text style={styles.title}>Produced By</Text>
                        <Text style={styles.details}>
                            Lorem ipsum dolor sit amet.
                        </Text>

                    </View>


                    <View>
                        <ScrollView horizontal>

                            {selectedVideo.comments.comments &&
                                <View>
                                    <Text style={styles.title}>Comments</Text>

                                    <FlatList
                                        data={commentData}
                                        renderItem={showComments}
                                    />

                                </View>
                            }
                        </ScrollView>
                        <Text style={styles.title}>Leave a Comment</Text>
                        <TextInput
                            placeholder='Type a Comment...'
                            placeholderTextColor="#9E9E9E"
                            style={[AppStyle.textInput, { marginTop: 10, textAlignVertical: 'top' }]}
                            autoCapitalize="none"
                            multiline


                        />
                        <TouchableOpacity style={[styles.watchList, { width: 170, marginBottom: 15 }]}

                        >
                            <Text style={{ color: AppColor.white, fontSize: 14 }}>Post Your Comment</Text>
                        </TouchableOpacity>
                    </View>


                        <Text style={styles.heading}>Top  Trending</Text>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={LocalData}
                            renderItem={showData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            }



        </ImageBackground>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({

    video: {
        width: '100%',
        resizeMode: 'contain',
        flex: 3.8
    },
    videoDetails: {
        width: '90%',
        resizeMode: 'contain'
    },
    videoContainer: {
        marginTop: 20,
        height: '30%',
        width: '100%',
    },
    videoFullContainer: {
        marginTop: 0,
        height: '100%',
        width: '100%',
        flex: 1
    },
    videoStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    videoFullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    container: {
        marginVertical: 10,
    },
    headerBG: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        padding:5
    },
    trendThumbnail: {
        width: Constants.screenWidth / 3.8,
        // width:150,
        height: 155,
        borderRadius: 5
    },
    heading: {
        color: AppColor.white,
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 20
    },

    catScroller: {
        marginRight: 10,
        marginBottom: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    trendThumbnail: {
        width: Constants.screenWidth / 3.8,
        // width:150,
        height: 155,
        borderRadius: 5
    },
    movieHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 10

    },
    watchList: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: AppColor.orange1, justifyContent: 'center',

        borderRadius: 25,
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    headingDetails: {
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        color: AppColor.white,
        fontWeight:'bold'
    },
    catDetails: {
        fontSize: 13,
        color: AppColor.white,
        lineHeight: 20
    },
    details: {
        fontSize: 14,
        color: AppColor.white,
        lineHeight: 20,
        marginBottom: 20
    },
    commentSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 8
    },
    commentIcon: {
        padding: 2,
        borderRadius: 15,
        backgroundColor: AppColor.orange1,
        // alignSelf: 'flex-start',
        // marginTop: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    commentDetails: {
        alignSelf: 'flex-start',
        marginLeft: 10,

    },
    play: {
        position: 'absolute',
        top: 40,
        left: 40,
        zIndex: 1,
        width: 30,
        height: 30
    },
    episodeSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'grey',
        paddingHorizontal:5,
        borderTopColor: AppColor.black,
        borderTopWidth:3,
        paddingVertical:2
    },
    episodeDetails: {
        width: '25%',
        // marginleft: 15,

    },
    episodeThumbnail: {
        width: '100%',
        height: 115,
        borderRadius: 5
    },
    episodeBox: {
        // marginLeft: 15,
        width: '75%',
        paddingHorizontal:10
    },
    episodeName: {
        fontSize: 16,
        color: AppColor.white,
        fontWeight: 'bold',

    },

})