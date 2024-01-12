import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterRecruiter() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    if (
      username === "" ||
      email === "" ||
      phone === "" ||
      phone.length < 10 ||
      companyName == "" ||
      address === "" ||
      password === ""
    ) {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continue",
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
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          const uid = user.uid;

          setDoc(doc(db, "users", `${uid}`), {
            username: username,
            email: email,
            phone: phone,
            companyName: companyName,
            address: address,
            password: password,
            isRecruiter: true,
          });

          Alert.alert(
            "Registration Success",
            "Your Recruiter Account has been created successfully",
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
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    }
  };

  return (
    <View style={{ flex: 1, paddingVertical: 30, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            gap: 30,
            backgroundColor: "white",
          }}
        >
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: 700, fontSize: 18 }}
            >
              Create New Account
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
              alignItems: "center",
              gap: 10,
            }}
          >
            <UserIcon size={25} color={"black"} />
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
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
              paddingHorizontal: 20,
              alignItems: "center",
              gap: 10,
            }}
          >
            <PhoneIcon size={25} color={"black"} />
            <TextInput
              placeholder="Contact"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
              alignItems: "center",
              gap: 10,
            }}
          >
            <BuildingOfficeIcon size={25} color={"black"} />
            <TextInput
              placeholder="Company Name"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setCompanyName(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
              alignItems: "center",
              gap: 10,
            }}
          >
            <HomeIcon size={25} color={"black"} />
            <TextInput
              placeholder="Address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              gap: 10,
            }}
          >
            <LockClosedIcon size={25} color={"black"} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            onPress={registerUser}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 20,
              flexDirection: "row",
              paddingHorizontal: 20,
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
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "black", fontWeight: 500, fontSize: 17 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: 700, fontSize: 17 }}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
