import React, { useCallback, useMemo } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { RootState, useAppSelector } from "@/redux";
import { IPlayer, ITeam } from "@/types";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTeam: ITeam;
  handleClose: () => void;
};

export const TeamInfoModal: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  selectedTeam,
  handleClose,
}) => {
  const handleCancel = useCallback(() => {
    setModalVisible(false);
    handleClose();
  }, [setModalVisible, handleClose]);

  const playersData: IPlayer[] = useAppSelector(
    (state: RootState) => state.players.playersData
  );

  const players = useMemo(() => {
    if (!playersData) return null;

    return playersData
      .filter((player) => player.team?.id === selectedTeam.id)
      .map((player) => (
        <View key={player.id} style={styles.playerContainer}>
          <Text style={styles.playerName}>{player.name}</Text>
          {player.photo && (
            <View style={styles.photoContainer}>
              <Image source={{ uri: player.photo }} style={styles.photo} />
            </View>
          )}
        </View>
      ));
  }, [playersData, selectedTeam.id]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Team {selectedTeam.name}</Text>
          <View style={styles.playersList}>{players}</View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleCancel}
          >
            <Text style={styles.textStyle}>Zavřít</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  playersList: {
    width: "100%",
  },
  playerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  photoContainer: {
    marginTop: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
