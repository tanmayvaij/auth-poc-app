import { router, useLocalSearchParams } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { randomUUID } from "expo-crypto";
import { api } from "@/api";

const SetPinScreen = () => {
  const { email, password } = useLocalSearchParams();

  const [state, setState] = useState({
    pin: "",
    cpin: "",
  });

  const handleChange = (field: keyof typeof state, text: string) => {
    setState((prev) => ({ ...prev, [field]: text }));
  };

  const setpin = () => {
    if (state.cpin === state.pin) {
      const hash = randomUUID();

      api
        .post("/sign-up", { email, password, pin: state.pin, hash })
        .then((res) => {
          if (res.data.isSuccess) {
            Promise.all([
              setItemAsync("hash", hash),
              setItemAsync("authToken", res.data.authToken),
            ])
              .then(() => {
                router.replace("/dashboard")
              })
              .catch((err) => {
                console.log(JSON.stringify(err, null, 1));
              });
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 1));
        });
    } else {
      Alert.alert("Pin mismatch");
    }
  };

  return (
    <View className="bg-white flex-1">
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="set pin"
        keyboardType="decimal-pad"
        secureTextEntry
        onChangeText={(text) => handleChange("pin", text)}
      />
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="confirm pin"
        keyboardType="decimal-pad"
        secureTextEntry
        onChangeText={(text) => handleChange("cpin", text)}
      />
      <Pressable onPress={setpin}>
        <Text className="p-5 bg-gray-950 text-white text-center font-medium m-2 rounded-md">
          Register
        </Text>
      </Pressable>
    </View>
  );
};

export default SetPinScreen;
