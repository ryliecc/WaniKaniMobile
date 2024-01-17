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

export default function KanjiScreen({ route, navigation }) {
  const { levelCategory, startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);
  const [isLoading, setIsLoading] = useState(false);
  const [kanjiData, setKanjiData] = useState([]);
  const [token, setToken] = useMMKVStorage("api_token", storage, "");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "subjects?types=kanji&levels=" + activeLevel;
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
        setKanjiData(responseBody.data);
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
        categoryColor="#ff00aa"
        startLevel={startLevel}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <View style={styles.kanjiContainer}>
        {!isLoading &&
          kanjiData &&
          kanjiData.map((kanji) => {
            return (
              <TouchableOpacity
                style={styles.kanjiBadge}
                key={kanji.id}
                onPress={() =>
                  navigation.navigate("Kanji Details", {
                    kanjiId: kanji.id,
                  })
                }
              >
                <Text style={styles.kanjiCharacter}>
                  {kanji.data.characters}
                </Text>
                <Text style={styles.kanjiReading}>
                  {kanji.data.readings[0].reading}
                </Text>
                <Text style={styles.kanjiMeaning}>
                  {kanji.data.meanings[0].meaning}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Stay tuned! Soon you will be able to see all the kanji here.
        </Text>
        <Text>
          You clicked on {levelCategory}, so the first level that would show up
          is Level {startLevel}.
        </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
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
  kanjiContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 14,
  },
  kanjiBadge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 110,
    height: 110,
    backgroundColor: "#ff00aa",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  kanjiCharacter: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  kanjiReading: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  kanjiMeaning: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
