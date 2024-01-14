import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../../theme";

export default function AllCandidates({ candidateList }) {
  return (
    <View>
      {candidateList.map((data, index) => {
        return (
          <TouchableOpacity
            onPress={() => console.log(data)}
            key={index}
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
              padding: 15,
              borderRadius: 10,
              marginVertical: 10,
              width: "100%",
              backgroundColor: theme.extraLightBackground,
            }}
          >
            <View style={{ width: "20%" }}>
              <Image
                source={{ uri: data.profileImage }}
                style={{
                  width: "100%",
                  height: 65,
                  objectFit: "cover",
                  borderRadius: 100,
                }}
              />
            </View>
            <View style={{ gap: 5, width: "80%" }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                {data.username}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 600 }}>
                {data.candidateRole}
              </Text>
              <Text
                style={{
                  width: "100%",
                  lineHeight: 22,
                }}
              >
                {data.skills}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
