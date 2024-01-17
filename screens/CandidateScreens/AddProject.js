import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import {
  ChevronLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  UserIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
} from "react-native-heroicons/outline";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function AddProject() {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingTop: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.replace("CandidateHome")}>
          <ChevronLeftIcon color={theme.highlightColor} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Add Project</Text>
      </View>

      <View style={{ marginTop: 30, gap: 30 }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <BriefcaseIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Project Title" />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <CalendarIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Date Of Completion"
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <ChatBubbleBottomCenterIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Project Description"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <UserIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Role" />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <ComputerDesktopIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Technologies Used" />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <UserGroupIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Team Size" />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <ChartBarIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Challanges and Solutions"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <AcademicCapIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Achievements" />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <LinkIcon size={25} color={"black"} />
          <TextInput
            style={{ width: "80%" }}
            placeholder="Github or Project URL"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 20,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <ClipboardDocumentCheckIcon size={25} color={"black"} />
          <TextInput style={{ width: "80%" }} placeholder="Relevance Of Jobs" />
        </View>
        <TouchableOpacity
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
              fontWeight: 700,
            }}
          >
            Add Project
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 60 }}></View>
    </ScrollView>
  );
}
