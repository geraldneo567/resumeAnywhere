import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

// Will be removed later on
import TestHomeScreen from "./app/screens/TestHomeScreen";

import PersonalInformationScreen from './app/screens/PersonalInformationScreen';
import HomeScreen from './app/screens/HomeScreen';
import HTMLScreen from './app/screens/HTMLScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';
import LogoutScreen from "./app/screens/LogoutScreen";
import DocumentsScreen from "./app/screens/DocumentsScreen";
import CameraScreen from "./app/screens/CameraScreen";
import ResumeGeneratorScreen from "./app/screens/ResumeGeneratorScreen";
import UserProfileScreen from "./app/screens/UserProfileScreen";
import Colors from './app/config/colors';

import {
    NavigationContainer,
    useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Icon} from "react-native-elements";

import {auth} from "./app/config/Database"


const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RegistrationAndLoginStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Login"
                         screenOptions={{
                             headerStyle: {
                                 backgroundColor: Colors.placeholderColor
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 fontWeight: 'bold'
                             },
                             headerLeft: () => null
                         }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                />
        </Stack.Navigator>
    );
}

const DocumentStackScreen = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Documents">
            <Stack.Screen
                name="Documents"
                component={DocumentsScreen}
                options={{
                    title: 'Documents',
                    headerShown: false
                }}/>
            <Stack.Screen name='Camera'
                          component={CameraScreen}
                          options={{
                              title: 'Camera',
                              headerShown: false
                          }}/>
        </Stack.Navigator>
    )
}

const InformationStackScreen = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Resume Generator"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: Colors.placeholderColor
                            },
                            headerTitleStyle: {color: Colors.white},
                            headerBackTitleStyle: {color: Colors.white}
                        }}>
            <Stack.Screen name="Resume Generator"
                          component={ResumeGeneratorScreen}
                          options={{
                              title: "Resume Generator",
                              headerShown: false,
                          }} />
            <Stack.Screen name="HTML Preview"
                          component={HTMLScreen} />
        </Stack.Navigator>
    )
}

const MenuScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Logout");
                console.log("Logged out successfully");
            }).catch(error => alert(error));
    }

    const customDrawerContent = (props) => {
        const { state, ...rest } = props;
        const newState = { ...state}
        newState.routes = newState.routes
            .filter(item => item.name !== 'User Profile' && item.name !== "Logout")

        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList state={newState} {...rest} />
                <DrawerItem label="Logout"
                            icon={() => (
                                <Icon
                                    name='logout'
                                    color={Colors.placeholderColor}
                                    type='material-community'/>)}
                            onPress={handleLogout} />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator initialRouteName="Home"
                          drawerContent={customDrawerContent}
                          screenOptions={({navigation}) => ({
                              headerShown: true,
                              headerStyle: {
                                  backgroundColor: Colors.placeholderColor
                              },
                              headerTintColor: '#fff',
                              headerTitleStyle: {
                                  fontWeight: 'bold'
                              },
                              headerRight: () => (
                                  <Icon
                                      name='account-circle-outline'
                                      type='material-community'
                                      style={styles.headerRight}
                                      size={32}
                                      onPress={() => navigation.navigate("User Profile")}
                                      color={Colors.white} />
                              )
                          })}>

            <Drawer.Screen name="Home"
                           component={HomeScreen}
                           options={{drawerIcon: (() => (
                                       <Icon name='home'
                                             type='material-community'
                                             color={Colors.placeholderColor} />
                                   )
                               )}} />
            <Drawer.Screen name={"Test Home"}
                           component={TestHomeScreen} />
            <Drawer.Screen name="Documents"
                           component={DocumentStackScreen}
                           options={{
                               title: "Documents",
                               drawerIcon: (() => (
                                       <Icon name='file-document-outline'
                                             type='material-community'
                                             color={Colors.placeholderColor} />
                                   )
                               )}}/>
            <Drawer.Screen name="Personal Information"
                           component={PersonalInformationScreen}
                           options={{
                               title: "Personal Information",
                               drawerIcon: (() => (
                                       <Icon name='file-document-outline'
                                             type='material-community'
                                             color={Colors.placeholderColor} />
                                   )
                               )}}/>
            <Drawer.Screen name="Information Page"
                           component={InformationStackScreen}
                           options={() => ({
                               title: "Resume Generator",
                               drawerIcon: (() => (
                                       <Icon name='file-document-outline'
                                             type='material-community'
                                             color={Colors.placeholderColor} />
                                   ))
                           })} />
            <Drawer.Screen name="User Profile"
                           component={UserProfileScreen}
                           options={{title: "User Profile"}} />
            <Drawer.Screen name="Logout"
                           component={LogoutScreen}
                           options={{headerShown: false}} />
        </Drawer.Navigator>
    )
}

export default function App(props) {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName='Main'>
                <MainStack.Screen name='Main'
                                   component={RegistrationAndLoginStack}
                                   options={{headerShown: false}}/>
                <MainStack.Screen name='Home'
                                   component={MenuScreen}
                                   options={{headerShown: false}}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerRight: {
        marginHorizontal: 20
    }
});