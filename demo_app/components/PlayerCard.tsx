import React, { useCallback } from "react";
import { StyleSheet, Button, Text, View, Image, Pressable } from "react-native";
import { actions, useAppDispatch } from "@/redux";
import { IPlayer } from "@/types";

type PayerCardProps = {
  data: IPlayer;
  selectedPlayers: number[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
};

export const PlayerCard = ({
  data,
  selectedPlayers,
  setSelectedPlayers,
  disabled,
}: PayerCardProps) => {
  const dispatch = useAppDispatch();

  const isSelected =
    (selectedPlayers && selectedPlayers.includes(data.id)) ?? false;

  const handleSelectPlayer = useCallback(() => {
    if (isSelected) {
      // If the player is already selected, remove from selectedPlayers
      setSelectedPlayers(selectedPlayers.filter((id) => id !== data.id));
    } else {
      // If the player is not selected, add to selectedPlayers
      setSelectedPlayers([...selectedPlayers, data.id]);
    }
  }, [data.id, isSelected, selectedPlayers, setSelectedPlayers]);

  const handleDelete = useCallback(() => {
    dispatch(actions.players.removePlayerData({ id: data.id }));
  }, [dispatch, data.id]);

  const border = data.team
    ? { borderColor: data.team.color }
    : { borderColor: "lightgray", borderStyle: "dashed" as "dashed" };

  const photoUri = data?.photo ?? null;
  return (
    <Pressable
      key={data.id}
      style={[
        border,
        styles.card,
        isSelected && { backgroundColor: border.borderColor },
      ]}
      onPress={handleSelectPlayer}
      disabled={disabled}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.playerName}>{data.name}</Text>
        <Text style={styles.teamName}>{data.team?.name || "Bez týmu"}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {photoUri && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
          </View>
        )}
        <View style={styles.button}>
          <Button title="Smazat" onPress={handleDelete} />
        </View>
      </View>
    </Pressable>
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
    gap: 4,
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
  photoContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  photoLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
