import React, { useCallback } from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { faker } from "@faker-js/faker";
import Animated, {
  AnimatedStyle,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const HEADER_HEIGHT = 50;

interface Props {
  animatedValue: SharedValue<number>;
}

interface HeaderContainerProps {
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const HeaderContainer = ({
  animatedStyle,
  children,
}: React.PropsWithChildren<HeaderContainerProps>) => {
  return (
    <SafeAreaView edges={["top"]}>
      <Animated.View
        style={[
          {
            height: HEADER_HEIGHT,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {children}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ({ animatedValue }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [0.4, 1], [0, 1]),
      transform: [
        { translateY: interpolate(animatedValue.value, [0, 1], [-100, 0]) },
      ],
    };
  });

  return (
    <HeaderContainer animatedStyle={animatedStyle}>
      <View>
        <Image
          source={{ uri: faker.image.avatar() }}
          style={{ height: 30, width: 30, borderRadius: 15 }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Ionicons name="search" size={20} />
        <Ionicons
          name="notifications-outline"
          size={20}
          style={{ paddingLeft: 20 }}
        />
      </View>
    </HeaderContainer>
  );
};
