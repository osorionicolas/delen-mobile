import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from "react-native"
import { SERVER_ADDRESS } from '../environment'
import { CheckBox, Button } from 'react-native-elements'

const DownloadView = ({visible, setVisible, downloadableFiles, setDownloadableFiles}) => {
    const [checked, setChecked] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [openFolder, setOpenFolder] = useState(false)

    const getFiles = (files) => files.map(file => {
        if(file.type === "directory" && file.children.length > 0) {
            return file.children.map(child => child)
        }
        else if(file.type === "file") {
            return file
        }
        return null
    }).filter(Boolean).flat()

    
    const getDownloadableFiles = async () => {
        const files = await fetch(`${SERVER_ADDRESS}/files`)
            .then(response => response.json())
            .then(data => data)
        setDownloadableFiles(files)
    }

    const downloadFiles = () => {
        setLoading(true)
        checked.forEach(async file => {
            const res = await fetch(`${SERVER_ADDRESS}/files/${file.name}?path=${file.path}`)
            const blob = await res.blob()
            download(blob, file.name)
        })
        //Parecería que no funciona
        setLoading(false)
    }
    
    const removeFiles = (files) => {
        const response = window.confirm("You are about to delete some files, are you sure you want it?")
        if(response) {
            files.forEach(file => {
                fetch(`${SERVER_ADDRESS}/files?path=${file.path}`, {
                    method: 'DELETE'
                }).then(setTimeout(() => getDownloadableFiles(), 500))
            })
            setSelectAll(false)
        }
    }
    
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
        if(currentIndex === -1) {
            newChecked.push(value)
        }
        else {
            newChecked.splice(currentIndex, 1)
        }
        setSelectAll(false)
        setChecked(newChecked)
    }

    useEffect(() => {
        setChecked([])
        if(selectAll) {
            setChecked(getFiles(downloadableFiles))
        }
        else if(checked.length > 0 && checked.length !== getFiles(downloadableFiles).length) {
            setChecked(checked)
        }
    }, [selectAll])

    return (
        <View style={styles.centeredView}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <CheckBox checked={selectAll} onPress={() => setSelectAll(!selectAll)} />
                <Text style={{ textAlign: "right", marginRight: 28, alignSelf: "center"}} variant="subtitle1" color="inherit" className="flexGrow">There are {getFiles(downloadableFiles).length} file/s</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Button
                    title="Download"
                    onPress={() => setVisible(!visible)}
                />
                <Button
                    color="red"
                    title="Delete"
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
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})
  
export default DownloadView