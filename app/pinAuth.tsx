import { api } from "@/api";
import { Link, router } from "expo-router";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const PinAuthScreen = () => {
  const [email, setEmail] = useState("");

  getItemAsync("hash")
    .then((hash) => {
      api
        .post("/get-user-by-hash", { hash })
        .then((res) => {
          if (res.data.isSuccess) {
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 1));
        });
    })
    .catch((err) => {
      console.log(JSON.stringify(err, null, 1));
    });

  const [state, setState] = useState({
    pin: "",
  });

  const handleChange = (field: keyof typeof state, text: string) => {
    setState((prev) => ({ ...prev, [field]: text }));
  };

  const login = () => {
    api
      .post("/sign-in-with-pin", { email, pin: state.pin })
      .then((res) => {
        if (res.data.isSuccess) {
          setItemAsync("authToken", res.data.authToken)
            .then(() => {
              router.replace("/dashboard");
            })
            .catch((err) => {
              console.log(JSON.stringify(err, null, 1));
            });
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 1));
      });
  };

  return (
    <View className="bg-white flex-1">
      <Text className="p-3">Enter pin for {email}</Text>
      <TextInput
        className="p-5 bg-white m-2 rounded-md border border-gray-200"
        placeholder="Enter Pin"
        keyboardType="decimal-pad"
        secureTextEntry
        onChangeText={(text) => handleChange("pin", text)}
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
      <Text className="text-center mt-10 text-lg">
        <Link className="text-blue-700 font-medium" href={"/login"}>
          Change User / Forgot Pin ?
        </Link>
      </Text>
    </View>
  );
};

export default PinAuthScreen;
