import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import AppImages from '../assets/common/AppImages';
import AppStyle from '../assets/common/AppStyle';
import {LocalData} from '../assets/common/LocalData';
import Constants from '../assets/common/Constants';
import AppColor from '../assets/common/AppColors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ApiUrl from '../assets/common/lib/ApiUrl';
import Config from '../assets/common/lib/Config';
import Helper from '../assets/common/lib/Helper';
import {useFocusEffect} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import {CommentSectionModal} from './Modal/commentSectionModal';
import ValidateFunction from '../assets/common/ValidateFunction';

const VideoPlayer = ({navigation, route}) => {
  const [height, setHeight] = useState();
  const [videoId, setVideoId] = useState(route.params.videoId);
  const [playlistId, setPlaylistId] = useState(route.params.playlistId);

  const selectedVideo = LocalData.find(item => item.id === videoId);
  // const commentData = selectedVideo.comments.commentData
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [topMovieData, setTopMovieData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [commentListData, setCommentListData] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);

  const [watchlist, setWatchlist] = useState(false);
  const [playingIndex, setPlayingIndex] = useState();

  const [showSkipButton, setShowSkipButton] = useState(false);
  const [adIsPlaying, setAdIsPlaying] = useState(true);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [skipTime, setSkipTime] = useState();
  const [commentText, setCommentText] = useState('');
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  // console.log('videoData:', videoData);
  // console.log('episodeData:', episodeData);
  // console.log('playlistData:', playlistData);

  const playerRef = useRef();

  useFocusEffect(
    useCallback(() => {
      return () => {
        Orientation.lockToPortrait();
      };
    }, []),
  );

  const getVideoDetails = async () => {
    // Helper.showLoader();
    let data = {
      video_id: videoId,
    };
    Helper.makeRequest({url: ApiUrl.VideoDetails, method: 'POST', data: data})
      .then(response => {
        if (response.status == true) {
          Helper.banner_path = response.data.banner_path;
          Helper.video_path = response.data.video_path;
          Helper.video_cover_path = response.data.video_cover_path;
          if (response.data.data) {
            setVideoData(response.data.data[0]);
            //   setVideReadyForWatch(true);
            //   if (response.data.data[0].video_time.length > 0) {
            //     setVideoResumeTime(response.data.data[0].video_time[0].time)
            //   }
          }
          if (
            response.data.data[0].watchlist[0] != null ||
            response.data.data[0].watchlist[0] != undefined
          ) {
            setWatchlist(true);
          } else {
            setWatchlist(false);
          }

          // Helper.hideLoader()
        } else {
          // Helper.hideLoader()
          Helper.showToast(response.message);
        }
      })
      .catch(err => {
        //   Helper.hideLoader()
        console.log(err);
      });
    getTopMovies();
  };

  const getPlaylist = async () => {
    let data = {
      category_id: playlistId,
    };
    Helper.makeRequest({url: ApiUrl.VideoList, method: 'POST', data: data})
      .then(response => {
        if (response.status == true) {
          setPlaylistData(response.data.data.data);
          setEpisodeData(response.data.data.data[0]);
          setPlayingIndex(0);
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch(err => {
        Helper.showToast(err);
      });
  };

  const getCommentList = () => {
    let data = {
      video_id: videoId,
      page: 1,
    };
    Helper.makeRequest({url: ApiUrl.commentList, method: 'POST', data: data})
      .then(response => {
        if (response.status == true) {
          setCommentListData(response?.data?.data?.data);
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch(err => {
        Helper.showToast(err);
      });
  };

  useEffect(() => {
    if (route?.params?.isPartner) {
      getPlaylist();
    }
    getCommentList();
    getVideoDetails();
  }, []);

  if (!route.params.isPartner) {
    useEffect(() => {
      setTimeout(() => {
        setShowSkipButton(true);
        setSkipTime(videoData.advertise_skip_time * 1000);
        // console.log('skipButton Time:', videoData.advertise_skip_time)
      }, 10000); // amount of time the splash is shown from the time component is rendered
    }, []);
  }
  const getTopMovies = async () => {
    let data = {
      type: 'is_popular',
    };
    Helper.makeRequest({url: ApiUrl.VideoList, method: 'POST', data: data})
      .then(response => {
        if (response.status == true) {
          setTopMovieData(response.data.data.data);
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch(err => {});
  };

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

  const handleSkipButton = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  const handleSkipAd = () => {
    setShowSkipButton(false);
    setVideoIsPlaying(true);
    setAdIsPlaying(false);
  };

  // const toggleFullScreen = () => {
  //     console.log(isFullScreen, Orientation.getInitialOrientation())
  //     if (isFullScreen) {
  //         Orientation.lockToPortrait();
  //     } else {
  //         Orientation.lockToLandscape();
  //     }
  // };

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#fab74e"
        size="large"
        style={styles.indicator}
      />
    );
  }

  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#fab74e" size="large" />
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack();
    Orientation.lockToPortrait();
  };

  const showData = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.push('VideoPlayer', {videoId: item.id})}
          style={styles.catScroller}
          key={index}>
          <Image
            source={{uri: item?.cover_path}}
            style={styles.trendThumbnail}
          />
          {/* <Text>{item.id}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  const addToWatchList = async () => {
    let data = {
      video_id: videoId,
    };
    Helper.makeRequest({
      url: ApiUrl.AddRemoveWatchlist,
      method: 'POST',
      data: data,
    })
      .then(response => {
        if (response.status == true) {
          // Helper.setData('userdata', response.data.user)
          Helper.showToast(response.message);
          if (watchlist) {
            setWatchlist(false);
          } else {
            setWatchlist(true);
          }
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch(err => {
        Helper.hideLoader();
      });
  };

  const onPressPostComment = () => {
    if (commentText?.length > 0) {
      let data = {
        video_id: videoId,
        comment: commentText,
      };
      // Helper.showLoader();
      Helper.makeRequest({
        url: ApiUrl.addComment,
        method: 'POST',
        data: data,
      })
        .then(response => {
          if (response.status == true) {
            getCommentList();
            setCommentText('');
          }
        })
        .catch(err => {
          Helper.hideLoader();
        });
    }
  };

  const onPressViewAllComments = () => {
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

  const showComments = ({item, index}) => {
    return (
      <View style={styles.commentSection}>
        <View style={styles.commentIcon}>
          <EvilIcons name="user" size={25} color={'white'} />
        </View>
        <View style={styles.commentDetails}>
          <Text style={[styles.catDetails, {color: '#ccc'}]}>
            {item.userName}
          </Text>
          <Text style={styles.catDetails}>{item.commentText}</Text>
        </View>
      </View>
    );
  };

  const onEpisodePress = (item, index) => {
    console.log('Index:', index);
    setEpisodeData(item);
    setPlayingIndex(index);
    // console.log('Episode2:', episodeData)
  };

  const showEpisodes = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          index === playingIndex
            ? [styles.episodeSection, {opacity: 0.6}]
            : styles.episodeSection
        }
        onPress={() => onEpisodePress(item, index)}>
        <View style={styles.episodeDetails}>
          <Image
            style={styles.play}
            source={require('../assets/Images/play.png')}
          />
          <Image
            source={{
              uri: item.cover_path,
            }}
            style={styles.episodeThumbnail}
          />
        </View>
        <View style={styles.episodeBox}>
          <Text style={styles.episodeName}>{item.title}</Text>

          {item?.description && (
            <RenderHTML
              contentWidth={Constants.screenWidth / 2}
              source={{html: item?.description}}
              tagsStyles={mixedStyle}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const commentListRenderItem = ({item}) => {
    return (
      <View style={styles.singleCommentView}>
        <View style={styles.mainImageView}>
          {item?.user?.profile_pic ? (
            <Image
              source={AppImages.DisplayPic}
              style={styles.commentUserPic}
            />
          ) : (
            <View style={styles.placeHolderView}>
              <Text style={styles.placeHolderText}>
                {ValidateFunction?.checkShortName(item?.user?.name || '')}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text style={{color: AppColor.white}}>{item?.user?.name}</Text>
          <Text style={{color: AppColor.white}}>{item?.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      style={[AppStyle.mainContainer, {paddingHorizontal: 0, paddingTop: 0}]}
      resizeMode="stretch"
      source={AppImages.background}
      imageStyle={{opacity: 0.7}}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={{position: 'absolute', top: 40, left: 10, zIndex: 1}}>
        <AntDesign name="arrowleft" size={20} color={AppColor.white} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleFullscreen}
        style={{position: 'absolute', top: 40, right: 10, zIndex: 1}}>
        <Entypo name="resize-full-screen" size={20} color={AppColor.white} />
      </TouchableOpacity>

      <View
        style={
          isFullScreen ? styles.videoFullContainer : styles.videoContainer
        }>
        {/* <ImageBackground source={AppImages.logo} style={{width:'100%', height:'100%'}} resizeMode="stretch" imageStyle={{width:300, height:180}}> */}
        {showSkipButton && videoData?.advertise_enabled === 1 && (
          <TouchableOpacity onPress={handleSkipAd} style={styles.skipAdButton}>
            <Text style={styles.catDetails}>Skip Ad</Text>
          </TouchableOpacity>
        )}

        {visible ? <ActivityIndicatorElement /> : null}

        {route.params.isPartner ? (
          <>
            {episodeData?.advertise_enabled === 1 &&
            adIsPlaying &&
            !videoIsPlaying ? (
              <WebView
                source={{
                  uri: episodeData.advertise_url,
                }}
                style={{flex: 1, backgroundColor: 'black'}}
                // renderLoading={this.LoadingIndicatorView}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoad={() => setVisible(false)}
                // startInLoadingState
                javaScriptEnabled={true}
              />
            ) : (
              <WebView
                source={{
                  uri: episodeData.file_path,
                }}
                style={{flex: 1, backgroundColor: 'black'}}
                // renderLoading={LoadingIndicatorView}
                // startInLoadingState={true}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoad={() => setVisible(false)}
                javaScriptEnabled={true}
              />
            )}
          </>
        ) : (
          <>
            {videoData?.advertise_enabled === 1 &&
            adIsPlaying &&
            !videoIsPlaying ? (
              <WebView
                source={{
                  uri: videoData.advertise_url,
                }}
                style={{flex: 1, backgroundColor: 'black'}}
                // renderLoading={this.LoadingIndicatorView}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoad={() => setVisible(false)}
                // startInLoadingState
                javaScriptEnabled={true}
              />
            ) : (
              <WebView
                source={{
                  uri: videoData.file_path,
                }}
                style={{flex: 1, backgroundColor: 'black'}}
                // renderLoading={LoadingIndicatorView}
                // startInLoadingState={true}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoad={() => setVisible(false)}
                javaScriptEnabled={true}
              />
            )}
          </>
        )}
      </View>

      {!isFullScreen && (
        <ScrollView style={styles.container}>
          {playlistData.length > 0 && (
            <View>
              <View style={styles.headerBG}>
                <Text style={styles.title}>Playlist</Text>
              </View>
              <FlatList data={playlistData} renderItem={showEpisodes} />
            </View>
          )}

          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <View style={styles.movieHeading}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Image
                  style={{width: Constants.screenWidth / 5, height: 130}}
                  source={{
                    uri: route.params.isPartner
                      ? episodeData.cover_path
                      : videoData.cover_path,
                  }}
                />
                <View style={styles.headingDetails}>
                  <Text style={styles.title}>
                    {route.params.isPartner
                      ? episodeData?.title
                      : videoData?.title}
                  </Text>
                  <Text style={styles.catDetails}>
                    {route.params.isPartner
                      ? episodeData?.langauges?.name
                      : videoData?.langauges?.name}
                  </Text>
                  <Text style={styles.catDetails}>
                    {route.params.isPartner
                      ? episodeData?.year
                      : videoData?.year}
                  </Text>
                </View>
              </View>
              {!route.params.isPartner && (
                <TouchableOpacity
                  style={[
                    styles.watchList,
                    {
                      backgroundColor:
                        watchlist == false ? AppColor.orange1 : '#444444',
                    },
                  ]}
                  onPress={addToWatchList}>
                  <Image source={AppImages.MenuAdd} />
                  <Text style={{color: AppColor.white, fontSize: 12}}>
                    {watchlist == false ? 'Watchlist' : 'Watchlisted'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              {/* {videoData?.description || episodeData.description && */}

              <RenderHTML
                contentWidth={Constants.screenWidth / 2}
                source={{
                  html: route.params.isPartner
                    ? episodeData?.description
                    : videoData?.description,
                }}
                tagsStyles={mixedStyle}
              />
            </View>

            <View style={styles.commentListView}>
              <Text style={styles.title}>Comments</Text>
              <FlatList
                data={commentListData.slice(0, 4)}
                renderItem={commentListRenderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {commentListData?.length > 4 && (
              <TouchableOpacity
                style={{marginBottom: 18}}
                onPress={() => onPressViewAllComments()}>
                <Text style={{color: 'white'}}>View all comments</Text>
              </TouchableOpacity>
            )}

            <View>
              {/*<ScrollView horizontal>*/}
              {/*  {selectedVideo.comments.comments && (*/}
              {/*    <View>*/}
              {/*      <Text style={styles.title}>Comments</Text>*/}

              {/*      <FlatList data={commentData} renderItem={showComments} />*/}
              {/*    </View>*/}
              {/*  )}*/}
              {/*</ScrollView>*/}
              <Text style={styles.title}>Leave a Comment</Text>
              <TextInput
                placeholder="Type a Comment..."
                placeholderTextColor="#9E9E9E"
                style={[
                  AppStyle.textInput,
                  {marginTop: 10, textAlignVertical: 'top'},
                ]}
                autoCapitalize="none"
                multiline
                onChangeText={text => setCommentText(text)}
                value={commentText}
              />
              <TouchableOpacity
                onPress={() => onPressPostComment()}
                style={[styles.watchList, {width: 170, marginBottom: 15}]}>
                <Text style={{color: AppColor.white, fontSize: 14}}>
                  Post Your Comment
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading}>Most Watched</Text>
            <FlatList
              keyExtractor={item => item.id}
              data={topMovieData}
              renderItem={item => showData(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
      {(commentModalVisible && (
        <CommentSectionModal
          isModalVisible={commentModalVisible}
          closeModal={closeCommentModal}
          commentListData={commentListData}
          commentListRenderItem={commentListRenderItem}
        />
      )) ||
        null}
    </ImageBackground>
  );
};

export default VideoPlayer;

const mixedStyle = {
  body: {
    whiteSpace: 'normal',
    color: '#fff',
  },
  p: {
    color: '#fff',
    //   fontSize: 13,
  },
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    resizeMode: 'contain',
    flex: 3.8,
  },
  videoDetails: {
    width: '90%',
    resizeMode: 'contain',
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
    flex: 1,
  },
  skipAdButton: {
    position: 'absolute',
    bottom: 40,
    right: 1,
    zIndex: 1,
    backgroundColor: AppColor.orange1,
    padding: 7,
    paddingLeft: 15,
    borderBottomLeftRadius: 17,
    borderTopLeftRadius: 17,
  },
  videoStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicator: {
    position: 'absolute',
    top: 115,
    left: '47%',
  },
  activityIndicatorStyle: {
    height: '100%',
    position: 'absolute',
    top: 115,
    left: '47%',
    zIndex: 1,
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
    backgroundColor: '#1F222A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  trendThumbnail: {
    width: Constants.screenWidth / 3.8,
    // width:150,
    height: 155,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  heading: {
    color: AppColor.white,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
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
    borderRadius: 5,
  },
  movieHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  watchList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColor.orange1,
    justifyContent: 'center',

    borderRadius: 25,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  headingDetails: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: Constants.screenWidth / 2.3,
  },
  commentListView: {
    marginBottom: 10,
  },
  singleCommentView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  commentUserPic: {
    width: 36,
    height: 36,
  },
  placeHolderView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolderText: {
    fontSize: 12,
    color: AppColor.white,
    fontWeight: '500',
  },
  mainImageView: {
    borderRadius: 36,
    width: 36,
    height: 36,
    display: 'flex',
    backgroundColor: '#1F222A',
    marginRight: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: AppColor.white,
    fontWeight: 'bold',
  },
  catDetails: {
    fontSize: 13,
    color: AppColor.white,
    lineHeight: 20,
  },
  details: {
    fontSize: 14,
    color: AppColor.white,
    lineHeight: 20,
    marginBottom: 20,
  },
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  commentIcon: {
    padding: 2,
    borderRadius: 15,
    backgroundColor: AppColor.orange1,
    // alignSelf: 'flex-start',
    // marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 30,
  },
  episodeSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1F222A',
    paddingHorizontal: 5,
    borderTopColor: AppColor.black,
    borderTopWidth: 3,
    paddingVertical: 6,
  },
  episodeDetails: {
    width: '25%',
    // marginleft: 15,
  },
  episodeThumbnail: {
    width: '100%',
    height: 135,
    borderRadius: 5,
  },
  episodeBox: {
    // marginLeft: 15,
    width: '75%',
    paddingHorizontal: 10,
  },
  episodeName: {
    fontSize: 16,
    color: AppColor.white,
    fontWeight: 'bold',
  },
});
