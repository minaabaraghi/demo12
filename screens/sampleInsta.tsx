import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import LoginForm from "../components/inista/loginForm";

const SampleInsta = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImg}
          source={require("../assets/favicon.png")}
        />
      </View>
      <LoginForm />
    </View>
  );
};

export default SampleInsta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  logoImg: {
    width: 100,
    height: 100,
  },
});
