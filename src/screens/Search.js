import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../assets/components/Header'
import ApiUrl from '../assets/common/lib/ApiUrl'
import Helper from '../assets/common/lib/Helper'


const Search = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState(LocalData);
    const [topMovieData, setTopMovieData] = useState([])


    useEffect(() => {
        // getTopMovies();
        getTopMovies();
    }, [])

    const getTopMovies = async () => {

        let data = {
          "type": "is_trending"
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

      const getSearchData = async () => {

        let data = {
          "search_text": query
        }
        console.log('Display data:',data)

        Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {
    
          if (response.status == true) {
            setFilteredData(response.data.data.data)
    console.log('searchedData:',response.data.data.data)
          }
          else {
    
            Helper.showToast(response.message);
    
          }
        }).catch(err => {
    
        })
      };

    // const getFilteredData = async () => {

    //     let data = {
    //       "search_text": query
    //     }
    //     Helper.makeRequest({ url: ApiUrl.VideoList, method: "POST", data: data }).then((response) => {
    
    //       if (response.status == true) {
    //         setFilteredData(response.data.data.data)
    // console.log('Response:',response.data.data.data)
    //       }
    //       else {
    
    //         Helper.showToast(response.message);
    
    //       }
    //     }).catch(err => {
    
    //     })
    //   };



    const handleSearch = (query) => {
        // const filtered = data.filter((item) =>
        //     item.name.toLowerCase().includes(query.toLowerCase())
        // );
        // setFilteredData(filtered);
        getSearchData();
        console.log('filteredData',filteredData)
    };



    const backNavigation = () => {
        navigation.goBack()
        setFilteredData('')
        setQuery('');
    }

    const showData = ({ item, index }) => {
        return (
            <View>

                <TouchableOpacity
                    onPress={() => navigation.push('VideoPlayer', { videoId: item.id })}
                    style={styles.catScroller} key={index}>
                    <Image
                        source={{uri:item?.cover_path}}
                        style={styles.trendThumbnail}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    
    const showTrends = ({ item, index }) => {
        return (
            <View style={styles.catScroller}>
                <TouchableOpacity 
                // onPress={() => navigation.navigate('VideoPlayer', { videoId: item.id })}
                >
                    <Image
                        source={item.image}
                        style={styles.trendThumbnail}
                    />
                </TouchableOpacity>
                <View style={{ marginLeft: 20 }}>

                    <TouchableOpacity key={index}
                        onPress={() => navigation.navigate('VideoPlayer', { videoId: item.id })}>
                        <Text style={styles.title}>{item?.name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.catDetails}>{item?.category} <Text style={{ color: AppColor.primaryColor }}> | </Text> {item?.language}</Text>
                </View>
            </View>
        );
    };

    return (
        <ImageBackground style={[AppStyle.mainContainer,]} resizeMode="stretch" source={AppImages.background}
            imageStyle={[AppStyle.imageContainer,]}
        >
<ScrollView>

            <Header onPress={() => backNavigation()}>Search</Header>

            <View style={styles.searchBox}>
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
            {filteredData ? (
            <View style={{marginHorizontal:20}} >
           <Text style={styles.heading}>Search Reasult</Text>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            // keyExtractor={(item, index) => {
                            //     const key = item.id || index.toString(); // Use index as fallback if id is missing or duplicate
                            //     console.log("Key:", key);
                            //     return key;
                            // }}
                            data={filteredData}
                            renderItem={(item)=>showData(item)}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                        />
                        </View>
            ):
           (
           <View style={{marginHorizontal:20}} >
           <Text style={styles.heading}>Recently Added</Text>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={topMovieData}
                            renderItem={(item)=>showData(item)}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                        />
                        </View>
    )
           }
            <View style={{height:50}}><Text>Hello</Text></View>
            </ScrollView>
        </ImageBackground>

    )
}

export default Search

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
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 20
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
        fontSize: 16,
        color: AppColor.white,
        // lineHeight: 28
    },
    catDetails: {
        fontSize: 12,
        color: AppColor.white,
        lineHeight: 28,
    },
    catScroller: {
        marginRight: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
    },
    trendThumbnail: {
        width: Constants.screenWidth / 2.5,
        // width:150,
        height: 185,
        borderRadius: 5,
        resizeMode:'contain',
        
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