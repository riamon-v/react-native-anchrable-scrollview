import React from 'react'
import { findNodeHandle } from 'react-native';
import { Anchor } from './Anchor';

interface MeasurementType {
    x: number,
    y: number,
    width: number,
    height: number,
}

const useAnchorsMeasurements = (
        children: React.ReactNode,
        parentContainer: React.RefObject<any>,
        deps: Array<any> = []) => {

    const [measurements, setMeasurements] =React.useState<Map<string, MeasurementType> | undefined>(undefined)

    const visitAllChildren = (element: React.ReactNode, callback: (c: any) => void) => {
        React.Children.forEach(element, (child) => {
            if (!React.isValidElement(child)) {
                return child;
            }

            if (child?.props?.children) {
                visitAllChildren(child.props.children, callback);
            }

            return callback(child)
        });
      }

      React.useLayoutEffect(() => {
        const map: Map<string, MeasurementType> = new Map()

        visitAllChildren(children, (c) => {
            // console.log("HERE", c)
            if (c.type === Anchor) {
                c?.ref?.current?.measureLayout(findNodeHandle(parentContainer?.current), 
                (x: number, y: number, width: number, height: number) => {
                    map.set(c.props.name, {x, y, width, height})
                        //    setMeasurement({x, y, width, height})
                },
                () => {
                    console.warn("Failing to get measurements for anchor ", c.props.name)
                })
            }
        })
        setMeasurements(map)
    }, [parentContainer, children, ...deps])

    return measurements
}

export default useAnchorsMeasurements