import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text, ScrollView } from "react-native";
import LevelButtons from "../components/LevelButtons";
import { useState } from "react";

export default function VocabularyScreen({ route, navigation }) {
  const { levelCategory, startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);
  return (
    <ScrollView>
      <LevelButtons
        categoryColor="#aa00ff"
        startLevel={startLevel}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          Stay tuned! Soon you will be able to see all vocabulary here.
        </Text>
        <Text>
          You clicked on {levelCategory}, so the first level that would show up
          is Level {startLevel}.
        </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
