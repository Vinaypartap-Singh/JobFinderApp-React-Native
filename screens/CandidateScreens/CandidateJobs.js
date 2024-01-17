import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import JobsCard from "./components/JobsCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CandidateJobsScreen from "./CandidateJobsScreen";

export default function CandidateJobs() {
  const [recruiterJobs, setRecuiterJobs] = useState([]);
  useEffect(() => {
    const getAllJobs = async () => {
      const collectionRef = collection(db, "posts");
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const allDocs = [];
        snapshot.forEach((doc) => {
          allDocs.push({
            id: doc.id,
            ...doc.data().jobs,
          });
        });

        setRecuiterJobs(allDocs);
      });
    };

    getAllJobs();
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {recruiterJobs.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text
            style={{ fontSize: 20, fontWeight: 700, paddingHorizontal: 30 }}
          >
            On Going Jobs
          </Text>
          {recruiterJobs.map((jobPostings, index) => {
            const { id, ...jobs } = jobPostings;

            return <CandidateJobsScreen key={index} recruiterJobs={jobs} />;
          })}
        </View>
      ) : null}
    </ScrollView>
  );
}
