import React from 'react'

const ScrollContext = React.createContext(0)

export const ScrollProvider = ScrollContext.Provider
export const ScrollConsumer = ScrollContext.Consumer
export default ScrollContext
