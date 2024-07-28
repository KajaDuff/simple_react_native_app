import React, { useCallback, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { actions, useAppDispatch } from "@/redux";
import { getRandomColorString } from "@/utils";
import { ITeam } from "@/types";
import { Input } from "./Input";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddTeamModal: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [text, setText] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    setModalVisible(false);
    setText("");
    setShowWarning(false);
  }, [setModalVisible, setText, setShowWarning]);

  const handleAddTeam = useCallback(() => {
    if (text.trim() === "") {
      setShowWarning(true);
      return;
    }
    const team: ITeam = {
      name: text.trim(),
      color: getRandomColorString(),
      id: Date.now(),
    };
    dispatch(actions.teams.setTeamData({ team }));
    setModalVisible(false);
    setText("");
    setShowWarning(false);
  }, [text, dispatch, setModalVisible, setText, setShowWarning]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Přidej nový tým</Text>
          <SafeAreaView>
            <Input
              label="Název:"
              value={text}
              onChangeText={setText}
              showWarning={showWarning}
              warningText="Název musí být vyplněn."
            />
          </SafeAreaView>
          <View style={styles.buttonsView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleClose}
            >
              <Text style={styles.textStyle}>Zavřít</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleAddTeam}
            >
              <Text style={styles.textStyle}>Uložit</Text>
            </Pressable>
          </View>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonSave: {
    backgroundColor: "#F194FF",
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
  warningText: {
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
  labelText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
