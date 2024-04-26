import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

interface Props {
  width: number;
  height: number;
}

export default ({ width, height }: Props) => {
  return (
    <View
      style={{
        width,
        height,
        position: "absolute",
        pointerEvents: "none",
        justifyContent: "space-between",
        bottom: 0,
      }}
    >
      <LinearGradient
        colors={["rgb(242, 242, 242)", "rgba(242, 242, 242, 0)"]}
        locations={[0.1, 0.7]}
        style={{
          height: height * 0.1,
          top: 0,
          width,
        }}
      />
      <LinearGradient
        colors={["rgb(242, 242, 242)", "rgba(242, 242, 242, 0)"]}
        locations={[0.1, 0.7]}
        style={{
          height: height * 0.1,
          bottom: 0,
          transform: [{ rotate: "180deg" }],
          width,
        }}
      />
    </View>
  );
};
