import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useEffect, useState } from "react";

const storage = new MMKVLoader().initialize();

export default function KanjiDetailsScreen({ route, navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const { kanjiId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [kanjiData, setKanjiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "subjects/" + kanjiId;
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
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {!isLoading && kanjiData ? (
          <Text>
            You clicked on the Kanji {kanjiData.characters}, it means{" "}
            {kanjiData.meanings[0].meaning} and is pronounced like{" "}
            {kanjiData.readings[0].reading}. More info will come soon.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    paddingTop: 200,
  },
});
