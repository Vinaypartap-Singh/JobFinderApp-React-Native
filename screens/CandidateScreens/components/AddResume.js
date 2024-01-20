import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme";
import * as DocumentPicker from "expo-document-picker";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function AddResume() {
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [existingResume, setExistingResume] = useState(false);
  const [existingResumeURL, setExistingResumeURL] = useState("");
  const currentUser = auth.currentUser.uid;

  useEffect(() => {
    const getExistingResumeInfo = async () => {
      const userDocRef = doc(db, "users", `${currentUser}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        if (userDocSnap.data()?.resumeURL) {
          setExistingResume(true);
          setExistingResumeURL(userDocSnap.data().resumeURL);
          Alert.alert(
            "Exising Resume",
            "We Have found an existing resume in your account.",
            [
              {
                text: "OK",
                style: "default",
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        } else {
          setExistingResume(false);
          Alert.alert(
            "Upload Resume",
            "You can choose a pdf file to add your resume.",
            [
              {
                text: "OK",
                style: "default",
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }
      }
    };

    getExistingResumeInfo();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result) {
        setSelectedDocument(result);
        const documentName = selectedDocument.assets[0].name;
        const documentPdf = selectedDocument.assets[0].uri;

        await uploadDocumentToFirebase(documentPdf, documentName);
      } else {
        setSelectedDocument(null);
      }
    } catch (error) {
      Alert.alert("Error", error, [
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

  const openURLInBrowser = () => {
    // Replace 'https://example.com' with the URL you want to open
    const url = existingResumeURL;

    Linking.openURL(url)
      .then(() => console.log(`Opened URL: ${url}`))
      .catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      {existingResume ? (
        <View style={{ paddingHorizontal: 20, gap: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            Resume Already Exsit
          </Text>
          <Button title="Open URL in Browser" onPress={openURLInBrowser} />

          <TouchableOpacity
            onPress={pickDocument}
            style={{
              backgroundColor: theme.highlightColor,
              paddingVertical: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Add New Resume
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20, gap: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Add Resume</Text>
          <TouchableOpacity
            onPress={pickDocument}
            style={{
              backgroundColor: theme.highlightColor,
              paddingVertical: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Add Resume
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
