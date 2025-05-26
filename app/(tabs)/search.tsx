import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(() => fetchMovies({
        query: searchQuery,
    }), true);
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <FlatList
                data={movies}
                renderItem={({ item }) => (<MovieCard {...item} />)}
                keyExtractor={(item) => item.id.toString()}
                className="px-5 "
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center items-center mt-20">
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChangeText={(text: string) => {
                                    setSearchQuery(text);
                                }}
                            />
                        </View>
                        {moviesLoading && (
                            <ActivityIndicator size="large" color="#0000fff" className=" my-3" />
                        )}
                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError?.message}
                            </Text>
                        )}
                        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                            <Text className='text-xl text-white font-bold '>
                                Search Result {' '}
                                <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }

                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim() ? `No movies found for "${searchQuery}"` : 'Please enter a search term.'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;