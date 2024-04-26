import React from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import colors from "../theme/colors";
import moment from "moment";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface BaseCardProps {
  type?: "task" | "note" | "reminder";
  onPress?: () => void;
  title: string;
  date?: string;
  description?: string;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const backgroundColors: {
  [key: string]: (typeof colors)[keyof typeof colors];
} = {
  task: colors.PURPLE,
  note: colors.WHITE,
  reminder: colors.BLACK,
};

const textColors: {
  [key: string]: (typeof colors)[keyof typeof colors];
} = {
  task: colors.WHITE,
  note: colors.BLACK,
  reminder: colors.WHITE,
};

const bodyColor: {
  [key: string]: (typeof colors)[keyof typeof colors];
} = {
  task: colors.LIGHTGRAY,
  note: colors.GRAY,
  reminder: colors.GRAY,
};

const BaseCard = ({
  type = "note",
  onPress,
  title,
  date,
  description,
  style,
}: BaseCardProps) => {
  return (
    <AnimatedPressable onPress={onPress} style={style}>
      <View
        style={{
          width: width - 60,
          borderRadius: 20,
          backgroundColor: backgroundColors[type],
          padding: 20,
          overflow: "hidden",
          maxHeight: 150,
        }}
      >
        <Text
          numberOfLines={2}
          style={{ color: textColors[type], fontSize: 18 }}
        >
          {title}
        </Text>
        {date ? (
          <Text
            style={{ color: bodyColor[type], paddingTop: 10, fontSize: 12 }}
          >
            {moment(date).format("Do MMM YYYY")}
          </Text>
        ) : null}
        <Text style={{ color: bodyColor[type], paddingTop: 10 }}>
          {description}
        </Text>
        <LinearGradient
          colors={[backgroundColors[type], backgroundColors[type] + "00"]}
          locations={[0.1, 0.7]}
          style={{
            position: "absolute",
            height: 50,
            bottom: 0,
            transform: [{ rotate: "180deg" }],
            width,
          }}
        />
      </View>
    </AnimatedPressable>
  );
};

interface CardProps {
  withShadow?: boolean;
}

export default ({
  withShadow = false,
  ...props
}: CardProps & BaseCardProps) => {
  if (withShadow)
    return (
      <View
        style={{
          shadowColor: colors.BLACK,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
      >
        <BaseCard {...props} />
      </View>
    );
  return <BaseCard {...props} />;
};
