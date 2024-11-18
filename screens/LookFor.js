import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { theme } from "../theme";
import { doc, getDoc } from "firebase/firestore";

export default function LookFor() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const curUserDocRef = doc(db, "users", `${currentUser.uid}`);
        try {
          const userDocSnap = await getDoc(curUserDocRef);
          if (userDocSnap.exists()) {
            const subdata = userDocSnap.data();
            if (subdata.isCandidate === true) {
              navigation.replace("CandidateHome");
            } else if (subdata.isRecruiter === true) {
              navigation.replace("RecruiterDashboard");
            } else {
              navigation.replace("Login");
            }
          }
        } catch (error) {
          Alert.alert("Error Occured", error, [
            {
              text: "Ok",
              style: "default",
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        }
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <View>
          <ActivityIndicator size={"large"} color={theme.highlightColor} />
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Loading.....
          </Text>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            What are you looking for ?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("RegisterRecruiter")}
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
            onPress={() => navigation.replace("RegisterFreelancer")}
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

          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              borderRadius: 10,
              marginTop: 20,
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
