import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

export const TITLE_HEIGHT = 50;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  animatedValue: SharedValue<number>;
}

export default ({ animatedValue }: Props) => {
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        {
          translateX: interpolate(animatedValue.value, [0, 1], [-50, 0]),
        },
      ],
    };
  });
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        {
          translateX: interpolate(animatedValue.value, [0, 1], [50, 0]),
        },
      ],
    };
  });
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        height: TITLE_HEIGHT,
      }}
    >
      <Animated.Text style={[{ fontSize: 40 }, textAnimatedStyle]}>
        Your Tasks
      </Animated.Text>
      <AnimatedPressable onPress={() => {}} style={buttonAnimatedStyle}>
        <View
          style={{
            height: TITLE_HEIGHT,
            width: TITLE_HEIGHT,
            borderRadius: 8,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add" size={30} />
        </View>
      </AnimatedPressable>
    </View>
  );
};
