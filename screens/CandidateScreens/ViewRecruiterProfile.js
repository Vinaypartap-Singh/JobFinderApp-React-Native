import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ViewRecruiterProfile({ route }) {
  const recruiterInfo = route.params;
  const navigation = useNavigation();
  const recruiterEmail = recruiterInfo.email;
  const [recruiterJobs, setRecruiterJobs] = useState([]);

  useEffect(() => {
    const getRecruiterJobs = async () => {
      const jobDocRef = doc(db, "posts", `${recruiterEmail}`);

      const docSnap = await getDoc(jobDocRef);

      if (docSnap.exists()) {
        setRecruiterJobs(docSnap.data()?.jobs);
      }
    };

    getRecruiterJobs();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color={theme.primaryColor} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 10, alignItems: "center" }}>
          <Image
            source={{ uri: recruiterInfo.profileImage }}
            style={{ width: 110, height: 110, borderRadius: 100 }}
          />
          <Text style={{ fontSize: 22, fontWeight: 600 }}>
            {recruiterInfo.username}
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            {recruiterInfo.email}
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 17 }}>
            {recruiterInfo.recruiterRole}
          </Text>
        </View>

        {recruiterJobs.length > 0 ? (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>
              Jobs by {recruiterInfo.username}
            </Text>
            {recruiterJobs.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                    marginTop: 20,
                    backgroundColor: theme.extraLightBackground,
                    paddingVertical: 30,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 600 }}>
                    Company: {data.companyName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{data.jobTitle}</Text>
                    <Text style={{ fontSize: 16 }}>{data.jobType}</Text>
                  </View>
                  <Text style={{ marginTop: 10, lineHeight: 25, fontSize: 16 }}>
                    Job Description: {data.jobDescription}
                  </Text>

                  <Text style={{ marginTop: 10, lineHeight: 25, fontSize: 16 }}>
                    Skills: {data.requiredSkills}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      Deadline: {data.applicationDeadline}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      Location: {data.location}
                    </Text>
                  </View>

                  <Text style={{ marginTop: 10, lineHeight: 25, fontSize: 16 }}>
                    Application Instructions: {data.applicationIntruction}
                  </Text>

                  <Text style={{ marginTop: 10, lineHeight: 25, fontSize: 16 }}>
                    Contact Information: {data.contactInformation}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 30,
              marginTop: 40,
              borderTopWidth: 1,
              paddingTop: 20,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              No Jobs Posted by {recruiterInfo.username}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
