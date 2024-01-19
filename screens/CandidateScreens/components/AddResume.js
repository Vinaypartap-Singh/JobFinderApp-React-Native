import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function AddResume() {
  console.log(storage.ref);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [pickedDocument, setPickedDocument] = useState(null);

  useEffect(() => {
    // Request permission to pick images
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
        {image ? (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text
              style={{ fontSize: 20, fontWeight: 700, paddingHorizontal: 30 }}
            >
              Your Resume
            </Text>
            <Image
              source={{ uri: image }}
              style={{ flex: 1 / 2, aspectRatio: 4 / 3 }}
            />
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
