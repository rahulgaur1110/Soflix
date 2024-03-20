import { StyleSheet } from 'react-native';
import AppColors from './AppColors';
import Constants from './Constants';

const AppStyle = StyleSheet.create({
    mainContainer: {
       
    // height: Constants.screenHeight,
    // width: Constants.screenWidth,
    paddingTop:20,
    paddingHorizontal:20,
    backgroundColor:AppColors.black,
    flex:1,
    },
    imageContainer:{
        opacity: 0.8,
    },

    container:{
        backgroundColor: AppColors.black,
        flex:1,
        paddingHorizontal:15,
        paddingtop:15,
        paddingBottom:30
    },
    logo: {
        width: 385,
        height: 230,
        resizeMode:'contain',
        alignSelf:'center'
    },
    textInput: {
        color: 'white',
        fontSize: 14,
        backgroundColor: '#1F222A',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical:14,
        marginBottom:20
    },
    links: {
        color: AppColors.red,
        fontSize:15
    },
    logoText:{
        color:AppColors.primaryColor,
        fontSize: 20,
    },
    displayPic:{
        width:46,
        height:46
    },
    heading: { 
        color: AppColors.white,  fontSize: 24 ,
        fontWeight:'bold' 
    },
    subHeading: {
        color: AppColors.white, 
        fontSize: 18, 
        marginBottom:10,
    },
    linkButton: {
        backgroundColor: AppColors.primaryColor,
        marginTop:15,
        borderRadius: 25,
        padding:12
    },
    linkButtonText: {
        color: AppColors.white,
        textAlign:'center',
        fontSize:16,
        fontWeight: 'bold',
    },
    headerText: {
        color: AppColors.white,
        fontSize: 23,
        fontWeight:'bold',
        lineHeight: 26,
        marginVertical: 5,
        alignSelf:'center'
    },
    linkText: {
        color: AppColors.primaryColor,
        fontSize: 13,
        marginVertical: 15,
    },
    
    text:{
        color: AppColors.white,
        fontSize: 15,
        marginTop:10,
        
    },
    footer: {
        backgroundColor: AppColors.primaryColor,
        borderRadius: 30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical: 15,
        paddingHorizontal:25,
        marginTop: 15
    },
    footerIcon:{
        width: 17,
        height:17,
        resizeMode: 'contain'
    },
});

export default AppStyle;