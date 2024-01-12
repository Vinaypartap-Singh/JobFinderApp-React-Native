import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = () => {
    if (email === "" || password.length < 10) {
      Alert.alert("Invalid Details", "Please fill all the details carefully.", [
        {
          text: "Ok",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert(
        "Login Success",
        "Your account has been logged in successfully",
        [
          {
            text: "Ok",
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 18 }}>
          Login To Continue
        </Text>
      </View>

      <View style={{ marginTop: 20, gap: 20 }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <EnvelopeIcon size={25} color={"black"} />
          <TextInput
            placeholder="Email Address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <LockClosedIcon size={25} color={"black"} />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={logInUser}
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "black", fontWeight: 500, fontSize: 17 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontWeight: 700, fontSize: 17 }}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
