import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useState, useEffect } from "react";

const storage = new MMKVLoader().initialize();

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("unknown user");

  useEffect(() => {
    const apiEndpointPath = "user";
    const requestHeaders = new Headers({
      Authorization: "Bearer " + token, // added space after 'Bearer'
    });
    const apiEndpoint = new Request(
      "https://api.wanikani.com/v2/" + apiEndpointPath,
      {
        method: "GET",
        headers: requestHeaders,
      }
    );

    // Fetch user information
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        setUserData(json.data);
        setUsername(json.data.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {username}!</Text>
      <Text style={styles.text}>
        Welcome to the WaniKani Mobile App. It is still work in progress, but
        have a look around if you want to. 😉
      </Text>
      <Button
        title="Enter API Token"
        onPress={() => navigation.navigate("API Token")}
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
});
