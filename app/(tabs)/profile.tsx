import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { useDeviceAccount } from "@/contexts/DeviceAccountContext";
import { fetchWatchListsMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import Constants from 'expo-constants';
import { useFocusEffect } from "expo-router";
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

const deviceName = Platform.OS + ' ' + Constants.deviceName;


const Profile = () => {
    const { accountId } = useDeviceAccount();
    const { data: watchlistMovies, loading: watchlistMoviesLoading, error: watchlistMoviesError, refetch } = useFetch(() => fetchWatchListsMovies(accountId))
    useFocusEffect(
        useCallback(() => {
            refetch();

            return () => { };
        }, [accountId])
    );
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
                <Text className="text-light-200 text-xs">Account ID: {accountId}</Text>
            </View>

            {/* Account Options */}
            <View className="space-y-4">
                <TouchableOpacity className="bg-dark-100 rounded-lg p-4">
                    <Text className="text-white">My Watchlist</Text>
                </TouchableOpacity>
                <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
                    {watchlistMoviesLoading ? (
                        <ActivityIndicator
                            size={"large"}
                            color="#0000ff"
                            className="mt-10 self-center"
                        />
                    ) : watchlistMoviesError || !watchlistMovies ? (
                        <Text className="text-red-500 px-5 my-3">
                            Error : {watchlistMoviesError?.message}</Text>
                    ) : (
                        <>
                            {watchlistMovies?.length === 0 &&
                                <Text className="text-center text-gray-500">
                                    No saved Movies where found
                                </Text>
                            }
                            <FlatList
                                // @ts-ignore
                                data={watchlistMovies}
                                renderItem={({ item }) => (
                                    <MovieCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    )
};

export default Profile;
