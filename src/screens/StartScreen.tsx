import React, { useCallback, useEffect } from "react";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import moment from "moment";
import { View } from "react-native";

export default () => {
  const progress = useSharedValue(0);
  const delayedProgress = useSharedValue(0);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "StartScreen">>();

  useFocusEffect(
    useCallback(() => {
      progress.value = withTiming(1, {
        duration: 500,
        easing: Easing.in(Easing.linear),
      });
      delayedProgress.value = withDelay(
        100,
        withTiming(1, {
          duration: 500,
          easing: Easing.in(Easing.linear),
        })
      );
    }, [])
  );

  const animatedHeader = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [-100, 0]) },
      ],
    };
  });
  const animatedCard = useAnimatedStyle(() => {
    return {
      opacity: interpolate(delayedProgress.value, [0, 0.2, 1], [0, 0, 1]),
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [100, 0]) },
        { rotate: "-7deg" },
        { scale: interpolate(progress.value, [0, 1], [0.8, 1]) },
      ],
    };
  });
  const animatedButton = useAnimatedStyle(() => {
    return {
      opacity: interpolate(delayedProgress.value, [0, 0.2, 1], [0, 0, 1]),
      transform: [
        { translateX: interpolate(delayedProgress.value, [0, 1], [100, 0]) },
        { rotate: "5deg" },
        { scale: interpolate(delayedProgress.value, [0, 1], [0.8, 1]) },
      ],
    };
  });

  return (
    <SafeAreaView style={{ backgroundColor: colors.BLACK, flex: 1 }}>
      <Animated.Text
        style={[
          {
            color: colors.WHITE,
            fontSize: 60,
            lineHeight: 60,
            paddingLeft: 30,
            width: "70%",
          },
          animatedHeader,
        ]}
      >
        Your Task manager sucks:)
      </Animated.Text>
      <View style={{ paddingTop: 40 }}>
        <Card
          style={[{ right: -200 }, animatedCard]}
          title="Yes created all notes on same day 😄"
          date={moment().toISOString()}
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur distinctio nobis dolor in tempora consequatur reiciendis consequuntur."
        />
        <Card
          style={[{ right: -200, zIndex: 1 }, animatedButton]}
          type="task"
          title="Click me to start"
          description="The best day to start something. The best day to start something"
          onPress={() => {
            progress.value = withTiming(0, {
              duration: 500,
              easing: Easing.in(Easing.linear),
            });
            delayedProgress.value = withDelay(
              100,
              withTiming(0, {
                duration: 500,
                easing: Easing.in(Easing.linear),
              })
            );
            navigation.navigate("ListScreen");
          }}
        />
        <Card
          style={[{ right: -200, top: -30 }, animatedCard]}
          title="Yes created all notes on same day 😄"
          date={moment().toISOString()}
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur distinctio nobis dolor in tempora consequatur reiciendis consequuntur."
        />
      </View>
    </SafeAreaView>
  );
};
