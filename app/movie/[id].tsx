import { icons } from "@/constants/icons";
import { useDeviceAccount } from "@/contexts/DeviceAccountContext";
import { addMovieToFavorites, addMovieToWatchList, fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const MovieInfo = ({ label, value }: { label: string, value?: string | number | null }) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">
            {label}
        </Text>
        <Text className="text-light-200 font-bold text-sm mt-2">
            {value || 'N/A'}
        </Text>
    </View>
)

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { accountId } = useDeviceAccount();
    const [addToFavoritesIsLoading, setAddToFavoritesIsLoading] = useState(false);
    const [addToWatchlistsIsLoading, setAddToWatchlistsIsLoading] = useState(false);
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
    const handleAddToFavorites = async (movie_id: number | undefined) => {
        try {
            setAddToFavoritesIsLoading(true);
            await addMovieToFavorites(movie_id, accountId)
        } catch (error) {
            console.error(`Error adding movie ${movie_id} to favorites:`, error);
        } finally {
            setAddToFavoritesIsLoading(false);
        }
    }

    const handleAddToWatchlist = async (movie_id: number | undefined) => {
        try {
            setAddToWatchlistsIsLoading(true);
            await addMovieToWatchList(movie_id, accountId)
        } catch (error) {
            console.error(`Error adding movie ${movie_id} to watchlists:`, error);
        } finally {
            setAddToWatchlistsIsLoading(false);
        }
    }

    return (

        <View className="bg-primary flex-1 relative">
            {loading ? (
                <ActivityIndicator
                    size={"large"}
                    color="#0000ff"
                    className="mt-10 self-center"
                />
            ) : (
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={{
                            uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                        }}
                            style={{ width: '100%', height: 550 }}
                            resizeMode='stretch'

                        />
                        <View className="absolute bottom-5 w-full px-5 flex-row justify-between">
                            {/* Play Button */}
                            <TouchableOpacity
                                onPress={() => handleAddToWatchlist(movie?.id)}
                                className="flex-1 bg-dark-100 mr-2 py-3 rounded-full flex-row items-center justify-center"
                                style={{
                                    elevation: 4,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}
                            >
                                {addToWatchlistsIsLoading ?
                                    <ActivityIndicator
                                        size={"small"}
                                        className="self-center color-accent"
                                    /> : <>
                                        <Image source={icons.play} className="w-5 h-5 mr-2" />
                                        <Text className="text-white font-semibold">Play</Text>
                                    </>}
                            </TouchableOpacity>

                            {/* Favourite Button */}
                            <TouchableOpacity
                                onPress={() => handleAddToFavorites(movie?.id)}
                                className="w-14 h-14 bg-dark-100 items-center justify-center rounded-full"
                                style={{
                                    elevation: 4,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}
                            >
                                {addToFavoritesIsLoading ?
                                    <ActivityIndicator
                                        size={"small"}
                                        className="self-center color-accent"
                                    /> :
                                    <Image source={icons.saved} className="w-6 h-6" tintColor="#" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-col items-start justify-center mt-5 px-5">
                        <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                        <View className="flex-row gap-x-1 mt-2 items-center">
                            <Text className="text-light-200 text-sm">
                                {movie?.release_date?.split('-')[0] || 'N/A'}
                            </Text>
                            <Text className="text-light-200 text-sm">
                                {/* @ts-ignore */}
                                {movie?.runtime}m
                            </Text>
                        </View>
                        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                            <Image source={icons.star} className="size-4" />
                            <Text className="text-white font-bold text-sm">
                                {Math.round(movie?.vote_average ?? 0) || 'N/A'}/10
                            </Text>
                            <Text className="text-light-200 text sm">
                                ({movie?.vote_count} votes)
                            </Text>
                        </View>
                        <MovieInfo label="Overview" value={movie?.overview} />
                        {/* @ts-ignore */}
                        <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
                        <View className="flex flex-row justify-between w-1/2">
                            {/* @ts-ignore */}
                            <MovieInfo label="Budget" value={`$${movie?.budget / 1_000_000} millions `} />
                            {/* @ts-ignore */}
                            <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue) / 1_000_000} millions `} />
                        </View>
                        {/* @ts-ignore */}
                        <MovieInfo label="Production Companies" value={movie?.production_companies?.map((c) => c.name).join(' - ') || 'N/A'} />
                    </View>
                </ScrollView>
            )}
            <View className="absolute bottom-6 left-0 right-0 items-center z-50">
                <TouchableOpacity
                    onPress={router.back}
                    className="flex-row items-center justify-center bg-accent/90 px-6 py-3 rounded-full shadow-lg"
                    style={{
                        elevation: 6, // Android shadow
                        shadowColor: '#000', // iOS shadow
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                    }}
                >
                    <Text className="text-white font-semibold text-base">Go Back</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default MovieDetails;