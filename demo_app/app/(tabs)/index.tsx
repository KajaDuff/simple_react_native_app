import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { RootState, useAppSelector } from "@/redux";
import { AddTeamModal } from "@/components/AddTeamModal";
import { AddPlayerModal } from "@/components/AddPlayerModal";
import { TeamCard } from "@/components/TeamCard";
import { PlayerCard } from "@/components/PlayerCard";

export default function HomeScreen() {
  const teamsData = useAppSelector((state: RootState) => state.teams.teamsData);
  const playersData = useAppSelector(
    (state: RootState) => state.players.playersData
  );

  const [addTeamOpen, setAddTeamOpen] = useState<boolean>(false);
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.column}>
            <Text style={styles.title}>Týmy</Text>
            {teamsData.map((team) => (
              <TeamCard data={team} key={team.id} />
            ))}
            <Button title="Přidat tým" onPress={() => setAddTeamOpen(true)} />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Hráči</Text>
            {playersData.map((player) => (
              <PlayerCard data={player} key={player.id} />
            ))}
            <Button
              title="Přidat hráče"
              onPress={() => setAddPlayerOpen(true)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.assignButtonContainer}>
        <Button title="Přidřadit hráče k týmu" />
      </View>
      <AddTeamModal
        modalVisible={addTeamOpen}
        setModalVisible={setAddTeamOpen}
      />
      <AddPlayerModal
        modalVisible={addPlayerOpen}
        setModalVisible={setAddPlayerOpen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
    paddingBottom: 80,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  assignButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
