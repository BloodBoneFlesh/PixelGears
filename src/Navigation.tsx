
import React, { Ref } from "react";
import { NavigationActions, createAppContainer, NavigationScreenProp } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { Main } from "./Main";
import { ColorEdit } from "./ColorEdit/ColorEdit";
import { TextColorEdit } from "./ColorEdit/TextColorEdit";
import { TestView1, TestView2 } from "./TestView";

export function setNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

let _navigator: NavigationScreenProp<{}>;

const contentNavigator = createStackNavigator(
    {
        MainScreen: { screen: TextColorEdit, params: {} },
        //SettingsScreen: Settings
        TestView1: TestView1
    },
    {
        initialRouteName: 'MainScreen',
        headerMode: "none",
        navigationOptions: { headerVisible: false }
    }
);

const AppNavigator = createStackNavigator(
    {
        content: contentNavigator,
        modalScreen: {
            screen: ColorEdit, navigationOptions: ({ navigation }) => ({
                cardStyle: {
                    backgroundColor: "transparent",
                    //opacity: 0.5
                }
            }),
        },
        TestView2: {
            screen: TestView2, navigationOptions: ({ navigation }) => ({
                cardStyle: {
                    backgroundColor: "transparent",
                    //opacity: 0.5
                }
            }),
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',

    },
);

export function navigate(routeName: string, params: Object[]) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

const AppContainerElement = createAppContainer(AppNavigator);

export const AppContainer = () => (
    <AppContainerElement ref={navigatorRef => { setNavigator(navigatorRef); }} style={{ flex: 1 }} />
)

