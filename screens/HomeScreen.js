import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useState, useEffect } from "react";
import SettingsIcon from "../constants/SettingsIcon";

const storage = new MMKVLoader().initialize();

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useMMKVStorage("user_data", storage, null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [isCategoryLevelOpen, setIsCategoryLevelOpen] = useState(false);
  const [categoryBackgroundColor, setCategoryBackgroundColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "user";
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

        if (response.status === 401) {
          setIsTokenValid(false);
          setUserData(null);
        } else {
          setIsTokenValid(true);
          setUserData(responseBody.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, navigation]);

  function toggleCategoryLevelContainer(category) {
    if (category === "Radical") {
      setCategoryBackgroundColor("#00aaff");
    }
    if (category === "Kanji") {
      setCategoryBackgroundColor("#ff00aa");
    }
    if (category === "Vocabulary") {
      setCategoryBackgroundColor("#aa00ff");
    }
    if (category === activeCategory) {
      setActiveCategory("");
      setIsCategoryLevelOpen(false);
    } else {
      setActiveCategory(category);
      setIsCategoryLevelOpen(true);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.loading}>Trying to fetch data...</Text>}
      <Text style={styles.text}>
        {isTokenValid
          ? "Hello " + userData?.username + "!"
          : "No valid API token!"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Lesson")}
          style={[styles.sessionButton, { backgroundColor: "#ff00aa" }]}
        >
          <Text style={[styles.sessionNumber, { color: "#ff00aa" }]}>263</Text>
          <Text style={styles.sessionText}>Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Review")}
          style={[styles.sessionButton, { backgroundColor: "#00aaff" }]}
        >
          <Text style={[styles.sessionNumber, { color: "#00aaff" }]}>420</Text>
          <Text style={styles.sessionText}>Reviews</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.categoryTitle}>Overview</Text>
      <View
        style={[
          styles.categoryContainer,
          { paddingBottom: isCategoryLevelOpen ? 210 : 20 },
        ]}
      >
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#00aaff" }]}
          onPress={() => toggleCategoryLevelContainer("Radical")}
        >
          <Text style={styles.categoryJapaneseText}>部首</Text>
          <Text style={styles.categoryEnglishText}>Radicals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#ff00aa" }]}
          onPress={() => toggleCategoryLevelContainer("Kanji")}
        >
          <Text style={styles.categoryJapaneseText}>漢字</Text>
          <Text style={styles.categoryEnglishText}>Kanji</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#aa00ff" }]}
          onPress={() => toggleCategoryLevelContainer("Vocabulary")}
        >
          <Text style={styles.categoryJapaneseText}>単語</Text>
          <Text style={styles.categoryEnglishText}>Vocabulary</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.categoryLevelContainer,
          { display: isCategoryLevelOpen ? "flex" : "none" },
          { backgroundColor: categoryBackgroundColor },
        ]}
      >
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 1,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>快</Text>
          <Text style={styles.categoryLevelEnglishText}>Pleasant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 11,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>苦</Text>
          <Text style={styles.categoryLevelEnglishText}>Painful</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 21,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>死</Text>
          <Text style={styles.categoryLevelEnglishText}>Death</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 31,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>地獄</Text>
          <Text style={styles.categoryLevelEnglishText}>Hell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 41,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>天国</Text>
          <Text style={styles.categoryLevelEnglishText}>Paradise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryLevelButton}
          onPress={() =>
            navigation.navigate(activeCategory, {
              startLevel: 51,
            })
          }
        >
          <Text style={styles.categoryLevelJapaneseText}>現実</Text>
          <Text style={styles.categoryLevelEnglishText}>Reality</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Welcome to the WaniKani Mobile App. It is still work in progress, but
        have a look around if you want to. 😉
      </Text>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <SettingsIcon width={50} height={50} />
      </TouchableOpacity>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>{userData?.level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 120,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  loading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    position: "absolute",
    backgroundColor: "#696969",
    top: -10,
    width: "100%",
    height: 35,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 15,
    padding: 30,
    paddingTop: 10,
  },
  sessionButton: {
    borderRadius: 30,
    border: "none",
    width: 350,
    height: 80,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingRight: 30,
  },
  sessionNumber: {
    backgroundColor: "#fff",
    fontSize: 30,
    padding: 6,
    borderRadius: 15,
    overflow: "hidden",
  },
  sessionText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  categoryTitle: {
    position: "absolute",
    top: 390,
    left: 36,
    zIndex: 10,
    fontSize: 40,
    fontWeight: "bold",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#d5d5d5",
    margin: 30,
    marginTop: 0,
    borderRadius: 20,
  },
  categoryButton: {
    borderRadius: 30,
    height: 110,
    width: 110,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  categoryJapaneseText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  categoryEnglishText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  categoryLevelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: 340,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 20,
    position: "absolute",
    top: 590,
  },
  categoryLevelButton: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  categoryLevelEnglishText: {
    fontSize: 18,
  },
  categoryLevelJapaneseText: {
    fontSize: 22,
  },
  settingsButton: {
    position: "absolute",
    top: 60,
    right: 8,
    backgroundColor: "#d5d5d5",
    padding: 5,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  levelBadge: {
    position: "absolute",
    top: 60,
    left: 8,
    backgroundColor: "#aa00ff",
    padding: 5,
    borderRadius: 8,
    width: 62,
    height: 62,
  },
  levelText: {
    color: "#fff",
    fontSize: 34,
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "bold",
  },
});
