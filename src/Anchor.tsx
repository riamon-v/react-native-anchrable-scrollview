import React from "react"
import { View, ViewProps } from "react-native"

interface AnchorProps extends ViewProps {
    name: string;
    // ref: any,
}

const Anchor = React.forwardRef((props : AnchorProps, ref) => {
    return (
        <View 
            ref={ref}
            {...props}
        />
    )
})

export {Anchor}