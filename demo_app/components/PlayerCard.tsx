import React, { useCallback } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { actions, useAppDispatch } from "@/redux";
import { IPlayer } from "@/types";

export const PlayerCard = ({ data }: { data: IPlayer }) => {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispatch(actions.players.removePlayerData({ id: data.id }));
  }, [dispatch, data.id]);

  const border = data.team
    ? { borderColor: data.team.color }
    : { borderColor: "lightgray", borderStyle: "dashed" as "dashed" };

  return (
    <View key={data.id} style={[border, styles.card]}>
      <View style={styles.infoContainer}>
        <Text style={styles.playerName}>Jméno: {data.name}</Text>
        <Text style={styles.teamName}>
          Tým: {data.team?.name || "Bez týmu"}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Smazat" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teamName: {
    fontSize: 14,
    color: "gray",
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
