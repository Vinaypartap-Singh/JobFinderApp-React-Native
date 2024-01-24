import {
  View,
  Text,
  ScrollView,
  Platform,
  NativeModules,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../../theme";

export default function JobsInfo() {
  const { StatusBarManager } = NativeModules;
  const [appliedJobsInfo, setAppiedJobsInfo] = useState(null);

  useEffect(() => {
    const getAppliedJobsInfo = async () => {
      const docRef = doc(db, "users", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const jobInfo = docSnap.data().jobApplied;

        if (jobInfo) {
          setAppiedJobsInfo(jobInfo);
        } else {
          setAppiedJobsInfo(null);
        }
      }
    };

    getAppliedJobsInfo();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBarManager.HEIGHT + 20 : 0,
        paddingHorizontal: 20,
        backgroundColor: "white",
        paddingTop: 20,
      }}
    >
      {appliedJobsInfo ? (
        <View>
          <Text
            style={{ fontSize: 20, fontWeight: 600, color: theme.primaryColor }}
          >
            Job You have Applied
          </Text>
          {appliedJobsInfo.map((jobInfo, index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop:
                    Platform.OS === "android"
                      ? StatusBarManager.HEIGHT + 20
                      : 0,
                }}
              >
                {/* Job Info Code */}
                <View style={{ marginTop: 20, gap: 15 }}>
                  <Text style={{ fontSize: 20, fontWeight: 700 }}>
                    Company: {jobInfo.companyName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
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
                  <Text>
                    Application Deadline: {jobInfo.applicationDeadline}
                  </Text>
                  <Text>Location: {jobInfo.location}</Text>
                  <Text>Salary: {jobInfo.salary}</Text>
                  <Text
                    style={{ fontWeight: 700, fontSize: 20, marginTop: 20 }}
                  >
                    Contact Information
                  </Text>
                  <Text style={{ lineHeight: 20 }}>
                    Address: {jobInfo.contactInformation}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            No Applied Found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
