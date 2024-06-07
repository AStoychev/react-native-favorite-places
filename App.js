import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButton from "./components/UI/IconButton";


import { init } from "./util/database";

import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
    // const [dbInitialized, setDbInitialized] = useState(false);

    // useEffect(() => {
    //     init().then(() => {
    //         setDbInitialized(true);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }, []);

    // if (!dbInitialized) {
    //     return <AppLoading />
    // }

    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: { backgroundColor: Colors.primary500 },
                    headerTintColor: Colors.gray700,
                    contentStyle: { backgroundColor: Colors.gray700 },
                }}>
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: 'Add a new Place',
                        }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={Map}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

// const styles = StyleSheet.create({
//     constainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// })