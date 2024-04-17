import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { BackBtn, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  location: Yup.string()
    .required("Required")
    .min(3, "Required a valid location"),

  username: Yup.string()
    .required("Required")
    .min(3, "Provide a valid username"),
});

const SignupPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields!");
    {
      defaultIndex: 1;
    }
  };

  const registerUser = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://localhost:3000/api/register";
      const data = values;
      const res = await axios.post(endpoint, data);

      if (res.status === 201) {
        navigation.replace("Login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={100}>
      <SafeAreaView>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image source={require("../assets/cover.png")} style={styles.cover} />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
              location: "",
              username: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
            
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? "teal" : "lightgray"
                    )}
                  >
                    <MaterialCommunityIcons
                      name="head-outline"
                      size={20}
                      color={"teal"}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Username"
                      onFocus={() => setFieldTouched("username")}
                      onChangeText={handleChange("username")}
                      onBlur={() => setFieldTouched("username", "")}
                      autoCapitalize="none"
                      value={values.username}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      // keyboardType="username-address"
                      // returnKeyType="next"
                      // onSubmitEditing={() => setFieldTouched("username")}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>
                {/* ------------- */}
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? "teal" : "lightgray"
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={"teal"}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="jon@doe.com"
                      onFocus={() => setFieldTouched("email")}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email", "")}
                      autoCapitalize="none"
                      value={values.email}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      // keyboardType="email-address"
                      // returnKeyType="next"
                      // onSubmitEditing={() => setFieldTouched("email")}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                {/* ------------- */}
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? "teal" : "lightgray"
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={"teal"}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="********"
                      onFocus={() => setFieldTouched("password")}
                      onChangeText={handleChange("password")}
                      onBlur={() => setFieldTouched("password", "")}
                      autoCapitalize="none"
                      value={values.password}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      // keyboardType="password-address"
                      // returnKeyType="next"
                      // onSubmitEditing={() => setFieldTouched("password")}
                    />
                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                {/* ------------- */}
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? "teal" : "lightgray"
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={"teal"}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Budapest"
                      onFocus={() => setFieldTouched("location")}
                      onChangeText={handleChange("location")}
                      onBlur={() => setFieldTouched("location", "")}
                      autoCapitalize="none"
                      value={values.location}
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      // keyboardType="location-address"
                      // returnKeyType="next"
                      // onSubmitEditing={() => setFieldTouched("location")}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  // onPress={isValid ? handleSubmit : () => {}}
                  onPress={isValid ? handleSubmit : invalidForm}
                  title="S I G N U P"
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  cover: {
    height: screenHeight / 3.8,
    width: screenWidth,
    resizeMode: "cover",
    marginBottom: 44,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "teal",
    marginBottom: 30,
  },
  wrapper: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    borderWidth: 1,
    height: 45,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    // alignContent: "center",
    // width: "90%",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
  }),
  label: {
    marginLeft: 20,
    marginBottom: -5,
    color: "grey",
    fontFamily: "regular",
  },
  errorMessage: {
    color: "red",
    fontFamily: "regular",
    fontSize: 12,
    marginLeft: 20,
  },
  registration: {
    marginTop: 20,
    textAlign: "center",
  },
});
