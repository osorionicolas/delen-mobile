import React, { useContext } from 'react'
import type {Node} from 'react'
import {
  StatusBar,
  StyleSheet,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CustomHeader from './src/components/CustomHeader'
import Tabs from './src/components/Tabs'
import { TabProvider } from './src/providers/TabProvider'
import { ContentProvider } from './src/providers/ContentProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeContext } from './src/providers/ThemeProvider'

const App: () => Node = () => {
  const { isDarkMode } = useContext(ThemeContext)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  //    <SafeAreaProvider style={backgroundStyle}>
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <TabProvider>
        <ContentProvider>
          <CustomHeader />
          <Tabs />
        </ContentProvider>
      </TabProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
})

export default App


/*const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  )
}*/