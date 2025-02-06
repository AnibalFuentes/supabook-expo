import { StyleSheet,FlatList } from "react-native";

import "react-native-url-polyfill/auto"

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function TabOneScreen() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fecthPost = async () => {
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.log(error);
      } else {
        setPost(data);
      }
    };
    fecthPost();
  }, []);
  console.log(post);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
      data={post}
      keyExtractor={item=> item.id}
      renderItem={({item})=> <Text>{item.content}</Text>}
      
      
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
