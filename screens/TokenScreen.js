import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();
const validCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "-",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
function checkValidInput(input) {
  let valid;
  if (input.length === 0) {
    return true;
  }
  for (let i = 0; i < input.length; i++) {
    if (validCharacters.includes(input[i])) {
      valid = true;
    } else {
      return false;
    }
  }
  return valid;
}

export default function TokenScreen({ navigation }) {
  const [text, setText] = useState("");
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useMMKVStorage("user_data", storage, null);

  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    setIsInputValid(checkValidInput(text));
  }, [text]);

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
        Alert.alert(
          "Nice try.",
          "This token is unauthorized. Please try again."
        );
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
      {!isInputValid && (
        <Text style={{ color: "red" }}>You entered an invalid character!</Text>
      )}
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
