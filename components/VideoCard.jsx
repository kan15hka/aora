import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import { useGlobalContext } from "../context/GlobalProvider";
import { addUserBookMark } from "../lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    bookmark,
    video,
    creator: { username, avatar },
  },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const isBookmarkedVideo = () => {
    return bookmark.includes(user.$id);
  };
  const [isLiked, setIsLiked] = useState(isBookmarkedVideo);

  const bookmarkVideo = async () => {
    setIsBookmarking(true);
    setIsLiked(!isLiked);
    await addUserBookMark(!isLiked, user.$id, $id);
    setIsBookmarking(false);
  };
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3  ">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={bookmarkVideo}>
          <View className="justify-center items-center">
            <View className=" rounded-3xl bg-white opacity-10 w-10 h-10 "></View>

            {isBookmarking ? (
              <ActivityIndicator
                className="w-5 h-5 absolute "
                color="#FFA001"
              />
            ) : (
              <Image
                source={icons.bookmark}
                className="w-5 h-5 absolute "
                tintColor={isLiked ? "#FFA001" : "#CDCDE0"}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
