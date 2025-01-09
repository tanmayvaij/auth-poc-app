import { api } from "@/api";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { randomUUID } from "expo-crypto";
import { setItemAsync } from "expo-secure-store";
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
      api
        .post("/sign-up", { email: state.email, password: state.password })
        .then((res) => {
          const hash = randomUUID();

          if (res.data.isSuccess) {
            Promise.all([
              setItemAsync("authToken", res.data.authToken),
              setItemAsync("hash", hash),
            ])
              .then(() => {
                api
                  .post("/set-hash", { email: state.email, hash })
                  .then((res) => {
                    if (res.data.isSuccess) router.replace("/dashboard");
                  })
                  .catch((err) => {
                    console.log(JSON.stringify(err, null, 1));
                  });
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
          Register
        </Text>
      </Pressable>
      <Text className="text-center mt-10 text-lg">
        Already have an account ?{" "}
        <Link className="text-blue-700 font-medium" href={"/login"}>
          Login
        </Link>
      </Text>
    </View>
  );
};

export default RegisterScreen;
