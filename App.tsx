import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import AnchrableScrollView, { Anchor } from './src/AnchrableScrollView';

export default function App() {
  const ref = React.useRef();
  const anchorsRef = [
    React.createRef(),
    React.createRef(),
  ]
  const anchor = React.createRef()

  return (
    <AnchrableScrollView
      ref={ref}
    >
      <Button
        title="Anchor1"
        onPress={() => {
          // console.log(ref.current)
          ref?.current?.goToAnchor("#0")
        }}
      />
      <Button
        title="Anchor2"
        onPress={() => {
          // console.log(ref.current)
          ref?.current?.goToAnchor("#1")
        }}
      />
      <Button
        title="Anchor3"
        onPress={() => {
          // console.log(ref.current)
          ref?.current?.goToAnchor("#3")
        }}
      />
      {
       anchorsRef.map((e, index) => (
          <View key={`${index}`}>
            <Anchor 
              ref={e}
              name={`#${index}`}
              index={index}
              nbAnchors={anchorsRef.length}
            >
              <Text>ANCHOR #{index}</Text>
            </Anchor>
          <View style={{
            height: Dimensions.get('screen').height,
            borderWidth: 1,
            borderColor: 'red',
            justifyContent: 'space-between'
          }}>
            <Text>Here I am</Text>
            <Text>Here I am</Text>
          </View>
          </View>
        ))
      }
      <Anchor name="#3" ref={anchor} style={{height: 1000, borderWidth: 1, borderColor: 'green'}}/>
    </AnchrableScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
