import React from "react"
import { View, ViewProps } from "react-native"

interface AnchorProps extends ViewProps {
    name: string;
    children?: React.ReactNode
    ref?: React.RefObject<View>,
}

const Anchor = React.forwardRef((props : AnchorProps, ref?: React.Ref<View>) => {
    return (
        <View 
            ref={ref}
            {...props}
        />
    )
})

export {Anchor}