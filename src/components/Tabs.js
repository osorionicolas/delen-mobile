import React, { useState, useContext } from "react"
import { StyleSheet } from "react-native"
import { Tab, TabView, Icon } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import UploadView from "./UploadView"
import DownloadView from "./DownloadView"
import ContentView from "./ContentView"
import { TabContext } from "../providers/TabProvider"

const Tabs = () => {
  const { tab, setTab } = useContext(TabContext)
  const [openDownload, setOpenDownload] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [downloadableFiles, setDownloadableFiles] = useState([])
 
  return (
    <>
      <Tab value={tab} onChange={setTab}>
        <Tab.Item icon={<Icon
                          name="content-copy"
                          size={24}
                        />}
        />
        <Tab.Item icon={<Icon
                          name="cloud-upload"
                          size={24}
                        />} 
        />
        <Tab.Item icon={<Icon
                          name="cloud-download"
                          size={24}
                        />}
        />
      </Tab>

      <TabView value={tab} onChange={setTab}>
        <TabView.Item style={{ width: '100%' }}>
          <ContentView/>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <UploadView visible={openUpload} setVisible={setOpenUpload} downloadableFiles={downloadableFiles}/>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <DownloadView visible={openDownload} setVisible={setOpenDownload} downloadableFiles={downloadableFiles} setDownloadableFiles={setDownloadableFiles}/>
        </TabView.Item>
      </TabView>
    </>
  )
}

const styles = StyleSheet.create({
})

export default Tabs