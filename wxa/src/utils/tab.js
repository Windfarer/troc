import React, { createContext } from 'react'

const TabContext = createContext({
  tabs: [],
  currentTabKey: null,
  setCurrentTabKey: () => {}
})

function WithTab ({ tabs, currentTabKey, setCurrentTabKey, children }) {
  return <TabContext.Provider value={{ tabs, currentTabKey, setCurrentTabKey }}>
    {children}
  </TabContext.Provider>
}

export default WithTab
export { TabContext }
