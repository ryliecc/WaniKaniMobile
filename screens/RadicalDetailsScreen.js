import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useMMKVStorage, MMKVLoader } from "react-native-mmkv-storage";
import { useEffect, useState } from "react";

const storage = new MMKVLoader().initialize();

export default function RadicalDetailsScreen({ route, navigation }) {
  const [token, setToken] = useMMKVStorage("api_token", storage, "");
  const { radicalId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [radicalData, setRadicalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiEndpointPath = "subjects/" + radicalId;
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
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {!isLoading && radicalData ? (
          <Text>
            You clicked on the Radical {radicalData.characters}, it means{" "}
            {radicalData.meanings[0].meaning}. More info will come soon.
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
