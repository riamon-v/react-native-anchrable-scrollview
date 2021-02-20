import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import { useAnchorsMeasurements } from './useAnchorsMeasurements'

interface AnchrableScrollViewProps extends ScrollViewProps {
    children: any,
    ref?: React.RefObject<ScrollView>
}

const AnchrableScrollView = React.forwardRef((props: AnchrableScrollViewProps, ref: any) => {

    const { children } = props
    const _scrollView = React.useRef<ScrollView>(null)
    const [v, forceUpdate] = React.useState(false)
    const anchorsMeasurements = useAnchorsMeasurements(children, _scrollView, [v])


    /**
     * FORCING RECALCULATION AFTER RENDER
     * 
     * Sometimes, calculation is not effective right after the first render.
     * This useEffect is here to prevent that case and ensure the measurements will be corrects
     * (Not ideal)
     */
    React.useLayoutEffect(() => {  
       setTimeout(() => {forceUpdate(!v)}, 200)
    }, [])

    const goToAnchor = (anchorName: string) => {
        const anchor = anchorsMeasurements?.get(anchorName)
        // const {x, y} = anchor;
        if (anchor?.x !== undefined && anchor?.y !== undefined)
            _scrollView.current?.scrollTo({x: anchor.x, y: anchor.y})
    }

    React.useImperativeHandle(ref, () => ({
        goToAnchor,
        _scrollView
    }), [_scrollView, anchorsMeasurements])

    return (
        <ScrollView 
            ref={_scrollView}
            {...props}
        />
    )

})

export {AnchrableScrollView}