import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { theme } from "../../theme";
import { XCircleIcon } from "react-native-heroicons/outline";
import CandidateCard from "../../components/CandidateCard";

export default function HomeRecruiter() {
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const userId = auth.currentUser.uid;
  useEffect(() => {
    const getRecruiterJobs = async () => {
      const docRef = doc(db, "users", `${userId}`);

      const realTimeJobUpdate = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists) {
          setRecruiterJobs(docSnap.data().jobs);
        }
      });
    };

    getRecruiterJobs();

    const getCandidateList = async () => {
      const collectionRef = collection(db, "users");

      const queryRef = query(collectionRef, where("isCandidate", "==", true));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const allDocuments = [];
        snapshot.forEach((doc) => {
          allDocuments.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setCandidateList(allDocuments);
      });
    };

    getCandidateList();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      {recruiterJobs?.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Your Jobs</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ gap: 20, marginTop: 20 }}
          >
            {recruiterJobs.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: theme.lightBackgroundColor,
                    paddingVertical: 10,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    gap: 12,
                    width: 300,
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
                    Company: {data.companyName}
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
          </ScrollView>
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

      <CandidateCard candidateList={candidateList} />
    </ScrollView>
  );
}
