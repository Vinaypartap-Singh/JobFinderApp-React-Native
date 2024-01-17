import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  UserIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
} from "react-native-heroicons/outline";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function AddProject() {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const [projectTitle, setProjectTitle] = useState("");
  const [dateOfCompletion, setDateOfCompletion] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [role, setRole] = useState("");
  const [technologyUsed, setTechnologyUsed] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [challangesAndSolution, setChallangesAndSolution] = useState("");
  const [achievement, setAchievement] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [relevanceOfJobs, setRelevanceOfJobs] = useState("");

  const projectInfo = {
    projectTitle: projectTitle,
    dateOfCompletion: dateOfCompletion,
    projectDescription: projectDescription,
    role: role,
    technologyUsed: technologyUsed,
    teamSize: teamSize,
    challangesAndSolution: challangesAndSolution,
    achievement: achievement,
    projectURL: projectURL,
    relevanceOfJobs: relevanceOfJobs,
  };

  const addProjectData = async () => {
    if (
      projectTitle === "" ||
      dateOfCompletion === "" ||
      projectDescription === "" ||
      role === "" ||
      technologyUsed === "" ||
      teamSize === "" ||
      challangesAndSolution === "" ||
      achievement === "" ||
      projectURL === "" ||
      relevanceOfJobs === ""
    ) {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continue",
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
      const userDocRef = doc(db, "users", `${userId}`);
      const userDocSnap = await getDoc(userDocRef);
      const existingProjects = userDocSnap.data()?.projects || [];

      existingProjects.push(projectInfo);

      await setDoc(userDocRef, { projects: existingProjects }, { merge: true });

      Alert.alert("Project Added", "Your Project has been added", [
        {
          text: "Ok",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);

      navigation.navigate("CandidateHome");
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingTop: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.replace("CandidateHome")}>
          <ChevronLeftIcon color={theme.highlightColor} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Add Project</Text>
      </View>

      <View style={{ marginTop: 30, gap: 30 }}>
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
          <BriefcaseIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Project Title"
            onChangeText={(text) => setProjectTitle(text)}
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
          <CalendarIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Date Of Completion"
            onChangeText={(text) => setDateOfCompletion(text)}
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
          <ChatBubbleBottomCenterIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Project Description"
            onChangeText={(text) => setProjectDescription(text)}
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
          <UserIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Role"
            onChangeText={(text) => setRole(text)}
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
          <ComputerDesktopIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Technologies Used"
            onChangeText={(text) => setTechnologyUsed(text)}
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
          <UserGroupIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Team Size"
            onChangeText={(text) => setTeamSize(text)}
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
          <ChartBarIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Challanges and Solutions"
            onChangeText={(text) => setChallangesAndSolution(text)}
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
          <AcademicCapIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Achievements"
            onChangeText={(text) => setAchievement(text)}
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
          <LinkIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Github or Project URL"
            onChangeText={(text) => setProjectURL(text)}
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
          <ClipboardDocumentCheckIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Relevance Of Jobs"
            onChangeText={(text) => setRelevanceOfJobs(text)}
          />
        </View>
        <TouchableOpacity
          onPress={addProjectData}
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
              fontWeight: 700,
            }}
          >
            Add Project
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 60 }}></View>
    </ScrollView>
  );
}
