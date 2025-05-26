import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

type TabIconProps = {
    focused: boolean;
    title: string;
    icon: any;
}


const TabIcon = ({ focused, title, icon }: TabIconProps) => {
    if (focused) {
        return (
            <ImageBackground className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                <Image tintColor="#151312" className="size-5 color-light-300" source={icon} />
                <Text className="text-light-300 text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    }
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image tintColor="#A8B5DB" className="size-5" source={icon} />
        </View>
    )
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "150%",
                    height: "150%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    borderWidth: 1,
                    borderBlockColor: "#0f0D23"
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} title="Home" icon={icons.home} />)
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} title="Search" icon={icons.search} />)

                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saveds",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} title="Saved" icon={icons.save} />)
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} title="Profile" icon={icons.person} />)

                }}
            />
        </Tabs>
    )
};

export default _Layout