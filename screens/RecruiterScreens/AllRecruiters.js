import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { theme } from "../../theme";

export default function AllRecruiters() {
  const [recruiter, setRecruiter] = useState([]);
  useEffect(() => {
    const getAllRecruiters = async () => {
      const userRef = collection(db, "users");

      const queryRef = query(userRef, where("isRecruiter", "==", true));

      const getAlRecruiter = onSnapshot(queryRef, (snapshot) => {
        const allRecruiters = [];
        snapshot.forEach((doc) => {
          allRecruiters.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setRecruiter(allRecruiters);
      });
    };

    getAllRecruiters();
  }, []);

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>Recruiter's Profile</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recruiter.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: theme.extraLightBackground,
                marginTop: 30,
                margin: 10,
                alignItems: "center",
                gap: 10,
                paddingVertical: 10,
              }}
            >
              <Image
                source={{ uri: data.profileImage }}
                style={{ width: 110, height: 110, borderRadius: 10 }}
              />
              <View style={{ gap: 5, paddingHorizontal: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 600, textAlign: "center" }}
                >
                  {data.username}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}
                >
                  {data.recruiterRole}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
