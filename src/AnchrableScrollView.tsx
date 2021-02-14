import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import useMeasurements from './useMeasurements'

interface AnchrableScrollViewProps extends ScrollViewProps {
    children: any,
}

const AnchrableScrollView = React.forwardRef((props: AnchrableScrollViewProps, ref) => {

    const { children } = props
    const _scrollView = React.useRef<ScrollView>(null)
    const [v, forceUpdate] = React.useState(false)
    const anchorsMeasurements = useMeasurements(children, _scrollView, [v])


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
        const {x, y} = anchor;
        if (x !== undefined && y !== undefined)
            _scrollView.current?.scrollTo({x, y})
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

export * from './Anchor'
export * from './HeaderAnchors'
export default AnchrableScrollView