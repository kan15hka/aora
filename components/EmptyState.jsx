import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({
  title,
  subtitle,
  isPostsLoading,
  isLatestPostsLoading,
}) => {
  return (
    <View className="justify-center items-center px-4">
      {isPostsLoading && isLatestPostsLoading ? (
        <View className="mt-20">
          <ActivityIndicator color="#FFA001" animating={true} size="large" />
        </View>
      ) : (
        <>
          <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode="contain"
          />
          <Text className="font-psemibold text-xl text-white mt-2 text-center">
            {title}
          </Text>
          <Text className="font-pmedium text-center text-sm text-gray-100">
            {subtitle}
          </Text>
          <CustomButton
            title={"Create Video"}
            handlePress={() => router.push("/create")}
            containerStyles={"w-full my-5"}
          />
        </>
      )}
    </View>
  );
};

export default EmptyState;
