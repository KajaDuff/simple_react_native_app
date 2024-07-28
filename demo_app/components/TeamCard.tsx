import React, { useCallback } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { actions, useAppDispatch } from "@/redux";
import { ITeam } from "@/types";

export const TeamCard = ({ data }: { data: ITeam }) => {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispatch(actions.teams.removeTeamData({ id: data.id }));
  }, [dispatch, data.id]);

  return (
    <View key={data.id} style={[{ borderColor: data.color }, styles.teamCard]}>
      <View style={styles.infoContainer}>
        <Text style={styles.teamName}>{data.name}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Zobrazit" onPress={() => {}} />
        </View>
        <View style={styles.button}>
          <Button title="Smazat" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teamCard: {
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 4,
    width: "100%",
  },
});
