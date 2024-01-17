import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import LevelButtons from "../components/LevelButtons";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();

export default function RadicalScreen({ route, navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const { startLevel } = route.params;
  const [activeLevel, setActiveLevel] = useState(startLevel);
  const [isLoading, setIsLoading] = useState(false);
  const [radicalData, setRadicalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "subjects?types=radical&levels=" + activeLevel;
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
        setRadicalData(responseBody.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeLevel, token]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <LevelButtons
        categoryColor="#00aaff"
        startLevel={startLevel}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <View style={styles.radicalContainer}>
        {!isLoading &&
          radicalData &&
          radicalData.map((radical) => {
            return (
              <TouchableOpacity
                style={styles.radicalBadge}
                key={radical.id}
                onPress={() =>
                  navigation.navigate("Radical Details", {
                    radicalId: radical.id,
                  })
                }
              >
                <Text style={styles.radicalText}>
                  {radical.data.characters}
                </Text>
                <Text style={styles.nameText}>
                  {radical.data.meanings[0].meaning}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  radicalContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 28,
    gap: 8,
    justifyContent: "center",
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
