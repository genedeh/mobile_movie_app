import { icons } from "@/constants/icons";
import Constants from 'expo-constants';
import React from "react";
import { Image, Text, TouchableOpacity, View , Platform} from "react-native";

const deviceName = Platform.OS + ' ' + Constants.deviceName;


const Profile = () => {
    return (
        <View className="flex-1 bg-primary px-5 pt-12">
            {/* Profile Info */}
            <View className="items-center mb-6">
                <Image
                    source={icons.person}
                    className="w-24 h-24 rounded-full mb-3"
                    tintColor="#A8B5DB"
                />
                <Text className="text-white text-xl font-bold">John Doe</Text>
                <Text className="text-light-200 text-sm">johndoe@example.com</Text>
            </View>

            {/* Device Info */}
            <View className="bg-dark-100 rounded-lg p-4 mb-4">
                <Text className="text-white font-semibold text-sm mb-1">Linked Device</Text>
                <Text className="text-light-200 text-xs">{deviceName}</Text>
            </View>

            {/* Account Options */}
            <View className="space-y-4">
                <TouchableOpacity className="bg-dark-100 rounded-lg p-4">
                    <Text className="text-white">My Watchlist</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-red-500 rounded-lg p-4 mt-6">
                    <Text className="text-white text-center font-bold">Log Out (Non functional)</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Profile;
