import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text } from "react-native";

export default function VocabularyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Stay tuned! Soon you will be able to see all vocabulary here.
      </Text>
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
