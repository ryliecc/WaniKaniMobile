import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TokenScreen from "./screens/TokenScreen";
import LessonScreen from "./screens/LessonScreen";
import ReviewScreen from "./screens/ReviewScreen";
import RadicalScreen from "./screens/RadicalScreen";
import KanjiScreen from "./screens/KanjiScreen";
import VocabularyScreen from "./screens/VocabularyScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Dashboard", headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="API Token" component={TokenScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Radical" component={RadicalScreen} />
        <Stack.Screen name="Kanji" component={KanjiScreen} />
        <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
