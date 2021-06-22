import React, { useEffect, useContext } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { ContentContext } from "../providers/ContentProvider"
import axios from 'axios'
import { SERVER_ADDRESS } from '../environment'
import { ThemeContext } from "../providers/ThemeProvider"
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Button } from 'react-native-elements'
import Clipboard from '@react-native-clipboard/clipboard';


const ContentView = () => {
    const { content, setContent } = useContext(ContentContext)
    const { isDarkMode } = useContext(ThemeContext)

    const copyToClipboard = () => Clipboard.setString(content)

    useEffect(() => {
        axios(`${SERVER_ADDRESS}/text`).then(response => setContent(response.data))
    }, [])
    
    return (
        <View>
            <TextInput
                style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, color: isDarkMode ? Colors.white : Colors.black, height: "94%" }}
                textAlignVertical="top"
                multiline
                onChangeText={text => setContent(text)}
                value={content}
                editable
            />
            <Button
                title="Copy"
                onPress={copyToClipboard}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})

export default ContentView