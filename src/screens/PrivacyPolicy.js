import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppImages from '../assets/common/AppImages'
import AppStyle from '../assets/common/AppStyle'
import AppColor from '../assets/common/AppColors'
import Constants from '../assets/common/Constants'
import Header from '../assets/components/Header'


const Watchlist = ({navigation}) => {
 

    
    return (
        <ImageBackground style={[AppStyle.mainContainer,{paddingBottom:80}]} resizeMode="stretch" source={AppImages.background}
        imageStyle={AppStyle.imageContainer}
        >

<Header onPress={() => navigation.goBack()} /> 
<ScrollView>
<View>
    
    <Text style={styles.title}>Privacy Policy</Text>

<Text style={styles.heading}>1. Description of Service</Text>

<Text style={AppStyle.text}>
This privacy policy is intended to inform you about the information and data gathered by the Supernatural Online Network. (“us”, “we”) when you use this service, how we store your information, information we collect and to the degree your information may be used.
Supernatural Online Network takes your privacy seriously. We do not rent, sell or share your personal information with 3rd parties, except as listed below. We may update this Privacy Policy from time to time, you are a registered Supernatural Online Network user, we will attempt to inform you of any material changes by email. Otherwise, please check back frequently on the website for the latest and most updated privacy policy posted here Supernatural Online Network provides you with the opportunity to review, remove and modify any personal information that you provided previously under the South African POPIA and PAIA Data Protection Act, please contact us directly by email to make changes to your personal information. You may also update your personal information by logging into your Supernatural Online Network account and updating your details by clicking your username at the top right of the page then clicking Settings.   
</Text>

<Text style={styles.heading}>2. Data Collection & Use</Text>
<Text style={AppStyle.text}>
We only collect the personal data you choose to provide us during your registration process. As part of the registration process in order to use Supernatural Online Network services, you need to provide us with your Full Name, Email Address, Country, State, Zip Code, and Billing information, including credit card data, Paypal & Google Checkout information. You may elect to not provide any of the above info, but you will then not be able to use Supernatural Online Network services or certain features. We will keep your data for up to 30 days after your account is deleted. After the 30 days all your data is fully removed from our system.
</Text>
<Text style={styles.heading}>3. Analytics</Text>
<Text style={AppStyle.text}>
We may collect and store certain information about your interaction with Supernatural Online Network website and services, including cookies, IP Addresses, browser type, device type, location, Internet service provider (ISP), entry and exit pages, operating systems, time/date stamps, and other related data. Supernatural Online Network uses this information, only to improve the quality of our services and products. If you choose to decline cookies via your browser, you will have some limitations in using Supernatural Online Network services.
</Text>
<Text style={styles.heading}>4. Email Notices</Text>
<Text style={AppStyle.text}>
When you register to use Supernatural Online Network services or by purchasing any products from a vendor using Supernatural Online Network services, your email will automatically be listed in the Supernatural Online Network mailing list. You will receive welcome information, account information, and other marketing related information related to Supernatural Online Network services and the products you viewed and purchased. You may also receive periodic emails from us notifying you of new features, products, titles and other related information for Supernatural Online Network services. You may choose to opt out of receiving emails from Supernatural Online Network., but if you choose to do so, you will not receive technical support requests, account updates and notifications, product updates, security updates or updates to the Terms of Services as well as updates to Privacy Policy. At any time if you forget your account information, you may log back onto Supernatural Online Network website and click forgot login on the login area screen, a password reset link will be emailed to you with further steps to reset your account info.
</Text>
<Text style={styles.heading}>5. Business Transitions</Text>
<Text style={AppStyle.text}>
In the event of Supernatural Online Network goes through a business transition, such as a merger, acquisition by or with another company, including partial or all assets, any personally identifiable information we have on record will likely be transferred with the transition.
</Text>
<Text style={styles.heading}>6. Security</Text>
<Text style={AppStyle.text}>
We employ and protect all data with SSL encryption and other security measures to ensure you that your data is protected and safe. However please be advised that while we take extra measures to protect your data and integrity of your information, we cannot guarantee that our security measures will prevent unauthorized access from occurring. Please take the proper steps to maintain the security of your account information. We highly recommend that you set a tough to guess password for your registered account with Supernatural Online Network to ensure others from easily guessing your password.
</Text>
<Text style={styles.heading}>7. Changes to our privacy policy</Text>
<Text style={AppStyle.text}>
Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail.
</Text>
<Text style={styles.heading}>8. Your Rights</Text>
<Text style={AppStyle.text}>
You have the right to ask us to not process your personal data for marketing purposes. You can exercise that right by contacting us at info@soflix.net
</Text>
<Text style={styles.heading}>9. Contact Information</Text>
<Text style={AppStyle.text}>
If you have any questions or concerns about this policy or any Supernatural Online Network products, services or features, please don’t hesitate to contact us at info@soflix.net
</Text>

</View>



</ScrollView>

        </ImageBackground>
    )
}

export default Watchlist

const styles = StyleSheet.create({
   title:{
    color: AppColor.white,
    fontSize:27,
    fontWeight:'bold',
    alignSelf:'center'
   },
   heading:{
    marginTop:15,
    color:AppColor.orange1,
    fontSize:18,
    fontWeight:'bold',
   }
})
