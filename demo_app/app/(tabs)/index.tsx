import React, { useCallback, useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { actions, RootState, useAppDispatch, useAppSelector } from "@/redux";
import { AddTeamModal } from "@/components/AddTeamModal";
import { AddPlayerModal } from "@/components/AddPlayerModal";
import { TeamCard } from "@/components/TeamCard";
import { PlayerCard } from "@/components/PlayerCard";
import { IPlayer, ITeam } from "@/types";
import { TeamInfoModal } from "@/components/TeamInfoModal";

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const teamsData: ITeam[] = useAppSelector(
    (state: RootState) => state.teams.teamsData
  );
  const playersData: IPlayer[] = useAppSelector(
    (state: RootState) => state.players.playersData
  );

  const [addTeamOpen, setAddTeamOpen] = useState<boolean>(false);
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);
  const [teamInfoOpen, setTeamInfoOpen] = useState<boolean>(false);

  const [selectedTeam, setSelectedTeam] = useState<ITeam | undefined>();
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [selectionDisabled, setSelectionDisabled] = useState<boolean>(true);

  const handleAllowSelection = useCallback(() => {
    setSelectionDisabled(false);
  }, []);

  const handleCancelSelection = useCallback(() => {
    setSelectionDisabled(true);
    setSelectedTeam(undefined);
    setSelectedPlayers([]);
  }, []);

  const handleTeamMembership = useCallback(() => {
    if (!selectedTeam) return;
    selectedPlayers.forEach((playerId) => {
      dispatch(
        actions.players.addPlayersTeam({ playerId, team: selectedTeam })
      );
    });
    setTeamInfoOpen(true);
  }, [selectedPlayers, selectedTeam, dispatch, handleCancelSelection]);

  const hadnleShowTeamData = useCallback(() => {}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.column}>
            <Text style={styles.title}>Týmy</Text>
            {teamsData.map((team) => (
              <TeamCard
                key={team.id}
                data={team}
                setSelectedTeam={setSelectedTeam}
                selectedTeam={selectedTeam}
                disabled={selectionDisabled}
              />
            ))}
            <Button title="Přidat tým" onPress={() => setAddTeamOpen(true)} />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Hráči</Text>
            {playersData.map((player) => (
              <PlayerCard
                key={player.id}
                data={player}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                disabled={selectionDisabled || !selectedTeam}
              />
            ))}
            <Button
              title="Přidat hráče"
              onPress={() => setAddPlayerOpen(true)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.assignButtonContainer}>
        {selectionDisabled ? (
          <Button
            title="Přidřadit hráče k týmu"
            onPress={handleAllowSelection}
          />
        ) : (
          <Button title="Zrušit" onPress={handleCancelSelection} />
        )}
        <Button title="Uložit" onPress={handleTeamMembership} />
      </View>
      <AddTeamModal
        modalVisible={addTeamOpen}
        setModalVisible={setAddTeamOpen}
      />
      <AddPlayerModal
        modalVisible={addPlayerOpen}
        setModalVisible={setAddPlayerOpen}
      />
      {selectedTeam && (
        <TeamInfoModal
          modalVisible={teamInfoOpen}
          setModalVisible={setTeamInfoOpen}
          selectedTeam={selectedTeam}
          handleClose={handleCancelSelection}
        />
      )}
    </SafeAreaView>
  );
};

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
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
});

export default HomeScreen;
