import { useState, useEffect } from 'react'

// // Usage
// function App() {
//     const size = useMouseOver()

//     return (
//         <div>
//             {size.width}px / {size.height}px
//         </div>
//     )
// }

function useMouseOver(Id) {
    const isClient = typeof document === 'object'

    const [isMouseOver, setMouseOver] = useState(false)

    useEffect(() => {
        if (!isClient) {
            return false
        }

        const element = document.getElementById(Id);

        const setMouseEnter = () => {
            setMouseOver(true)
        }

        const setMouseExit = () => {
            setMouseOver(false)
        }

        element.addEventListener('mouseover', setMouseEnter)
        element.addEventListener('mouseout', setMouseExit)
        return () => {
            element.removeEventListener('mouseover', setMouseEnter)
            element.removeEventListener('mouseout', setMouseExit)
        }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return isMouseOver
}

export default useMouseOver