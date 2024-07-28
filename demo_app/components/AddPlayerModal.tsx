import React, { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { actions, RootState, useAppDispatch, useAppSelector } from "@/redux";
import { IPlayer } from "@/types";
import { Input } from "./Input";
import { Dropdown } from "./Dropdown";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddPlayerModal: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [text, setText] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<string>("");
  const teamsData = useAppSelector((state: RootState) => state.teams.teamsData);
  const [dropdownItems, setDropdownItems] = useState<
    { label: string; value: string }[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const items = teamsData.map((team) => ({
      label: team.name,
      value: team.id.toString(),
    }));
    setDropdownItems([{ label: "Bez týmu", value: "" }, ...items]);
  }, [teamsData]);

  const handleClose = useCallback(() => {
    setModalVisible(false);
    setText("");
    setDropdownValue("");
    setShowWarning(false);
    setDropdownOpen(false);
  }, [setModalVisible, setText]);

  const handleAddPlayer = useCallback(() => {
    if (text.trim() === "") {
      setShowWarning(true);
      return;
    }
    const team = teamsData.find(({ id }) => id.toString() === dropdownValue);
    const player: IPlayer = {
      name: text.trim(),
      id: Date.now(),
      photo: undefined,
      team: team,
    };
    dispatch(actions.players.setPlayerData({ player }));
    setModalVisible(false);
    setText("");
    setDropdownValue("");
    setShowWarning(false);
    setDropdownOpen(false);
  }, [text, dispatch, setModalVisible, teamsData, dropdownValue]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Přidej nového hráče</Text>
          <SafeAreaView>
            <Input
              label="Jméno:"
              value={text}
              onChangeText={setText}
              showWarning={showWarning}
              warningText="Jméno musí být vyplněno."
            />
            <Dropdown
              open={dropdownOpen}
              value={dropdownValue}
              items={dropdownItems}
              setOpen={setDropdownOpen}
              setValue={setDropdownValue}
              setItems={setDropdownItems}
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
              onPress={handleAddPlayer}
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
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 4,
    marginTop: 10,
  },
});
