import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (authuser) => {
      if (!authuser) {
        setLoading(false);
      }

      if (authuser) {
        const docRef = doc(db, "users", `${authuser.uid}`);

        try {
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const sub = docSnapshot.data();

            if (sub.isRecruiter === true) {
              navigation.replace("RecruiterDashboard");
            } else if (sub.isCandidate === true) {
              navigation.replace("CandidateHome");
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
      }
    });

    return unsubscribe;
  }, []);

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
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
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
      }}
    >
      {loading ? (
        <View>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ textAlign: "center", fontWeight: 700, fontSize: 18 }}
            >
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
              <TouchableOpacity
                onPress={() => navigation.navigate("LookingFor")}
              >
                <Text style={{ fontWeight: 700, fontSize: 17 }}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
