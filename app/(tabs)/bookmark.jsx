import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getBookmarkedPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

const BookMark = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  // const { data: posts } = useAppwrite(getAllPosts);
  const {
    data: posts,
    refetch: refetch,
    isLoading: isPostsLoading,
  } = useAppwrite(() => getBookmarkedPosts(user.$id));
  //Refresh and reload on swipe
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <Text className="text-2xl font-psemibold text-white mb-5">
              Saved Videos
            </Text>

            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video and join the aora community "
            isPostsLoading={isPostsLoading}
            isLatestPostsLoading={true}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default BookMark;
