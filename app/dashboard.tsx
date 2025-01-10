import { router } from "expo-router";
import { deleteItemAsync } from "expo-secure-store";
import { View, Text, Pressable } from "react-native";

const DashboardScreen = () => {
  const logOut = () => {
    deleteItemAsync("authToken")
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 1));
      });
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Pressable onPress={logOut} className="bg-gray-900 rounded-md  p-5">
        <Text className="text-center text-white text-lg font-medium">
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default DashboardScreen;
