import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import LevelButtons from "../components/LevelButtons";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();

export default function RadicalScreen({ route, navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const { levelCategory, startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);

  return (
    <ScrollView>
      <LevelButtons
        categoryColor="#00aaff"
        startLevel={startLevel}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <View style={styles.radicalContainer}>
        <TouchableOpacity style={styles.radicalBadge}>
          <Text style={styles.radicalText}>A</Text>
          <Text style={styles.nameText}>something</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Stay tuned! Soon you will be able to see all the radicals here.
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
  radicalContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    padding: 10,
  },
  radicalBadge: {
    backgroundColor: "#00aaff",
    width: 86,
    height: 86,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  radicalText: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  nameText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});
