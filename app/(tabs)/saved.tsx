import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { useDeviceAccount } from '@/contexts/DeviceAccountContext';
import { fetchFavoriteMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';

const Saved = () => {
    const { accountId } = useDeviceAccount();
    const [filteredMovies, setFilteredMovies] = useState<Movie[] | null>([]);
    const [allMovies, setAllMovies] = useState<Movie[] | null>([]);
    // @ts-ignore
    const { data: savedMovies, loading: savedMoviesLoading, error: savedMoviesError, refetch } = useFetch(() => fetchFavoriteMovies(accountId))
    useFocusEffect(
        useCallback(() => {
            refetch();

            return () => { };
        }, [accountId])
    );

    useEffect(() => {
        // @ts-ignore
        if (savedMovies?.length > 0) {
            setAllMovies(savedMovies);
            setFilteredMovies(savedMovies);
        }
    }, [savedMovies]);

    const handleSearch = (text: string) => {
        setFilteredMovies(
            text.trim() === ''
                ? allMovies
                // @ts-ignore
                : allMovies.filter((movie) =>
                    movie.title.toLowerCase().includes(text.toLowerCase())
                )
        );
    };
    return (
        <View className="flex-1 bg-primary">
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
                {savedMoviesLoading ? (
                    <ActivityIndicator
                        size={"large"}
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : savedMoviesError ? (
                    <Text>Error : {savedMoviesError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-10">
                        <SearchBar
                            placeholder="Search for movies, series, and more"
                            onChangeText={handleSearch}
                        />
                        <View className="mt-10">
                            <Text className="text-lg text-white font-bold mb-3">
                                Saved Movies
                            </Text>
                            {filteredMovies?.length === 0 &&
                                <Text className="text-center text-gray-500">
                                    No saved Movies where found
                                </Text>
                            }
                            <FlatList
                                // @ts-ignore
                                data={filteredMovies}
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
                        </View>
                    </View>

                )}
            </ScrollView>
        </View>
    );
};
export default Saved;