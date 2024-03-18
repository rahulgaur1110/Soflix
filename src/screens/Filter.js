import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import AppImages from '../assets/common/AppImages'
import MainButton from '../assets/components/MainButton'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import { LocalData } from '../assets/common/LocalData'
import Constants from '../assets/common/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Filter = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [isPressed1, setIsPressed1] = useState(false);


  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePressIn1 = () => {
    setIsPressed1(true);
  };

  const handlePressOut1 = () => {
    setIsPressed1(false);
  };

    const showCategory = ({ item, index }) => {
        return (
            <TouchableOpacity
        onPress={() => console.warn('to select category')}
        style={[
          styles.informationView, isPressed && styles.buttonPressed
        ]}
        onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      >
        <Text style={[styles.name, isPressed && {color:AppColor.white}]}>
          {item.category}
        </Text>
      </TouchableOpacity>
        );
    };

    const showLanguage = ({ item, index }) => {
        return (
            <TouchableOpacity
            onPress={() => console.warn('to select category')}
            style={[
              styles.informationView, isPressed1 && styles.buttonPressed
            ]}
            onPressIn={handlePressIn1}
          onPressOut={handlePressOut1}
          >
            <Text style={[styles.name, isPressed1 && {color:AppColor.white}]}>
             {item.language}
        </Text>
      </TouchableOpacity>
        );
    };

    return (
        <ImageBackground style={[AppStyle.mainContainer, {justifyContent:'space-between'}]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >
<View>

            <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => console.warn('Back Pressed!')}>
                        <Image source={AppImages.Back} style={{ marginBottom: 7 }} />
                    </TouchableOpacity>
                    <Text style={[AppStyle.subHeading, { paddingLeft: 10 }]}>Watchlist</Text>
                </View>
                {/* <Image source={AppImages.DisplayPic} style={AppStyle.displayPic} /> */}

            </View>

            

            <View style={{ marginVertical: 30, alignItems: 'center' }}>
                <Text style={styles.heading}>Category</Text>
                <FlatList
                keyExtractor={(item) => item.id}
                data={LocalData}
                renderItem={showCategory}
                numColumns={3}
                showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ marginVertical: 30, alignItems: 'center' }}>
                <Text style={styles.heading}>Language</Text>
                <FlatList
                keyExtractor={(item) => item.id}
                data={LocalData}
                renderItem={showLanguage}
                numColumns={3}
                showsHorizontalScrollIndicator={false}
                />
            </View>
            </View>
<View style={styles.bottom}>
<Ionicons name="refresh" size={30} color="#000" />
<View style={{backgroundColor:AppColor.white, borderRadius:30, height:30, width:30}}>
    <Ionicons name="checkmark" size={30} color="#000" />
    </View>
<Ionicons name="close-outline" size={30} color="#000" />

</View>
        </ImageBackground>
    )
}

export default Filter

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:10
    },
    heading: {
        color:AppColor.white,
        fontSize:20,
        alignSelf:'flex-start',
        marginBottom:20
    },
   
   
      informationView: {
        borderRadius: 20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        width: Constants.screenWidth/3.8,
        // height: 31,
        paddingHorizontal:5,
        paddingVertical:8,
        borderWidth:1,        marginRight: 10,
        marginBottom: 14,
        backgroundColor: 'transparent',
        borderColor: '#767676',
      },
      buttonPressed:{
        backgroundColor:AppColor.orange1
      },
      informationView1: {
        borderRadius: 20,
        alignSelf:'flex-start',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:8,
        borderWidth:1,        marginRight: 10,
        marginBottom: 14,
    
      },
      whitetext: {
        color: 'white',
      },
      name: {
        fontSize: 15,
        color: '#767676',
      },
      bottom:{
        backgroundColor: AppColor.orange1,
        borderRadius:35,
        paddingVertical:18,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-around',
        marginHorizontal:50,
        // marginTop:'20%'
      }
})