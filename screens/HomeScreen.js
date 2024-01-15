import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useState, useEffect } from "react";

const storage = new MMKVLoader().initialize();

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const [userData, setUserData] = useMMKVStorage("user_data", storage, null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.loading}>Trying to fetch data...</Text>}
      <Text style={styles.text}>
        {isTokenValid
          ? "Hello " +
            userData?.username +
            "! You're currently on level " +
            userData?.level +
            "."
          : "No valid API token!"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Lesson")}
          style={[styles.sessionButton, { backgroundColor: "#ff00aa" }]}
        >
          <Text style={styles.buttonText}>Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Review")}
          style={[styles.sessionButton, { backgroundColor: "#00aaff" }]}
        >
          <Text style={styles.buttonText}>Reviews</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Welcome to the WaniKani Mobile App. It is still work in progress, but
        have a look around if you want to. 😉
      </Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#00aaff" }]}
          onPress={() => navigation.navigate("Radical")}
        >
          <Text style={styles.buttonText}>Radicals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#ff00aa" }]}
          onPress={() => navigation.navigate("Kanji")}
        >
          <Text style={styles.buttonText}>Kanji</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: "#aa00ff" }]}
          onPress={() => navigation.navigate("Vocabulary")}
        >
          <Text style={styles.buttonText}>Vocabulary</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 40,
    padding: 30,
    paddingTop: 10,
  },
  sessionButton: {
    borderRadius: 30,
    border: "none",
    width: "50%",
    height: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    paddingTop: 18,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  categoryButton: {
    borderRadius: 30,
    width: 350,
    height: 80,
  },
});
