import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LevelButtons from "../components/LevelButtons";
import { useState, useEffect } from "react";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();

export default function VocabularyScreen({ route, navigation }) {
  const { levelCategory, startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularyData, setVocabularyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath =
        "subjects?types=vocabulary,kana_vocabulary&levels=" + activeLevel;
      const requestHeaders = new Headers({
        Authorization: "Bearer " + token,
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
        console.log(response.status);
        setVocabularyData(responseBody.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeLevel, token]);

  return (
    <ScrollView>
      <LevelButtons
        categoryColor="#aa00ff"
        startLevel={startLevel}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <View style={styles.vocabularyContainer}>
        {!isLoading &&
          vocabularyData &&
          vocabularyData.map((vocabulary) => {
            return (
              <TouchableOpacity
                style={styles.vocabularyBadge}
                key={vocabulary.id}
                onPress={() =>
                  navigation.navigate("Vocabulary Details", {
                    vocabularyId: vocabulary.id,
                  })
                }
              >
                <Text style={styles.vocabularyCharacters}>
                  {vocabulary.data.characters}
                </Text>
                <View style={styles.vocabularyInfoContainer}>
                  <Text style={styles.vocabularyReading}>
                    {vocabulary.data.readings[0].reading}
                  </Text>
                  <Text style={styles.vocabularyMeaning}>
                    {vocabulary.data.meanings[0].meaning}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
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
  vocabularyContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: 6,
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  vocabularyBadge: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: 100,
    backgroundColor: "#aa00ff",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  vocabularyCharacters: {
    fontSize: 32,
    color: "#fff",
    textAlign: "left",
  },
  vocabularyInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
  },
  vocabularyReading: {
    fontSize: 20,
    color: "#fff",
    textAlign: "right",
  },
  vocabularyMeaning: {
    fontSize: 18,
    color: "#fff",
    textAlign: "right",
  },
});
