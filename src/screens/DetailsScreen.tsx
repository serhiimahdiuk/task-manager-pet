import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderContainer } from "../components/Header";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import colors from "../theme/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "DetailsScreen">>();
  const {
    params: { item },
  } = useRoute<RouteProp<RootStackParamList, "DetailsScreen">>();

  const progress = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      progress.value = withTiming(1, {
        duration: 400,
        easing: Easing.in(Easing.linear),
      });
    }, [])
  );

  const fromLeft = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [-100, 0]),
        },
      ],
    };
  });

  const fromRight = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [100, 0]),
        },
      ],
    };
  });

  const fromBottom = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [400, 0]),
        },
      ],
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.BLACK }}>
      <HeaderContainer>
        <AnimatedPressable
          onPress={() => {
            navigation.goBack();
            progress.value = withTiming(0, {
              duration: 400,
              easing: Easing.in(Easing.linear),
            });
          }}
          style={fromLeft}
        >
          <Ionicons size={20} name={"arrow-back"} color={colors.WHITE} />
        </AnimatedPressable>
        <Animated.View
          style={[
            {
              height: 30,
              width: 30,
              borderRadius: 6,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: colors.WHITE,
            },
            fromRight,
          ]}
        >
          <Ionicons size={20} name={"add"} color={colors.WHITE} />
        </Animated.View>
      </HeaderContainer>
      <Animated.Text
        style={[
          {
            fontSize: 40,
            color: colors.WHITE,
            paddingHorizontal: 20,
            paddingBottom: 20,
          },
          fromLeft,
        ]}
      >
        {item.title}
      </Animated.Text>
      <Animated.View
        style={[{ backgroundColor: colors.WHITE, flex: 1 }, fromBottom]}
      >
        <Text style={{ padding: 20, color: colors.GRAY }}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};
