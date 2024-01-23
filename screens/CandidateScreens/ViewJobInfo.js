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
import React from "react";
import { theme } from "../../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function ViewJobInfo({ route }) {
  const navigation = useNavigation();
  const jobInfo = route.params;
  const { StatusBarManager } = NativeModules;
  const applyJob = () => {
    Alert.alert("Apply For Job", "Continue to apply for this Job.", [
      {
        text: "OK",
        style: "default",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
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
