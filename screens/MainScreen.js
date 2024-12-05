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

const { height } = Dimensions.get("screen");

export default function MainScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(data);
  const fetchTodos = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setData(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderTodo = useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Filters data={data} info={info} setInfo={(val) => setInfo(val)} />
        <FlatList
          style={styles.list}
          data={info}
          keyboardShouldPersistTaps={"handled"}
          renderItem={renderTodo}
        />
        {data.length == 0 && <Text>No To Dos</Text>}
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
});
