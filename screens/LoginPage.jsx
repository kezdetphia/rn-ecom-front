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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields!");
    {
      defaultIndex: 1;
    }
  };

  const login = async (values) => {
    //TODO: try instead of res.data._id use responseData._id
    setLoader(true);
    try {
      const endpoint = "http://localhost:3000/api/login";
      const data = values;

      const res = await axios.post(endpoint, data);
      if (res.status === 200) {
        setLoader(false);
        setResponseData(res.data);

        //stores under user543563... the whole user data:name,email,locaton.token etc.
        await AsyncStorage.setItem(
          //user543563465425234
          // `user${responseData._id}`,
          `user${res.data._id}`,
          JSON.stringify(res.data)
        );

        await AsyncStorage.setItem("asyncUser", JSON.stringify(res.data));

        await AsyncStorage.setItem("id", JSON.stringify(res.data._id));
        await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error :" + error);
      }
    } catch (err) {
      Alert.alert("Error", "Oops! Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={180}>
      <SafeAreaView>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />

          <Image source={require("../assets/cover.png")} style={styles.cover} />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
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

                <Button
                  loader={loader}
                  // onPress={isValid ? handleSubmit : () => {}}
                  onPress={isValid ? handleSubmit : invalidForm}
                  title="L O G I N"
                  isValid={isValid}
                />
                <Text
                  onPress={() => {
                    navigation.navigate("Signup");
                  }}
                  style={styles.registration}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  cover: {
    height: screenHeight / 2.6,
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
  backBtnContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});
