import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


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
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
    console.log('Poster URL:', `https://image.tmdb.org/t/p/w500${movie?.poster_path}`);
    return (
        <View className="bg-primary flex-1 relative">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Image source={{
                        uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                        style={{ width: '100%', height: 550 }}
                        resizeMode='stretch'

                    />
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