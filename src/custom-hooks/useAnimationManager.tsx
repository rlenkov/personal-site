import { useState, useEffect } from 'react'

const createStatesObject = (transfomantObject: object) => {
    const animationStates = {}
    Object.keys(transfomantObject).forEach(key => {
        animationStates[key] = false
    })
    return animationStates
}

export const effects = {
    ON_OPEN: 'onOpen',
    ON_PIVOT_REACHED: 'onPivotReached',
    ON_MID_REACHED: 'onMidReached',
    ON_LOW_REACHED: 'onLowReached',
    ON_TOP_REACHED: 'onTopReached',
}

export function useAnimationManager(animatedElements: object, yPosition = 0) {
    const [animationStates, setAnimationStates] = useState(
        createStatesObject(animatedElements)
    )
    const [animatedElementRefs, setAnimatedElementRefs] = useState({})
    const [isPageOpen, setIsPageOpen] = useState(false)

    useEffect(() => {
        const refs = {}
        for (const [key, value] of Object.entries(animatedElements)) {
            const elem = document.getElementById(value.id)
            if (elem !== null) {
                refs[key] = elem.getBoundingClientRect().top + window.scrollY
            }
        }
        setAnimatedElementRefs(refs)
    }, [animationStates, yPosition])

    useEffect(() => {
        Object.keys(animatedElements).forEach(key => {
            if (
                animatedElements[key].effect === effects.ON_OPEN ||
                animationStates[key] ||
                animatedElementRefs[key] === undefined
            ) {
                // console.log(`ommiting, cuz ${key} is ${animationStates[key]}`)
                return
            }
            let adjustment = window.innerHeight * 2
            if (animatedElements[key].effect === effects.ON_TOP_REACHED) {
                adjustment = window.innerHeight * 0.8
            }
            if (animatedElements[key].effect === effects.ON_MID_REACHED) {
                adjustment = window.innerHeight * 1.5
            }
            if (animatedElements[key].effect === effects.ON_LOW_REACHED) {
                adjustment = window.innerHeight * 1.1
            }
            const y = animatedElementRefs[key]
            // console.log(animatedElements[key])
            // console.log(y)
            // console.log(yPosition)
            // console.log(`adj: ${adjustment}`)
            if (y !== null) {
                if (yPosition + adjustment >= y) {
                    // console.log('pivot reached!')
                    // console.log(animatedElements[key])
                    // console.log(key)
                    //     console.log(y)
                    //     console.log(yPosition)
                    //     console.log(`adj: ${adjustment}`)
                    const copy = { ...animationStates }
                    copy[key] = true
                    setAnimationStates(copy)
                }
            }
        })
    }, [yPosition, isPageOpen])

    useEffect(() => {
        const timer = setTimeout(() => {
            Object.entries(animatedElements).forEach(([key, element]) => {
                if (
                    element.effect === effects.ON_OPEN &&
                    !animationStates[key]
                ) {
                    const copy = { ...animationStates }
                    copy[key] = true
                    setAnimationStates(copy)
                }
            })
        }, 100)
        const resetOnBackButton = setTimeout(() => {
            setIsPageOpen(!isPageOpen)
        }, 200)
        return () => {
            clearTimeout(timer)
            clearTimeout(resetOnBackButton)
        }
    }, [])

    return animationStates
}
