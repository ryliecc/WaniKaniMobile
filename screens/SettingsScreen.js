import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="API Token"
        onPress={() => navigation.navigate("API Token")}
      />
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
});
