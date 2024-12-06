import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../slices/todoSlice";
import { Checkbox } from "react-native-paper";

const { height } = Dimensions.get("screen");

export default function MainScreen({ navigation }) {
  const [data, setData] = useState([]);
  //const data = useSelector((state) => state.todo.val);

  const dispatch = useDispatch();
  const [info, setInfo] = useState(data);

  const fetchTodos = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    //dispatch(add(res.data));
    setData(res.data);
    setInfo(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setInfo(data);
  //   }
  // }, [data]);

  const handleCheck = (index) => {
    setInfo((prevInfo) => {
      const updatedInfo = prevInfo?.map((item, idx) =>
        idx === index ? { ...item, completed: !item?.completed } : item
      );
      setData(updatedInfo);
      return updatedInfo;
    });
  };

  const handleDelete = (id) => {
    dispatch(remove(id));
  };
  const renderTodo = useCallback(({ item, index }) => {
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

          <TouchableOpacity onPress={() => handleDelete(item?.id)}>
            <Text>Del</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  console.log(info.length);

  return (
    <>
      <View style={styles.container}>
        <Filters info={info} data={data} setInfo={(val) => setInfo(val)} />
        <FlatList
          style={styles.list}
          data={info}
          keyboardShouldPersistTaps={"handled"}
          renderItem={renderTodo}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
        />
        {/* {data.length == 0 && <Text>No To Dos</Text>} */}
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => navigation.navigate("Add Todo")}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f8f8f8",
  },

  text: {
    fontWeight: "500",
    marginLeft: 10,
    alignSelf: "center",
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
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 8,
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
  },
});
