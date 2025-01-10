import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const LoginScreen = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof typeof state, text: string) => {
    setState((prev) => ({ ...prev, [field]: text }));
  };

  const login = () => {
    router.push({ pathname: "/setPin", params: { ...state, api: "/sign-in" } });
  };

  return (
    <View className="bg-white flex-1">
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="Enter Email"
        keyboardType="email-address"
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="Enter Password"
        keyboardType="default"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      <Pressable onPress={login}>
        <Text className="p-5 bg-gray-950 text-white text-center font-medium m-2 rounded-md">
          Login
        </Text>
      </Pressable>
      <Text className="text-center mt-10 text-lg">
        Don't have an account ?{" "}
        <Link className="text-blue-700 font-medium" href={"/register"}>
          Register
        </Link>
      </Text>
    </View>
  );
};

export default LoginScreen;
