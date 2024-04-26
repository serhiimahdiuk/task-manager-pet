import * as React from "react";
import { View, Dimensions } from "react-native";
import {
  Easing,
  interpolate,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Card from "../../components/Card";
import Header, { HEADER_HEIGHT } from "../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CarouselOverlay from "./CarouselOverlay";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Title, { TITLE_HEIGHT } from "./Title";
import { fakeData } from "../../utils/fakeData";
import { RootStackParamList } from "../../navigation";

const window = Dimensions.get("window");
const ITEM_WIDTH = window.width - 60;
const ITEM_HEIGHT = 150;

const PAGE_HEIGHT = window.height;
const PAGE_WIDTH = window.width;

export default () => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const scrollOffset = useSharedValue(0);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "ListScreen">>();

  const carouselRef = React.useRef<ICarouselInstance>(null);

  useFocusEffect(
    React.useCallback(() => {
      carouselRef.current?.scrollTo({ index: 0, animated: true });
      progress.value = withTiming(1, {
        duration: 500,
        easing: Easing.in(Easing.linear),
      });
    }, [])
  );

  React.useEffect(() => {
    scrollOffset.value = 1000;
  }, []);

  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const translateY = interpolate(
      value,
      [-1, 0, 1],
      [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
    );
    const right = interpolate(value, [-1, 0, 1], [-20, 0, -20]);

    return {
      transform: [{ translateY }],
      right,
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header animatedValue={progress} />
      <Title animatedValue={progress} />
      <Carousel
        ref={carouselRef}
        loop={false}
        vertical
        style={{
          justifyContent: "center",
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT - insets.top - HEADER_HEIGHT - TITLE_HEIGHT,
        }}
        width={ITEM_WIDTH}
        pagingEnabled={false}
        height={ITEM_HEIGHT}
        defaultScrollOffsetValue={scrollOffset}
        withAnimation={{
          type: "spring",
          config: { damping: 14, mass: 1, stiffness: 100 },
        }}
        data={fakeData}
        renderItem={({ item, index }) => {
          return (
            <Card
              withShadow
              type={index % 2 ? "note" : "task"}
              style={[
                {
                  transform: [{ rotate: index % 2 ? "5deg" : "-5deg" }],
                },
              ]}
              onPress={() => {
                navigation.navigate("DetailsScreen", { item });
                progress.value = withTiming(0, { duration: 500 });
                scrollOffset.value = withTiming(1000, { duration: 500 });
              }}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          );
        }}
        customAnimation={animationStyle}
      />
      <CarouselOverlay
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT - insets.top - HEADER_HEIGHT - TITLE_HEIGHT}
      />
    </View>
  );
};
