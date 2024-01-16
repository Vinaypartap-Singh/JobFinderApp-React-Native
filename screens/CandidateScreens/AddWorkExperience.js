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
  LockClosedIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme";

export default function AddWorkExperience() {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [dateOfEmployment, setDateOfEmployment] = useState("");
  const [location, setLocation] = useState("");
  const [Responsibilities, setResponsibilities] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [reasonOfLeaving, setReasonOfLeaving] = useState("");
  const [industry, setIndustry] = useState("");

  const addExperience = () => {
    if (
      jobTitle === "" ||
      companyName === "" ||
      dateOfEmployment === "" ||
      location === "" ||
      Responsibilities === "" ||
      skillsUsed === "" ||
      employmentType === "" ||
      reasonOfLeaving === "" ||
      industry === ""
    ) {
      Alert.alert(
        "Invalid Details",
        "Please fill all the information to add your work experience",
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

        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          Add Work Experience
        </Text>
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
            placeholder="Job Title"
            onChangeText={(text) => setJobTitle(text)}
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
          <BuildingOfficeIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Company name"
            onChangeText={(text) => setCompanyName(text)}
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
            placeholder="Date Of Employment"
            onChangeText={(text) => setDateOfEmployment(text)}
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
          <MapPinIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Location"
            onChangeText={(text) => setLocation(text)}
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
          <StarIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Responsibilities and Achievement"
            onChangeText={(text) => setResponsibilities(text)}
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
          <BuildingOfficeIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Skills Used"
            onChangeText={(text) => setSkillsUsed(text)}
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
          <BuildingOfficeIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Employment Type"
            onChangeText={(text) => setEmploymentType(text)}
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
          <BuildingOfficeIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Reason For Leaving"
            onChangeText={(text) => setReasonOfLeaving(text)}
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
          <BuildingOfficeIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Industry"
            onChangeText={(text) => setIndustry(text)}
          />
        </View>
        <TouchableOpacity
          onPress={addExperience}
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
            Add Experience
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 60 }}></View>
      </View>
    </ScrollView>
  );
}
