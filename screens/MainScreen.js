import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../slices/todoSlice";
import TodoItem from "../components/TodoItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import IdModal from "../components/IdModal";

const { height } = Dimensions.get("screen");

export default function MainScreen({ navigation }) {
  //const [data, setData] = useState([]);
  const data = useSelector((state) => state.todo.val);

  const dispatch = useDispatch();
  const [info, setInfo] = useState(data);
  const [openModal, setOpenModal] = useState(false);

  const fetchTodos = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    dispatch(add(res.data));
    // setData(res.data);
    // setInfo(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (data) {
      // const newData = data?.filter(
      //   (item) => !info?.some((existingItem) => existingItem?.id === item?.id)
      // );

      // if (newData.length > 0) {
      //   setInfo((prevInfo) => [...prevInfo, ...newData]);
      // }
      setInfo(data);
    }
  }, [data]);

  const handleCheck = (index) => {
    setInfo((prevInfo) => {
      const updatedInfo = prevInfo?.map((item, idx) =>
        idx === index ? { ...item, completed: !item?.completed } : item
      );
      //  setData(updatedInfo);
      dispatch(update(updatedInfo));
      return updatedInfo;
    });
  };

  const handleDelete = (item) => {
    console.log(item.id, "id");
    try {
      setInfo((prev) => prev.filter((val) => val.id !== item.id));
    } finally {
      Alert.alert(`${item?.title} is deleted!`);
    }
  };
  const renderTodo = useCallback(({ item, index }) => {
    return (
      <TodoItem
        item={item}
        height={height}
        index={index}
        handleDelete={(val) => handleDelete(val)}
        handleCheck={(val) => handleCheck(val)}
      />
    );
  }, []);

  console.log(info.length);

  return (
    <>
      <View style={[styles.container, { flex: info?.length > 10 ? 1 : null }]}>
        <Filters
          info={info}
          data={data}
          setInfo={(val) => setInfo(val)}
          openModal={() => setOpenModal(true)}
        />
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
          <Text>
            <AntDesign name="plus" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        {info && (
          <View style={styles.totaltodo}>
            <Text style={styles.totaltext}>Total: {info?.length}</Text>
          </View>
        )}
        {info && (
          <View style={[styles.totaltodo, { bottom: (height * 18) / 100 }]}>
            <Text style={styles.totaltext}>
              Completed: {info?.filter((val) => val?.completed == true)?.length}
            </Text>
          </View>
        )}
      </View>
      <IdModal
        open={openModal}
        setInfo={(val) => setInfo(val)}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#f8f8f8",
  },

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
  floatButton: {
    position: "absolute",
    bottom: (height * 2) / 100,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#674fa3",
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
    width: "72%",
  },
  totaltodo: {
    position: "absolute",
    right: 10,
    bottom: (height * 10) / 100,
    justifyContent: "center",
    backgroundColor: "#674fa3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  totaltext: {
    color: "white",
    fontWeight: "500",
  },
});
