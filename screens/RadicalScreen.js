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

export default function RadicalScreen({ route, navigation }) {
  const { levelCategory, startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);

  function toggleActiveLevel(level) {
    setActiveLevel(level);
  }
  return (
    <ScrollView>
      <View style={styles.levelButtonContainer}>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel)}
        >
          <Text style={styles.levelButtonText}>{startLevel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 1 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 1)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 2 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 2)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 3 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 3)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 3}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 4 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 4)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 4}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 5 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 5)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 5}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 6 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 6)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 6}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 7 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 7)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 7}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 8 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 8)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 8}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            {
              backgroundColor:
                activeLevel === startLevel + 9 ? "#00aaff" : "#d5d5d5",
            },
          ]}
          onPress={() => toggleActiveLevel(startLevel + 9)}
        >
          <Text style={styles.levelButtonText}>{startLevel + 9}</Text>
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
  levelButtonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 70,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
  levelButton: {
    width: 66,
    height: 66,
    padding: 10,
    paddingTop: 14,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  levelButtonText: {
    fontSize: 34,
    textAlign: "center",
    color: "#fff",
  },
});
