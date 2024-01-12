import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function LookFor() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          What are you looking for ?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterRecruiter")}
          style={{
            backgroundColor: "black",
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Want to Hire Candidate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterFreelancer")}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 10,
            marginTop: 20,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Want To Get Job
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
