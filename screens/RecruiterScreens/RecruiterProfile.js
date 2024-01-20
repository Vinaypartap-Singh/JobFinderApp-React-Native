import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { theme } from "../../theme";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";

export default function RecruiterProfile() {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const userEmail = auth.currentUser.email;
  const [userProfile, setUserProfile] = useState(null);
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUserInfo = async () => {
      const docRef = doc(db, "users", `${userId}`);
      const realTimeProfile = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
          setLoading(false);
        }
      });
    };

    getUserInfo();

    const getRecruiterJobs = async () => {
      const docRef = doc(db, "posts", `${userEmail}`);

      const realTimeJobUpdate = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists) {
          setRecruiterJobs(docSnap.data()?.jobs);
        }
      });
    };

    getRecruiterJobs();
  }, []);

  const handleDeleteJob = async (index) => {
    try {
      const userEmail = auth.currentUser.email;
      const docRef = doc(db, "posts", `${userEmail}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingJobs = docSnap.data()?.jobs || [];

        // Remove the job at the specified index
        existingJobs.splice(index, 1);

        // Update the document with the modified jobs array
        await setDoc(
          docRef,
          {
            jobs: existingJobs,
          },
          { merge: true }
        );

        // Optional: You can update the local state as well
        setRecruiterJobs(existingJobs);

        Alert.alert("Job Deleted", "Your job has been deleted successfully.", [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.primaryColor} size={"large"} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {userProfile ? (
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <HomeIcon color={theme.primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    signOut(auth).then(() => navigation.navigate("LookingFor"))
                  }
                >
                  <ArrowRightStartOnRectangleIcon color={theme.primaryColor} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 20,
                  // flexDirection: "row",
                  gap: 10,
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: userProfile.profileImage }}
                    style={{ width: 120, height: 120, borderRadius: 500 }}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {userProfile.username}
                  </Text>
                  <Text style={{ textAlign: "center", fontWeight: 600 }}>
                    {userProfile.email}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {userProfile.recruiterRole}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 5,
                      width: "48%",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Update Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("UpdateRecruiterProfile")
                    }
                    style={{
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 5,
                      width: "48%",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      Change Profile Image
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Show Jobs By Recruiter */}

              {recruiterJobs?.length > 0 ? (
                <View style={{ gap: 20, marginTop: 30 }}>
                  <Text style={{ fontSize: 20, fontWeight: 700 }}>
                    Your Jobs
                  </Text>
                  {recruiterJobs.map((data, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: theme.extraLightBackground,
                          paddingVertical: 10,
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          gap: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 600,
                            fontSize: 18,
                            marginTop: 10,
                          }}
                        >
                          Company: {data.companyName}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              color: theme.lightColor,
                            }}
                          >
                            {data.jobTitle}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              color: theme.lightColor,
                            }}
                          >
                            {data.jobType}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: theme.lightColor,
                            lineHeight: 30,
                          }}
                        >
                          Job Description: {data.jobDescription}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: theme.lightColor,
                          }}
                        >
                          Skills: {data.requiredSkills}
                        </Text>

                        {/* <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              color: theme.lightColor,
                            }}
                          >
                            Salary: {data.salary}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 400,
                              fontSize: 16,
                              color: theme.lightColor,
                            }}
                          >
                            Deadline: {data.applicationDeadline}
                          </Text>
                        </View> */}

                        {/* <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: theme.lightColor,
                          }}
                        >
                          Instrctions: {data.applicationIntruction}
                        </Text> */}

                        {/* <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: theme.lightColor,
                          }}
                        >
                          Contact: {data.contactInformation}
                        </Text> */}

                        <TouchableOpacity
                          onPress={() => handleDeleteJob(index)}
                          style={{
                            padding: 10,
                            borderRadius: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "red", fontWeight: "bold" }}>
                            Delete Job
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={{ gap: 10 }}>
                  <View
                    style={{
                      backgroundColor: theme.alertColor,
                      marginTop: 30,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 30,
                      }}
                    >
                      <Text style={{ color: theme.alertIconColor }}>
                        You have not posted any job.
                      </Text>
                      <XCircleIcon color={theme.alertIconColor} />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AddJob")}
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
                      Post a Job
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}
