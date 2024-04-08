import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import HomeScreen from '../screen/home'
import Favorite from '../screen/favorite';
import Setting from '../screen/setting';
import Cart from '../screen/cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetails from '../screen/productDetails';
import { MyTheme } from '../Themes/MyTheme';



const Tab = createBottomTabNavigator();
const MainContainer = () => {
    const route = useRoute();




    return (
        <MyTheme>

            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Favorite') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (route.name === 'Setting') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={null}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                <Tab.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
                <Tab.Screen name="Setting" component={Setting} />


                <Tab.Screen name='ProductDetails' component={ProductDetails} options={{ tabBarButton: () => null, headerShown: false }} />
            </Tab.Navigator>
        </MyTheme>

    )
}

export default MainContainer

const styles = StyleSheet.create({})