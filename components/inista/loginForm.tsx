import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginForm = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("elazam"),
      password: Yup.string().required("elazam"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputFeild}>
        <TextInput
          placeholder="email"
          textContentType="emailAddress"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />
      </View>
      <View style={styles.inputFeild}>
        <TextInput
          placeholder="paswword"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Text style={styles.buttonText}>ورود</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
  },
  inputFeild: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    borderBlockColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    minHeight: 45,
  },
  buttonText: {
    color: "white",
  },
});
