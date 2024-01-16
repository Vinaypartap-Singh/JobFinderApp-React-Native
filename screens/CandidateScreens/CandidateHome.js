import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import JobsCard from "./components/JobsCard";
import AllRecruiters from "../RecruiterScreens/AllRecruiters";

export default function CandidateHome() {
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

  console.log(recruiterJobs);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {recruiterJobs.length > 0 ? (
        <View>
          {recruiterJobs.map((jobPostings, index) => {
            const { id, ...jobs } = jobPostings;

            return <JobsCard key={index} recruiterJobs={jobs} />;
          })}
        </View>
      ) : null}

      <AllRecruiters />
    </View>
  );
}
