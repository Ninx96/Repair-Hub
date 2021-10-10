import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";
import { AuthContext } from "./src/components/ContextComponent";

import AuthStackComponent from "./src/components/AuthStackComponent";
import DrawerComponent from "./src/components/DrawerComponent";
import TaskDetails from "./src/screens/Dashboard/TaskDetails";

export default function App() {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  _cacheResourcesAsync = async () => {
    // const images = [require("./assets/snack-icon.png")];
    // const cacheImages = images.map((image) => {
    //   return Asset.fromModule(image).downloadAsync();
    // });

    const fonts = [
      {
        "Purissima_Bold_W00-Regular": require("./assets/fonts/Purissima_Bold_W00_Regular.otf"),
      },
    ];

    const cacheFonts = fonts.map((font) => {
      return Font.loadAsync(font);
    });
    return Promise.all(cacheFonts);
  };

  const fontConfig = {
    default: {
      regular: {
        fontFamily: "Purissima_Bold_W00-Regular",
      },
    },
  };

  const PaperTheme = {
    ...PaperDefaultTheme,
    mode: "adaptive",

    colors: {
      ...PaperDefaultTheme.colors,
      primary: "#282f80",
      accent: "#fe5f5b",
    },
    fonts: configureFonts(fontConfig),
  };

  const initialLoginState = {
    isLoading: true,
    user: null,
    userToken: null,
    userType: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.user_token,
          user: action.user,
          userType: action.user_type,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.user_token,
          user: action.user,
          userType: action.user_type,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          userToken: null,
          userType: null,
          isLoading: false,
        };
      case "UPDATE_USER":
        return {
          ...prevState,
          user: action.user,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ userToken, user, userType }) => {
        const userData = JSON.stringify(user);
        try {
          await SecureStore.setItemAsync("userToken", String(userToken));
          await SecureStore.setItemAsync("userType", userType);
          await SecureStore.setItemAsync("user", userData);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          user: user,
          user_token: userToken,
          user_type: userType,
        });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      getSession: () => {
        return loginState;
      },
      updateUser: async (user) => {
        const userData = JSON.stringify(user);
        try {
          await SecureStore.setItemAsync("user", userData);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "UPDATE_USER",
          user: user,
        });
      },
    }),
    [loginState]
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      {
        let userToken = null;
        let user = null;
        let userType = null;

        try {
          userToken = await SecureStore.getItemAsync("userToken");
          userType = await SecureStore.getItemAsync("userType");
          user = await SecureStore.getItemAsync("user");
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "RETRIEVE_TOKEN",
          user_token: userToken,
          user_type: userType,
          user: JSON.parse(user),
        });
      }
    };

    bootstrapAsync();
  }, []);

  if (!loginState.loading && resourcesLoaded) {
    return (
      <PaperProvider theme={PaperTheme}>
        <AuthContext.Provider value={authContext}>
          <StatusBar hidden={false} style="light" barStyle={"default"} />
          <NavigationContainer>
            {loginState.userToken ? (
              <DrawerComponent />
            ) : (
              <AuthStackComponent />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onError={console.warn}
        onFinish={() => setResourcesLoaded(true)}
        autoHideSplash={true}
      />
    );
  }
}
