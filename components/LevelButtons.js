import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function LevelButtons({
  categoryColor,
  startLevel,
  activeLevel,
  setActiveLevel,
}) {
  function toggleActiveLevel(level) {
    setActiveLevel(level);
  }
  return (
    <View style={styles.levelButtonContainer}>
      <TouchableOpacity
        style={[
          styles.levelButton,
          {
            backgroundColor:
              activeLevel === startLevel ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 1 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 2 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 3 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 4 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 5 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 6 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 7 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 8 ? categoryColor : "#d5d5d5",
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
              activeLevel === startLevel + 9 ? categoryColor : "#d5d5d5",
          },
        ]}
        onPress={() => toggleActiveLevel(startLevel + 9)}
      >
        <Text style={styles.levelButtonText}>{startLevel + 9}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
