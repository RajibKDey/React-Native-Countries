/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {StyleVars} from './styles';
import Divider from './components/Divider';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

const Stack = createNativeStackNavigator();

const createStyles = (theme: boolean) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: StyleVars.PRIMARY_SPACING,
      paddingVertical: StyleVars.SCREEN_BOUNDARY,
      fontWeight: 'bold',
      fontSize: StyleVars.FONT_SIZES.xlg,
      color: Colors[theme ? 'white' : 'black'],
      backgroundColor: Colors[theme ? 'black' : 'white'],
    },
    scrollView: {
      display: 'flex',
      height: '100%',
      backgroundColor: Colors[theme ? 'black' : 'white'],
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: StyleVars.PRIMARY_SPACING,
      paddingHorizontal: StyleVars.PRIMARY_SPACING,
      marginTop: StyleVars.SCREEN_BOUNDARY,
      marginBottom: StyleVars.PRIMARY_SPACING,
      backgroundColor: 'red',
      borderRadius: StyleVars.BORDER_RADIUS_SM,
    },
    searchIcon: {
      paddingHorizontal: StyleVars.PRIMARY_SPACING,
    },
    textInput: {
      fontSize: StyleVars.FONT_SIZES.md,
      color: Colors.black,
    },
    dropdownContainer: {
      paddingHorizontal: StyleVars.PRIMARY_SPACING,
    },
  });

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = createStyles(isDarkMode);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.scrollView}>
        <Text style={styles.header}>Where in the world?</Text>
        <Divider theme={isDarkMode} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Country-Details" component={CountryDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;
