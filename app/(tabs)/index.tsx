import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={images.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for movies, series, and more"
          />
        </View>
      </ScrollView>
    </View>
  );
}