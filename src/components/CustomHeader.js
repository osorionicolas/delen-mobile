import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Header, Switch } from 'react-native-elements';
import { TabContext } from '../providers/TabProvider';
import { ThemeContext } from '../providers/ThemeProvider';
import { ContentContext } from '../providers/ContentProvider';

const CustomNavbar = () => {
  const { getTabName } = useContext(TabContext)
  const { setTheme, isDarkMode } = useContext(ThemeContext)
  
  return(
    <Header>
      <Text style={{ color: '#fff', fontSize: 24, width: 256 }}>{ getTabName() }</Text>
      <></>
      <Switch
          color="red"
          onValueChange={() => setTheme(isDarkMode ? "light" : "dark")}
          value={isDarkMode}
      />
    </Header>
  )
}
export default CustomNavbar

const styles = StyleSheet.create({
  justifyToRight: {
    justifyContent: "flex-end"
  },
})