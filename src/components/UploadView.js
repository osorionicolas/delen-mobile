import React, { useState, useEffect } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Button, Input } from 'react-native-elements'
import DocumentPicker from 'react-native-document-picker'

const UploadView = ({visible, setVisible, downloadableFiles}) => {
  const [path, setPath] = useState(null)
  const [files, setFiles] = useState([])
  const [uploadFileAlert, setUploadFileAlert] = useState(false)

  const getFolders = (files) =>
      files.map(file => (file.type === "directory") ? file : null)
           .filter(Boolean)
           .map(file => ({inputValue: file.name, label: file.name}))

  const pickFiles = async () => {
    try {
      const results = await DocumentPicker.pickMultiple()
      if(results.length > 0){
        const fileNames = results.map(file => file.name)
        setFiles(fileNames)
      }
      for (const res of results) {
        console.log(
          res.name,
        )
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  useEffect(() => {
    setFiles([])
  }, [visible])

  return (
    <View style={styles.centeredView}>
      <Input placeholder='Destination Folder'/>
      <View style={styles.uploadBtn}>
        <TouchableOpacity onPress={() => console.log("PROBAR")}>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
        <Button
          title="Cancel"
          onPress={() => setVisible(!visible)}
        />
        <Button
          title="Submit"
          onPress={() => setVisible(!visible)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  uploadBtn: {
    overflow: "hidden",
    minHeight: 250,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 4,
    position: 'relative',
  }
})

export default UploadView