import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { data } from "../constants/range";
import { Button, Checkbox } from "react-native-paper";
import { useSelector } from "react-redux";

const IdModal = ({ setInfo, open, closeModal }) => {
  const tods = useSelector((state) => state.todo.val);

  const [isChecked, setIsChecked] = useState(false);
  const [filterVal, setFilterVal] = useState(null);

  const handleCheck = (value) => {
    setFilterVal(value);
  };

  const handleApply = () => {
    let value = tods?.filter(
      (val) => val?.id >= filterVal.range[0] && val?.id <= filterVal.range[1]
    );

    setInfo(value);
    closeModal();
  };
  return (
    <Modal visible={open} animationType="none" transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.head}>Find by Id range</Text>

          {data?.map((val, i) => {
            return (
              <View style={styles.filterContainer} key={i}>
                <Checkbox
                  status={val?.id == filterVal?.id ? "checked" : "unchecked"}
                  onPress={() => handleCheck(val)}
                />
                <Text style={styles.text}>{val?.title}</Text>
              </View>
            );
          })}
          <Button mode="contained" style={styles.btn} onPress={handleApply}>
            Apply
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default IdModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  btn: {
    width: "100%",
    marginTop: 4,
  },
  text: {
    alignSelf: "center",
  },
  head: {
    fontWeight: "500",
    marginBottom: 4,
  },
});
