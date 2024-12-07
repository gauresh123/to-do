import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TodoItem({
  item,
  height,
  index,
  handleCheck,
  handleDelete,
}) {
  return (
    <View style={styles.item}>
      <View style={styles.textParentContainer}>
        <View style={styles.textContainer}>
          <Checkbox
            status={item?.completed ? "checked" : "unchecked"}
            onPress={() => handleCheck(index)}
          />
          <Text style={[styles.text, item?.completed && styles.completed]}>
            {item?.title}
          </Text>
        </View>

        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Text>
            <AntDesign name="delete" size={(height * 2.5) / 100} color="red" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    marginLeft: 10,
    alignSelf: "center",
    width: "72%",
  },
  item: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  list: {
    //flex: 1,
    width: "100%",
  },

  textContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  textParentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
    width: "72%",
  },
});
