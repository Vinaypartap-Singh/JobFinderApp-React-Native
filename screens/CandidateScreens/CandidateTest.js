import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function CandidateTest() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => signOut(auth).then(() => navigation.navigate("Login"))}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 30,
            gap: 10,
            alignItems: "center",
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 18,
              color: "white",
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
