import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../../../theme";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { WebView } from "react-native-webview";
import Pdf from "react-native-pdf";

export default function AddResume() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [pickedDocument, setPickedDocument] = useState(null);
  const [resumeExist, setResumeExist] = useState("");
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    // Request permission to pick images
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();

    const getExistingResume = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const resumeURL = userDocSnap.data()?.resumeURL;
        }
      } catch (error) {
        console.error("Error fetching existing resume:", error);
      }
    };

    getExistingResume();
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

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result && result.assets && result.assets.length > 0) {
      setPickedDocument(result);
      await uploadDocumentToFirebase(
        result.assets[0].uri,
        result.assets[0].name
      );
    } else {
      Alert.alert("Document not picked", "Please select a document.");
    }
  };

  const uploadDocumentToFirebase = async (documentUri, documentName) => {
    try {
      const response = await fetch(documentUri);
      const blob = await response.blob();

      // Create a storage reference with the desired path
      const storageRef = ref(storage, `documents/${documentName}`);

      uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "users", `${userId}`);
      const userDocSnap = await getDoc(userDocRef);

      setResumeExist(userDocSnap.data()?.resumeURL);

      if (userDocSnap.exists()) {
        await setDoc(
          userDocRef,
          {
            resumeURL: downloadURL,
          },
          { merge: true }
        );
      }

      Alert.alert(
        "Document Uploaded",
        "The document has been successfully uploaded to Firebase Storage."
      );
    } catch (error) {
      console.error("Error uploading document to Firebase Storage:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {resumeExist !== "" ? (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text
              style={{ fontSize: 20, fontWeight: 700, paddingHorizontal: 30 }}
            >
              Your Resume
            </Text>
            <Pdf
              source={resumeExist}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={{
                flex: 1,
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: theme.highlightColor,
                paddingVertical: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Add New Resume
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View>
              <TouchableOpacity>
                <ChevronLeftIcon color={theme.primaryColor} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => pickDocument()}
                style={{
                  backgroundColor: theme.highlightColor,
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Pick Resume
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
