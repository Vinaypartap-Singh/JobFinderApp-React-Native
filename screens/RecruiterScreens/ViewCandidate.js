import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import CandidateCard from "../../components/CandidateCard";
import AllCandidates from "../CandidateScreens/AllCandidates";

export default function ViewCandidate() {
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "users");

    const queryRef = query(collectionRef, where("isCandidate", "==", true));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const allCandidates = [];
      snapshot.forEach((doc) => {
        allCandidates.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCandidateList(allCandidates);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      {candidateList.length > 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            Freelancer's / Job Seekers
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 20 }}
          >
            <AllCandidates candidateList={candidateList} />
          </ScrollView>
        </View>
      ) : (
        <View>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      )}
    </View>
  );
}
