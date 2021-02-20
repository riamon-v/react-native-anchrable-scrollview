import React from "react"
import { ScrollView, ScrollViewProps, TouchableOpacity, Text, StyleSheet } from 'react-native'

interface HeaderAnchorsProps extends ScrollViewProps {
    anchors: any
    tagStyle?: any,
    tagTextStyle?: any,
    goToAnchor: (name: string) => void 
}

const HeaderAnchors = (props: HeaderAnchorsProps) => {

    return (
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingVertical: 5
            }}
            {...props}
        >
            {
                props.anchors?.map((a: any, index: number) => 
                <TouchableOpacity
                    key={`headerButton#${index}`}
                    onPress={() => props.goToAnchor(a.name)}
                    style={[styles.tag, props.tagStyle]}
                >
                    <Text style={[styles.tagText, props.tagTextStyle]}>{a?.label || `Anchor ${index}`}</Text>
                </TouchableOpacity>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tag: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "darkgrey",
        backgroundColor: 'dodgerblue',
        marginHorizontal: 5,
    },
    tagText: {
        color:"white"
    }
})

export {HeaderAnchors}