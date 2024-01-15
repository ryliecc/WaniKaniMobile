import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useState, useEffect } from "react";

const storage = new MMKVLoader().initialize();

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useMMKVStorage("user_data", storage, null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "user";
      const requestHeaders = new Headers({
        Authorization: "Bearer " + token,
      });
      const apiEndpoint = new Request(
        "https://api.wanikani.com/v2/" + apiEndpointPath,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );

      try {
        const response = await fetch(apiEndpoint);
        const responseBody = await response.json();
        console.log(response.status);

        if (response.status === 401) {
          setIsTokenValid(false);
          setUserData(null);
        } else {
          setIsTokenValid(true);
          setUserData(responseBody.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, navigation]);

  return (
    <View style={styles.container}>
      <Text style={isLoading ? styles.loading : styles.notLoading}>
        {isLoading ? "Trying to fetch data..." : ""}
      </Text>
      <Text style={styles.text}>
        {isTokenValid
          ? "Hello " + userData?.username + "!"
          : "No valid API token!"}
      </Text>
      <Text style={styles.text}>
        Welcome to the WaniKani Mobile App. It is still work in progress, but
        have a look around if you want to. 😉
      </Text>
      <Button title="Lessons" onPress={() => navigation.navigate("Lesson")} />
      <Button title="Reviews" onPress={() => navigation.navigate("Review")} />
      <Button title="Radicals" onPress={() => navigation.navigate("Radical")} />
      <Button title="Kanji" onPress={() => navigation.navigate("Kanji")} />
      <Button
        title="Vocabulary"
        onPress={() => navigation.navigate("Vocabulary")}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  loading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    position: "absolute",
    top: -10,
    backgroundColor: "#696969",
    width: "100%",
    height: 35,
  },
  notLoading: {
    position: "absolute",
    display: "none",
  },
});
