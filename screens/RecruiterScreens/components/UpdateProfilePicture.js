import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function UpdateProfilePicture() {
  const navigation = useNavigation();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const imagePicker = async () => {
    // Check if permission is granted before attempting to pick an image
    if (hasGalleryPermission !== true) {
      Alert.alert(
        "Permission Denied",
        "Please grant access to your gallery to pick an image."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePictureURL(result.assets[0].uri);
        uploadImageToFirebase(result.assets[0].uri, result.assets[0].fileName);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const uploadImageToFirebase = async (uri, fileName) => {
    const storageRef = ref(storage, `images/${fileName}`);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setProfilePictureURL(downloadURL);

      console.log("Image uploaded successfully:", downloadURL);

      const currUser = auth.currentUser.uid;

      const userDocRef = doc(db, "users", `${currUser}`);

      await setDoc(
        userDocRef,
        {
          profileImage: downloadURL,
        },
        { merge: true }
      );
      navigation.goBack();
      Alert.alert(
        "Profile Picture Uploaded",
        "Your new picture has been uploaded to database",
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
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color={theme.primaryColor} />
      </TouchableOpacity>
      {profilePictureURL ? (
        <View>
          <Image
            source={{ uri: profilePictureURL }}
            style={{ width: 120, height: 120, borderRadius: 500 }}
          />
        </View>
      ) : (
        <View style={{ gap: 20, marginTop: 20 }}>
          <Text>Choose an Image From Gallery To Continue</Text>
          <TouchableOpacity
            onPress={imagePicker}
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
              Pick Image
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
