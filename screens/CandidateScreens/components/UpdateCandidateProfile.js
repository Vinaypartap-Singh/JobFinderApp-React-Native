import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  ChevronLeftIcon,
  EnvelopeIcon,
  MapIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";

export default function UpdateCandidateProfile() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");

  const UpdateProfile = async () => {
    const userId = auth.currentUser.uid;

    const userDocRef = doc(db, "users", `${userId}`);

    if (username !== "") {
      await setDoc(
        userDocRef,
        {
          username: username,
        },
        { merge: true }
      );

      Alert.alert("Username", "Your username has been updated.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    } else if (address !== "") {
      await setDoc(
        userDocRef,
        {
          address: address,
        },
        { merge: true }
      );

      Alert.alert("Address", "Your Address has been updated.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    } else if (email !== "") {
      await setDoc(
        userDocRef,
        {
          email: email,
        },
        { merge: true }
      );
      Alert.alert("Email", "Your Email has been updated.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    } else if (skills !== "") {
      await setDoc(
        userDocRef,
        {
          skills: skills,
        },
        { merge: true }
      );
      Alert.alert("Skills", "Your Skills has been updated.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    } else if (phone !== "" && phone.length >= 10) {
      await setDoc(
        userDocRef,
        {
          phone: phone,
        },
        { merge: true }
      );
      Alert.alert("Phone", "Your Phone has been updated.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    } else {
      Alert.alert("Inavlid Details", "Please Provide All Details To Update", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      >
        <ChevronLeftIcon color={theme.highlightColor} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 22,
          fontWeight: 500,
          paddingVertical: 20,
        }}
      >
        UpdateProfile
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 30 }}>
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <UserIcon color={theme.highlightColor} />
            <TextInput
              placeholder="New Username"
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <MapIcon color={theme.highlightColor} />
            <TextInput
              placeholder="New Address"
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <EnvelopeIcon color={theme.highlightColor} />
            <TextInput
              placeholder="New Email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <AcademicCapIcon color={theme.highlightColor} />
            <TextInput
              placeholder="Skills"
              onChangeText={(text) => setSkills(text)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <PhoneIcon color={theme.highlightColor} />
            <TextInput
              placeholder="New Phone"
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <TouchableOpacity
            onPress={UpdateProfile}
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
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
