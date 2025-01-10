import { useFocusEffect } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  useFocusEffect(() => {
    getItemAsync("authToken")
      .then((token) => {
        if (token) router.replace("/dashboard");
        else {
          getItemAsync("hash")
            .then((hash) => {
              if (hash) router.replace("/pinAuth");
              else router.replace("/login");
            })
            .catch((err) => {
              console.log(JSON.stringify(err, null, 1));
            });
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 1));
      });
  });

  return null;
};

export default Index;
