import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../theme";
import { BriefcaseIcon } from "react-native-heroicons/solid";
import { auth, db } from "../../firebase";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function AddJob() {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [applicationIntruction, setApplicationIntruction] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const jobs = [];

  const jobInfo = {
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    companyName: companyName,
    location: location,
    jobType: jobType,
    salary: salary,
    applicationDeadline: applicationDeadline,
    requiredSkills: requiredSkills,
    applicationIntruction: applicationIntruction,
    contactInformation: contactInformation,
    postedAt: new Date().toISOString(),
  };

  const postJob = async () => {
    if (
      jobTitle === "" ||
      jobDescription === "" ||
      companyName === "" ||
      location === "" ||
      jobType === "" ||
      salary === "" ||
      applicationDeadline === "" ||
      requiredSkills === "" ||
      applicationIntruction === "" ||
      contactInformation === ""
    ) {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to post the job.",
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
      // Doc Reference for jobs

      const currentUserEmail = auth.currentUser.email;

      const jobDocRef = doc(db, "posts", `${currentUserEmail}`);
      const jobDocSnap = await getDoc(jobDocRef);
      const existingJobsRef = jobDocSnap.data()?.jobs || [];

      existingJobsRef.push(jobInfo);

      await setDoc(
        jobDocRef,
        {
          jobs: existingJobsRef,
        },
        { merge: true }
      );

      Alert.alert("Job Added", "Your job has been posted successfully.", [
        {
          text: "Ok",
          style: "default",
          onPress: () => navigation.navigate("RecruiterProfile"),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <View>
        <Text style={{ fontSize: 26, fontWeight: 700 }}>
          <BriefcaseIcon color={theme.highlightColor} size={26} /> Post a Job
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Job Title"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setJobTitle(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Job Description"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setJobDescription(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Company Name"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setCompanyName(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Location"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Job Type"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setJobType(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Salary or Compensation"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setSalary(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Application Deadline"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setApplicationDeadline(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Required Skills"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setRequiredSkills(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Application Instructions"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setApplicationIntruction(text)}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Contact Information"
            placeholderTextColor={theme.textInputColor}
            onChangeText={(text) => setContactInformation(text)}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={postJob}
        style={{
          backgroundColor: theme.highlightColor,
          marginTop: 40,
          paddingVertical: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Post Job
        </Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 50 }}></View>
    </ScrollView>
  );
}
