import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function Filters({ setInfo, data }) {
  //const data = useSelector((state) => state.todo.val);

  const handlePressed = (val) => {
    if (val == "All") {
      setInfo(data);
      return;
    }
    if (val == "Active") {
      let value = data?.filter((ele) => ele?.completed == false);
      setInfo(value);
      return;
    }
    if (val == "Done") {
      let value = data?.filter((ele) => ele?.completed == true);
      setInfo(value);
      return;
    }
  };

  return (
    <ScrollView
      horizontal
      style={styles.parent}
      keyboardShouldPersistTaps="always"
    >
      <TouchableOpacity
        style={styles.items}
        onPress={() => handlePressed("All")}
      >
        <Text style={styles.filtertext}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.items}
        onPress={() => handlePressed("Active")}
      >
        <Text style={styles.filtertext}>Active</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.items}
        onPress={() => handlePressed("Done")}
      >
        <Text style={styles.filtertext}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.items}>
        <Text style={styles.filtertext}>Id</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    marginLeft: 10,
  },

  items: {
    // marginRight: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 8,
    marginRight: 10,
  },

  filtertext: {
    fontWeight: "500",
  },
});
