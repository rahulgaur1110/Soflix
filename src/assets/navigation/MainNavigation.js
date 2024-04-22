import * as React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Register from '../../screens/Register';
import VideoPlayer from '../../screens/VideoPlayer';
import Login from '../../screens/Login';
import Dashboard from '../../screens/Dashboard';
import Profile from '../../screens/Profile';
import Watchlist from '../../screens/Watchlist';
import ResetPassword from '../../screens/ResetPassword';
import EditProfile from '../../screens/EditProfile';
import Search from '../../screens/Search';
import Splash from '../../screens/Splash';
import TVChannel from '../../screens/TVChannel';
import AppColor from '../common/AppColors';
import ChangePassword from '../../screens/ChangePassword';
import SubCategory from '../../screens/SubCategory';
import Category from '../../screens/Category';
import TermsOfUsage from '../../screens/TermsOfUsage';
import PrivacyPolicy from '../../screens/PrivacyPolicy';

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName={'Splash'}>
    <AuthStack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignUp"
      component={Register}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="StaticPage"
      component={StaticPage}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen name="VideoPlayer" component={VideoPlayer}
        options={{ headerShown: false }} /> */}

      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="TermsOfUsage"
        component={TermsOfUsage}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Watchlist"
        component={Watchlist}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();
function MainNavigator() {
  return (
    <MainStack.Navigator
    // initialRouteName={"Splash"}
    >
      <MainStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="SubCategory"
        component={SubCategory}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: AppColor.orange1,
          height: 70,
          borderTopWidth: 0,
          marginHorizontal: 20,
          borderRadius: 40,
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({focused}) => (
            <View style={styles.bottomBox}>
              <View
                style={[
                  styles.footer_Icon,
                  {
                    backgroundColor: focused
                      ? AppColor.white
                      : AppColor.orange1,
                  },
                ]}>
                <MaterialIcons
                  name="home-filled"
                  color={focused ? AppColor.orange1 : AppColor.black}
                  size={24}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomBox}>
              <View
                style={[
                  styles.footer_Icon,
                  {
                    backgroundColor: focused
                      ? AppColor.white
                      : AppColor.orange1,
                  },
                ]}>
                <MaterialIcons
                  name="search"
                  color={focused ? AppColor.orange1 : AppColor.black}
                  size={24}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="WatchList"
        component={Watchlist}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomBox}>
              <View
                style={[
                  styles.footer_Icon,
                  {
                    backgroundColor: focused
                      ? AppColor.white
                      : AppColor.orange1,
                  },
                ]}>
                <MaterialIcons
                  name="playlist-play"
                  color={focused ? AppColor.orange1 : AppColor.black}
                  size={24}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="TVChannel"
        component={TVChannel}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomBox}>
              <View
                style={[
                  styles.footer_Icon,
                  {
                    backgroundColor: focused
                      ? AppColor.white
                      : AppColor.orange1,
                    paddingTop: 3,
                  },
                ]}>
                <Entypo
                  name="tv"
                  color={focused ? AppColor.orange1 : AppColor.black}
                  size={23}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footer_Icon: {
    borderRadius: 15,
    padding: 5,
    paddingTop: 2.5,
  },
  bottomBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    marginTop: Platform.OS === 'android' ? 0 : 12,
  },
});

export default MainNavigator;
