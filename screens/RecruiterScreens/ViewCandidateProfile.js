import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function ViewCandidateProfile({ route }) {
  const navigation = useNavigation();
  const candidateInfo = route.params;

  return (
    <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity>
        <ChevronLeftIcon
          color={theme.primaryColor}
          onPress={() => navigation.navigate("RecruiterDashboard")}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Image
            source={{ uri: candidateInfo.profileImage }}
            style={{ width: 110, height: 110, borderRadius: 100 }}
          />
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            {candidateInfo.username}
          </Text>
          <Text>{candidateInfo.email}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{candidateInfo.candidateRole} </Text>
            <Text>in {candidateInfo.address}</Text>
          </View>
          <Text style={{ lineHeight: 30 }}>Skills: {candidateInfo.skills}</Text>
        </View>
        {/* Candidate Work Experience */}
        <View style={{ borderTopWidth: 1, marginTop: 20 }}>
          {candidateInfo.workExperience ? (
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>
                Work Experience
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {candidateInfo.workExperience.map((data, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: theme.extraLightBackground,
                        width: 350,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        marginTop: 20,
                        borderRadius: 5,
                        gap: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, width: "70%" }}>
                          Company: {data.companyName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            width: "28%",
                            textAlign: "right",
                          }}
                        >
                          {data.location}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, width: "70%" }}>
                          Joined On: {data.dateOfEmployment}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            width: "28%",
                            textAlign: "right",
                          }}
                        >
                          {data.employmentType}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 13, width: "70%" }}>
                          Role: {data.jobTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            width: "28%",
                            textAlign: "right",
                          }}
                        >
                          {data.industry}
                        </Text>
                      </View>
                      <Text style={{ lineHeight: 25, fontSize: 13 }}>
                        Skills: {data.skillsUsed}
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        Responsibilities: {data.Responsibilities}
                      </Text>
                      <Text>Reason Of Leaving: {data.reasonOfLeaving}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                No Work Experience Added
              </Text>
            </View>
          )}
        </View>

        {/* Candidate Projects Info */}
        <View style={{ borderTopWidth: 1, marginTop: 20 }}>
          {candidateInfo.projects ? (
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Projects</Text>
              {candidateInfo.projects.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 350,
                      marginTop: 20,
                      borderRadius: 5,
                      gap: 10,
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                    }}
                  >
                    <Text style={{ fontSize: 13 }}>
                      Title: {data.projectTitle}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Role: {data.role}</Text>
                      <Text>{data.dateOfCompletion}</Text>
                    </View>
                    <Text style={{ lineHeight: 22 }}>
                      Tech Used: {data.technologyUsed}
                    </Text>
                    <Text style={{ lineHeight: 22 }}>
                      Project Description: {data.projectDescription}
                    </Text>
                    <Text style={{ lineHeight: 22 }}>
                      Challanges and Solutions: {data.challangesAndSolution}
                    </Text>
                    <Text style={{ lineHeight: 22 }}>
                      Achievement: {data.achievement}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                No Projects Added
              </Text>
            </View>
          )}
        </View>

        {/* Candidate Contact Information */}

        <View style={{ borderTopWidth: 1, marginTop: 20, gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 20 }}>
            Contact Information
          </Text>
          <Text>Mobile: {candidateInfo.phone}</Text>
          <Text>Email: {candidateInfo.email}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
