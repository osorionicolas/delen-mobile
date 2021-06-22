import React, { createContext, useState } from "react"

const TabContext = createContext()

const TabProvider = ({ children }) => {

  const tabs = {
    0: "Copy Content",
    1: "Upload Files",
    2: "Download Files"
  }

  const [tab, setTab] = useState(0)

  const getTabName = () => {
    return tabs[tab]
  }

  return (
    <TabContext.Provider value={{ tab, setTab, getTabName }}>
      {children}
    </TabContext.Provider>
  )
}

export { TabProvider, TabContext }
