import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { XCircleIcon } from "react-native-heroicons/outline";
import { theme } from "../../theme";

export default function CandidateJobsScreen({ recruiterJobs }) {
  return (
    <View>
      {recruiterJobs ? (
        <View style={{ paddingHorizontal: 20 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ gap: 20, marginTop: 20 }}
          >
            {Object.keys(recruiterJobs).map((key, index) => {
              const job = recruiterJobs[key];
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: theme.extraLightBackground,
                    paddingVertical: 10,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    gap: 12,
                    margin: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                      marginTop: 10,
                    }}
                  >
                    Company: {job.companyName}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: theme.lightColor,
                      }}
                    >
                      {job.jobTitle}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: theme.lightColor,
                      }}
                    >
                      {job.jobType}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={3}
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      color: theme.lightColor,
                      lineHeight: 30,
                    }}
                  >
                    Job Description: {job.jobDescription}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      color: theme.lightColor,
                    }}
                  >
                    Skills: {job.requiredSkills}
                  </Text>

                  <TouchableOpacity
                    onPress={() => console.log(job)}
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ color: theme.primaryColor, fontWeight: "bold" }}
                    >
                      View Job
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={{ gap: 10, paddingHorizontal: 20 }}>
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
                No Jobs Currently
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
              View Recruiter's Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
