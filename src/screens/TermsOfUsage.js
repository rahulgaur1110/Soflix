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
    
    <Text style={styles.title}>Terms of Service</Text>

<Text style={styles.heading}>1. Description of Service</Text>

<Text style={AppStyle.text}>These Terms of Services are applicable to all users of an online media services and content distribution Services and community providing Services to its website video streaming Services located under and related domains, sub domains, and mobile and desktop applications & TV (individually and collectively the “Services”). These Terms govern your use of the Supernatural Online Network Services, including all functionalities, features, Streaming Services, audio, visual, written media, PDF, Website links and user interfaces, and all content and software associated with the Services as provided by Supernatural Online Network Services.</Text>

<Text style={styles.heading}>2. Acceptance of Terms</Text>
<Text style={AppStyle.text}>The Company shall have the right, at its sole discretion, to modify, add, or remove any terms or conditions of these Terms of Service without notice or liability to you. Any changes to these Terms of Service shall be effective immediately following the posting of such changes. You agree to review these Terms of Service from time to time and agree that any subsequent use by you of the Services following changes to these Terms of Service shall constitute your acceptance of all such changes.
</Text>
<Text style={styles.heading}>3. Access and Use of Service</Text>
<Text style={AppStyle.text}>
Users accessing the Services must be at least fifteen (5) years of age. Users registering for the Services and uploading User Generated Content must be at least eighteen (18) years of age, or twenty one (21) years of age for the Outlander Distilled collection and episodes. The Company makes no claims that the Services may be lawfully accessed in any specific location. Access to the Services may not be legal by certain persons or in certain states or certain countries, or may require government authorization or registration. When you access the Services you are solely responsible for compliance with the laws and regulations of your jurisdiction.
</Text>
<Text style={styles.heading}>4. Your Conduct</Text>
<Text style={AppStyle.text}>
The Services may be used only for lawful purposes relating to streaming and related materials. The Company specifically prohibits any use of the Services, and all users agree not to use the Services, for any purposes other than designated by the Company.
You are prohibited from violating or attempting to violate the security of the Services, including, without limitation, (a) accessing data not intended for such user or logging into a server or account which the user is not authorized to access, (b) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization, (c) attempting to interfere with service to any user, host or network, including, without limitation, via means of submitting a virus to this Services, overloading, “flooding”, “spamming”, “mailbombing” or “crashing”, (d) forging any TCP/IP packet header or any part of the header information in any e-mail or newsgroup posting, (e) scraping or harvesting data or (f) the use of robots to skew pay-outs.
Violations of system or network security or inappropriate conduct may result in civil or criminal liability. The Company will investigate occurrences that may involve such violations and may involve, and cooperate with law enforcement entities in prosecuting users who are involved in such violations.
</Text>
<Text style={styles.heading}>5. User Information</Text>
<Text style={AppStyle.text}>
You are solely responsible for the information you input or upload to the Services, and warrant and represent you have the right and authorization to register for the Services and post User Generated Content. The Company reserves the right in its sole discretion to decide whether the information you input or upload is appropriate and complies with the Terms of Service, other Company policies, and applicable laws and regulations.
If you register for the Services, you will be asked to provide certain information including a valid email address. You warrant and represent that all such information is current and accurate, and will be kept up-to-date.
Your privacy rights are set forth in our Privacy Policy located here.
The Company reserves the right to offer Company or third party services and products to you based on the preferences that you identify in your registration and at any time thereafter, unless you opt-out of receiving third party services and products.
</Text>
<Text style={styles.heading}>6. Username/Password/Security</Text>
<Text style={AppStyle.text}>
You are responsible for maintaining the confidentiality of your information as it relates to the Services, including your username and password, and are responsible for all uses of your username and password whether or not authorized by you. If you wish to have someone else use your device, it is important you always log out so no other individual will have access to your content.
You agree to immediately notify the Company of any unauthorized use of your username and password.
</Text>
<Text style={styles.heading}>7. Use of Services</Text>
<Text style={AppStyle.text}>
The Services are offered only for video streaming and related materials and is only a conduit for video streaming and related materials.
Each user is solely responsible for deciding whether the Services offered are suitable for your own purposes and whether the Services match your needs.
The Company grants you a limited, non-exclusive license to access and use the Services for your own personal and non-commercial purposes. This includes rights to view content on the Company’s website and applications. If you wish to use the service and content for commercial purposes, please contact The Company to enquire about such licencing.
If you elect to access any component of the Services for which there is a fee, you agree to pay all fees and charges associated with your account on a timely basis. All such fees and charges (including any taxes and late fees, as applicable) will be charged on your credit card. Each user agrees to maintain valid credit card information as part of your account information when applicable.
</Text>
<Text style={styles.heading}>8. Access to Services – Subscriptions & Purchases</Text>
<Text style={AppStyle.text}>
The Services may allow you to access digital content on a pay per view basis, subscription basis, rent, or purchases. The basis on which digital content is available on the Services will be indicated on the product detail page for which you may watch the digital content. Subject to your payment of any applicable fees, purchases, subscriptions or pay per view, the Company grants you a non-exclusive, non-transferrable, personal, non-sub licensable, limited right and license to view the video stream based upon the applicable fees, purchases, subscriptions, rent or pay per view selected by you.
The Company makes no guarantees as to the resolution and quality of your digital content when streaming. The quality and speed of your stream of digital content has many different variables, including your connection speed, location, download speeds, devices, player and bandwidth.
</Text>
<Text style={styles.heading}>9. Payments & Billing</Text>
<Text style={AppStyle.text}>
The digital content on this platform is free of charge, except for certain exclusive contents owned by individuals which would be available under specific payment plans, including pay per view, subscription or membership and may change from time to time at the sole discretion of the Content owner. The Company makes no guarantee as to the availability of a specific payment plan.
By purchasing a payment plan for a certain exclusive content, you expressly agree that we are authorized to charge your selected payment plan on the Payment Method you designate. You can change this information at any time by logging into your video library, and clicking the settings tab under the username.
Receipts are sent once the charge is successful to the registered email account. Your subscription will continue in effect unless and until you cancel your subscription or we terminate it. You must cancel your payment plan according to the terms of that specific plan prior to the next charge in order to avoid billing.
</Text>
<Text style={styles.heading}>10. User Comments and Suggestions</Text>
<Text style={AppStyle.text}>
While the Company values user feedback, please be specific in your comments and do not submit creative ideas, inventions, or suggestions.
If, despite our request, users send creative ideas, inventions, or suggestions, all such submission shall be the property of the Company in whole or in part. The Company shall own exclusively all now known or later discovered rights to the submissions and shall be entitled to unrestricted use of the submissions for any purpose whatsoever, commercial or otherwise, without compensation to users or any other third party.
No part of the submissions shall be subject to any obligation of confidence and the Company shall not be liable for any use or disclosure.
</Text>
<Text style={styles.heading}>11. Intellectual Property</Text>
<Text style={AppStyle.text}>
SOFLIX, SOTV and any other Company trademarks and trade names, and any variations thereof, are and shall remain the trademarks and trade names and exclusive property of the Company, and any unauthorized use of such trademarks and trade names is prohibited.
The Services (including without limitation all programs, compiled binaries, interface layout, interface text, documentation, resources and graphics) is the sole and exclusive property of the Company and is protected by copyright, trademark, and other intellectual property common and statutory laws of the United States and other countries.
You agree that the Supernatural Online Network. owns and retains all rights to the Services and that its content is solely owned and controlled by the content provider and all such material are protected and copyrighted, trademarked and protected by copyright, trademark, and other intellectual property common and statutory laws of South Africa and other countries.
You may not sell or modify the Services content or the Services, or reproduce, display, publicly perform, distribute, or otherwise use the Services in any way for any purpose.
</Text>
<Text style={styles.heading}>12. Social Networking</Text>
<Text style={AppStyle.text}>
Users may have the option to Twitter, Facebook or other social networking Services through the Services to share links and content. Users undertake this option as their sole responsibility, including but not limited to complying with all of the terms and conditions of the social networking Services.
</Text>
<Text style={styles.heading}>13. Use of Software</Text>
<Text style={AppStyle.text}>
If the Services require or include downloadable software such as an app, or use of software provided by the Company for Publishers, the Company grants a personal, limited, non-exclusive and non-transferable license to use the Software, all portions thereof, all documentation, and all updates (individually and collectively the “Software”) only for the purposes relating to video streaming and related activities.
Users shall not modify, alter, create derivative works, decompile, reverse engineer, disassemble, include in other software, translate the Software, or use the Software for any other purpose.
Users shall not copy, reproduce, transmit, rent, lease, resell, sublicense, assign, distribute or otherwise transfer the Software or this license.
This License does not allow users to use the Software on any device that the user does not own or control, and user may not distribute or make the Software available over a network where the Software could be used by multiple devices at the same time.
Users agree that the Software, including the specific design and structure, constitute proprietary and confidential information, trade secrets and/or intellectual property of the Company. You agree not to disclose, provide, or otherwise make available such proprietary and confidential information, trade secrets or copyrighted material in any form to any third party, or use the proprietary and confidential information, trade secrets or copyrighted material for your own benefit or for the benefit of any third party.
Users acknowledge and agree that use of the Software may require the Company to acquire users’ mobile phone numbers and perhaps additional such information in order to obtain access to the Software.
Users agree that the Company may collect and use technical data and related information that is gathered periodically to facilitate the provision of updates, product support and other services. The Company may use this information, as long as it is in a form that does not personally identify a user.
The Company shall have the right, and you agree, that in its sole discretion and with reasonable posted notice and/or sent to your email address, to revise, automatically update, or otherwise modify the Software, at any time. Users continued use of the Software constitutes acceptance of and agreement to such changes.
This License is effective until terminated by the user or the Company at its sole discretion. User’s rights under this license will terminate automatically without notice if the user fails to comply with any terms of this License. Upon termination, the user shall cease all use of the Software and delete all versions of the Software possessed by the user.
The warranty and limitation of liability provisions set forth below apply also to the use of the Software.
</Text>
<Text style={styles.heading}>14. Copyright Infringement Notification</Text>
<Text style={AppStyle.text}>
If you believe that any copyrighted work is accessible through the Services in a way that constitutes copyright infringement, please notify the Company by providing the following information:
* The physical or electronic signature of either the copyright owner or of a person authorized to act on the owner’s behalf;
* A description of the copyrighted work you claim has been infringed, and a description of the activity that you claim to be infringing;
* Identification of the URL or other specific location on the Services where the material or activity you claim to be infringing is located or is occurring; You must include enough information to allow us to locate the material or the activity;
* Your name, address, telephone number, and e-mail address;
* A statement by you, made under penalty of perjury, that (i) the information you have provided is accurate and that you are the copyright owner or are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed; and (ii) you have a good faith belief that use of the copyrighted materials is not authorized by the copyright owner, any agent of the copyright owner, or the law.
Please note that the submission of a false or materially misleading Notice or Counter-Notice, and any such submission may result in liabilities, including perjury. 
</Text>
<Text style={styles.heading}>15. Warranty Disclaimers</Text>
<Text style={AppStyle.text}>
The services are provided “as is” and “as available”, with all faults and without warranty of any kind, and company hereby disclaims all warranties and conditions with respect to the services, either express, implied or statutory, including, but not limited to, the implied warranties and/or conditions of merchantability, of satisfactory quality, of fitness for a particular purpose, of accuracy, of quiet enjoyment, and non-infringement of third party rights.
The company does not warrant that the services will meet user requirements or be of benefit, that the operation of services will be uninterrupted or error-free, or that the services are free of computer viruses or other harmful mechanisms. Should the licensed application or services prove defective, the company is not responsible for those costs associated with the need for servicing or replacing equipment or data.
The company makes no warranties about the accuracy, reliability, completeness or timeliness of the services or user generated content offered or any other content accessed through the services.
The transmission of data or information including communications by e-mail over the internet or other publicly accessible networks is not secure, and is subject to possible loss, interception or alteration while in transit. Accordingly, the company does not assume any liability for any damage users may experience or costs users may incur as a result of any transmissions over the internet or other publicly accessible networks, such as transmissions involving the exchange of e-mail. In no event will such data or information be deemed to be confidential, create any fiduciary obligations on the company’s part, or result in any liability to you in the event that such information is inadvertently released or accessed by third parties without consent.
The company takes no responsibility whatsoever for the information you have uploaded to the services and shall not be responsible or liable for the deletion, correction, destruction, damage, or loss of such information, or failure to store any of such information. Nor is the company responsible for loss of information through the action of any third party or because of circumstances beyond the company’s control. All users are expected to have their own backup of all of their information.
To the fullest extent permissible under applicable law, user understands and agrees that neither the company nor any of its affiliates or subsidiaries, or any of their respective directors, officers, employees, partners, representatives, contractors or agents shall be liable for any direct, indirect, incidental, special, consequential, punitive, exemplary or any other damages relating to or resulting from use of the services or from any actions the company takes or fails to take. These include but are not limited to damages for errors, omissions, interruptions, defects, delays, computer viruses, lost profits, loss of data, business interruption, unauthorized access to and alteration of transmissions and data, bodily injury, emotional distress and other tangible and intangible losses. This limitation applies regardless of whether the damages are claimed under the terms of a contract, as the result of negligence or otherwise, and even if advised of the possibility of such damages. Company’s maximum liability arising out of or in connection with this services or use of the services, regardless of the cause of action (whether in contract, tort, breach of warranty or otherwise), will not exceed the amount, if any, paid for the services.
The company is not responsible for deletion or loss of files or information uploaded to the services. All users are expected to have their own backup of all files and information uploaded to the services.
</Text>
<Text style={styles.heading}>16. Limitation of Libraries</Text>
<Text style={AppStyle.text}>
In addition to any limitation of liability set forth herein, to the fullest extent permissible under applicable law, user understands and agrees that neither the company nor any of its affiliates or subsidiaries, or any of their respective directors, officers, employees, partners, representatives, contractors or agents shall be liable for any direct, indirect, incidental, special, consequential, punitive, exemplary or any other damages relating to or resulting from your use or inability to use the services or from any actions the company takes or fails to take. These include damages for errors, omissions, interruptions, defects, delays, computer viruses, loss of profits, loss of data, unauthorized access to and alteration of transmissions and data, emotional distress and other tangible and intangible losses.
This limitation applies regardless of whether the damages are claimed under warranty, contract, negligence, tort, or any other legal theory, and even if the company or its representatives have been advised of the possibility of such damages. Company’s maximum liability arising out of or in connection with your use of the services, regardless of the cause of action, will not exceed the amount, if any, paid for the services.
</Text>

<Text style={styles.heading}>17. Indemnification</Text>
<Text style={AppStyle.text}>
Users agree to defend, indemnify, and hold harmless the company and its subsidiaries, affiliates, officers, directors, employees, agents, representatives, and partners, harmless from and against any loss, liability, claim, action, or demand, including without limitation reasonable legal and accounting fees, alleging or resulting from (i) your use of the services; (ii) any user generated content or communications, or (iii) your breach of the terms of this agreement. The company shall provide notice to you promptly of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit or proceeding. The company reserves the right to assume the exclusive defence and control of any matter subject to immediate indemnification.
</Text>

<Text style={styles.heading}>18. Communications</Text>
<Text style={AppStyle.text}>
By using the Services you consent to receive electronic communications from the Company. These communications will include, emails about account, password, access, marketing, transactional and other information related to the Services and to your account.
</Text>
<Text style={styles.heading}>19. Additional Terms and Conditions</Text>
<Text style={AppStyle.text}>
Nothing in this Agreement is intended to create or will be construed as creating a joint ventures, partnership, employer/employee or principal and agent relationship between users and the Company.
These Terms of Service shall be governed by and construed in accordance with the laws of the South Africa of applicable therein, without regard to conflict of laws and excluding the United Nations Convention on Contracts for the International Sale of Goods (CISG). You irrevocably consent to the exclusive jurisdiction of the courts located in the South Africa of in connection with any action arising out of or related to these Term of Service and waive any objection based on lack of personal jurisdiction, place of residence, improper venue forum non-convenience in any such action.
If any court having competent jurisdiction holds any provision of this Terms of Service invalid or unenforceable in any respect, such provision shall be enforced to the maximum extent permitted by law, and the remaining provisions of this Terms of Service shall continue in full force and effect.
The failure or delay of either party to exercise or enforce any right or claim does not constitute a waiver of such right or claim and shall in no way affect that party’s right to later enforce or exercise it, unless such party issues an express written waiver, signed by a duly authorized representative.
You may not assign these Terms of Service or any of your rights or obligations hereunder.
Except as expressly specified herein, this Agreement shall create rights and obligations only between the Company and each individual user and it does not create any rights for any other parties.

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
