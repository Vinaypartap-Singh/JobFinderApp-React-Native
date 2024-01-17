import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function CandidateProfile() {
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const profileRef = doc(db, "users", `${uid}`);

      const profile = await getDoc(profileRef);

      if (profile.exists()) {
        setProfile(profile.data());
      }
    };

    getProfile();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity>
          <HomeIcon color={theme.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ArrowRightStartOnRectangleIcon color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      <View>
        {profile ? (
          <View style={{ marginTop: 30, gap: 10 }}>
            <View style={{ gap: 10 }}>
              <Image
                source={{ uri: profile.profileImage }}
                style={{
                  height: 130,
                  width: 130,
                  objectFit: "cover",
                  borderRadius: 100,
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: 700 }}>
                {profile.username}
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                {profile.email}
              </Text>
              <Text style={{ fontWeight: 600, fontSize: 16 }}>
                {profile.candidateRole} in {profile.address}
              </Text>
              <Text style={{ lineHeight: 30, fontWeight: 600 }}>
                Skills: {profile.skills}
              </Text>
            </View>

            {/* Work Experience and Projects Section */}

            <View
              style={{
                marginTop: 20,
                borderTopWidth: 1,
                paddingTop: 20,
              }}
            >
              {/* Work Experience Section */}
              {profile.workExperience ? (
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}
                  >
                    Work Experience
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {profile.workExperience.map((data, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            gap: 10,
                            backgroundColor: theme.extraLightBackground,
                            padding: 20,
                            borderRadius: 10,
                            width: 380,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ width: "70%" }}>
                              Company: {data.companyName}
                            </Text>
                            <Text style={{ width: "30%", textAlign: "right" }}>
                              {data.location}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ width: "50%" }}>
                              Joined On: {data.dateOfEmployment}
                            </Text>
                            <Text style={{ width: "50%", textAlign: "right" }}>
                              {data.employmentType}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ width: "50%" }}>
                              Role: {data.jobTitle}
                            </Text>
                            <Text style={{ width: "50%", textAlign: "right" }}>
                              {data.industry}
                            </Text>
                          </View>
                          <Text style={{ lineHeight: 25 }}>
                            Skills: {data.skillsUsed}
                          </Text>
                          <Text>Responsibilities: {data.Responsibilities}</Text>
                          <Text>Reason Of Leaving: {data.reasonOfLeaving}</Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : (
                <View style={{ gap: 20 }}>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    No Work Experience Mentioned
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.replace("CandidateExperience")}
                    style={{
                      backgroundColor: theme.highlightColor,
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      Add Experience
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* Projects Section */}
              <View
                style={{ marginTop: 30, borderTopWidth: 1, paddingTop: 20 }}
              >
                {profile.projects ? (
                  <View></View>
                ) : (
                  <View style={{ gap: 20 }}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      No Project(s) Mentioned
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("AddProject")}
                      style={{
                        backgroundColor: theme.highlightColor,
                        paddingVertical: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        Add Projects
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Contact Information */}

            <View style={{ marginTop: 20, gap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                Contact Information
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                Mobile {profile.phone}
              </Text>

              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                Email {profile.email}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text>Loading</Text>
          </View>
        )}
      </View>
      {/* Spacing View */}
      <View style={{ marginBottom: 50 }}></View>
    </ScrollView>
  );
}
