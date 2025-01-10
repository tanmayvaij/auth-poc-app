import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const router = useRouter();

  const handleChange = (field: keyof typeof state, text: string) => {
    setState((prev) => ({ ...prev, [field]: text }));
  };

  const register = () => {
    if (state.password === state.cpassword) {
      router.push({ pathname: "/setPin", params: { ...state, api: "/sign-up" } });
    } else {
      Alert.alert("Passwords mismatch");
    }
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
        placeholder="Set Password"
        keyboardType="default"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="Confirm Password"
        keyboardType="default"
        secureTextEntry
        onChangeText={(text) => handleChange("cpassword", text)}
      />
      <Pressable onPress={register}>
        <Text className="p-5 bg-gray-950 text-white text-center font-medium m-2 rounded-md">
          Go to setup pin
        </Text>
      </Pressable>
      <View className="text-center mt-10 text-lg flex flex-row items-center justify-center">
        <Text className="mr-3">Already have an account ?</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-blue-700 font-medium">Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
