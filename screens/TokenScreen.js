import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();
export default function TokenScreen({ navigation }) {
  const [text, setText] = useState("");
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useMMKVStorage("user_data", storage, null);

  useEffect(() => {
    token.length >= 1 ? setText(token) : setText("");
  }, []);

  async function saveToken() {
    const apiEndpointPath = "user";
    const requestHeaders = new Headers({
      Authorization: "Bearer " + text,
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

      if (response.status === 401) {
        // Invalid token
        Alert.alert("Invalid Token", "Please enter a valid API token.");
      } else {
        // Valid token
        setToken(text);
        setUserData(responseBody.data);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please enter your API token.</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Enter API token here."
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button title="Done!" onPress={saveToken} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
