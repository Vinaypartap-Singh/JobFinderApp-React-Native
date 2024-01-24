import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  NativeModules,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function ViewJobInfo({ route }) {
  const navigation = useNavigation();
  const jobInfo = route.params;
  const [candidateInfo, setCandidateInfo] = useState(null);
  // A reference to access recruiter information who posted the job
  //   console.log(jobInfo.recruiterInfo.recruiterEmail);
  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    const getCandidateInfo = async () => {
      const candidateDocRef = doc(db, "users", `${auth.currentUser.uid}`);
      const candidateDocSnap = await getDoc(candidateDocRef);

      if (candidateDocSnap.exists()) {
        setCandidateInfo(candidateDocSnap.data());
      }
    };

    getCandidateInfo();
  }, []);

  const addDataToCandidate = async () => {
    console.log("Function Executed");
    const candidateDocRef2 = doc(db, "users", `${auth.currentUser.uid}`);
    const candidateDocSnap2 = await getDoc(candidateDocRef2);

    if (candidateDocSnap2.exists()) {
      try {
        const existingAppliedJobs = candidateDocSnap2.data().appliedJobs || [];

        existingAppliedJobs.push(jobInfo);

        await setDoc(
          candidateDocRef2,
          {
            jobApplied: existingAppliedJobs,
          },
          { merge: true }
        );
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
    }
  };

  const applyJob = async () => {
    // Implement Get Recruiter Information Here and push candidate info to recruiter profile in a variable named candidateApplied: {candidateInfoHere}

    const recuriterDocRef = doc(
      db,
      "users",
      `${jobInfo.recruiterInfo.recruiterId}`
    );
    const recruiterDocSnap = await getDoc(recuriterDocRef);

    if (recruiterDocSnap.exists()) {
      try {
        const existingCandidates =
          recruiterDocSnap.data().candidatesApplied || [];

        existingCandidates.push(candidateInfo);

        await setDoc(
          recuriterDocRef,
          {
            candidatesApplied: existingCandidates,
          },
          { merge: true }
        );

        // Add Job Applied Data to Candidate Profile Also
        await addDataToCandidate();

        Alert.alert("Job Applied", "Your request has been sent to recruiter", [
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
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      {jobInfo ? (
        <View
          style={{
            marginTop:
              Platform.OS === "android" ? StatusBarManager.HEIGHT + 20 : 0,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color={theme.primaryColor} />
          </TouchableOpacity>

          {/* Job Info Code */}
          <View style={{ marginTop: 20, gap: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>
              Company: {jobInfo.companyName}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{jobInfo.jobTitle}</Text>
              <Text>{jobInfo.jobType}</Text>
            </View>
            <Text style={{ lineHeight: 20 }}>
              Job Description: {jobInfo.jobDescription}
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Skills: {jobInfo.requiredSkills}
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Application Instructions: {jobInfo.applicationIntruction}
            </Text>
            <Text>Application Deadline: {jobInfo.applicationDeadline}</Text>
            <Text>Location: {jobInfo.location}</Text>
            <Text>Salary: {jobInfo.salary}</Text>
            <Text style={{ fontWeight: 700, fontSize: 20, marginTop: 20 }}>
              Contact Information
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Address: {jobInfo.contactInformation}
            </Text>

            <TouchableOpacity
              onPress={applyJob}
              style={{
                backgroundColor: theme.primaryColor,
                paddingVertical: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: theme.whiteColor,
                  fontWeight: 700,
                }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ActivityIndicator size={"large"} color={theme.highlightColor} />
        </View>
      )}
    </ScrollView>
  );
}
