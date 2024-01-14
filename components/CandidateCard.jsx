import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function CandidateCard({ candidateList }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Freelancer's</Text>
        <TouchableOpacity
          style={{ marginTop: 5 }}
          onPress={() => navigation.navigate("ViewCandidate")}
        >
          <Text
            style={{
              fontWeight: 700,
              textDecorationLine: "underline",
              color: "red",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizonatal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
      >
        {candidateList.slice(0, 5).map((user, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 20,
                backgroundColor: theme.lightBackgroundColor,
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <View>
                <Image
                  source={{ uri: user.profileImage }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              </View>
              <View>
                <Text
                  style={{ fontWeight: 600, marginTop: 8, textAlign: "center" }}
                >
                  {user.username}
                </Text>

                <Text
                  style={{ fontWeight: 600, marginTop: 8, textAlign: "center" }}
                >
                  {user.candidateRole}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
