import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";

export default function TokenScreen({ navigation }) {
  const [text, setText] = useState("");

  function saveToken() {
    navigation.goBack();
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
