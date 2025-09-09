import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import HomeScreen from "../screen/HomeScreen";
import SettingScreen from "../screen/SettingScreen";
import NewNoteScreen from "../screen/NewNoteScreen";
import SummaryScreen from "../screen/SummaryScreen";
import SummaryDetailScreen from "../screen/SummaryDetailScreen";
import { home, home_active, plus, summary, summary_active } from "../svgXml";
import { scale, verticalScale } from "../utils/scale";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SummaryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SummaryMain"
      component={SummaryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SummaryDetail"
      component={SummaryDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const getActiveRouteName = (route: any): string => {
  if (!route) return "";
  if (route.state && route.state.index !== undefined) {
    const nestedRoute = route.state.routes[route.state.index];
    return getActiveRouteName(nestedRoute);
  }
  return route.name;
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
const currentRoute = state.routes[state.index];
const activeRouteName = getActiveRouteName(currentRoute);
console.log("activeRouteName", activeRouteName);

if (activeRouteName === "NewNote" || activeRouteName === "Setting") {
  return null;
}

  console.log('activeRouteName', activeRouteName);

  if (activeRouteName === "NewNote" || activeRouteName === "Setting") {
    return null;
  }

  return (
    <LinearGradient
      colors={["#1C0B37", "#1D0837"]}
      style={styles.gradientBg}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          let iconXml = "";
          if (route.name === "Home") {
            iconXml = isFocused ? home_active : home;
          } else if (route.name === "NewNote") {
            iconXml = plus;
          } else if (route.name === "Summary") {
            iconXml = isFocused ? summary_active : summary;
          }

          const onPress = () => navigation.navigate(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
            >
              <SvgXml xml={iconXml} />
              {route.name !== "NewNote" && (
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? Colors.pink : Colors.gray },
                  ]}
                >
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const RootNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: route.name === "NewNote" ? { display: "none" } : {},
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="NewNote" component={NewNoteScreen} />
      <Tab.Screen name="Summary" component={SummaryStack} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default RootNavigator;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: verticalScale(100),
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    overflow: "hidden",
    paddingTop: scale(19),
    justifyContent: "space-around",
    paddingHorizontal:scale(50)
  },
  gradientBg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: verticalScale(100),
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabLabel: {
    fontSize: Fonts.size.tiny,
    fontFamily: "PingFang SC",
    fontWeight: Fonts.weight.medium,
    marginTop: scale(6),
    textAlign: "center",
  },
});
