import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import AnchrableScrollView, { Anchor, HeaderAnchors } from './src/AnchrableScrollView';

export default function App() {
  const ref = React.useRef();
  const anchorsRef = [
   {name: "#1", label: "My first section", ref: React.createRef()},
   {name: "#2", label: "Second veryyyyyyyy long section", ref: React.createRef()}
  ]
  const anchor =  {name: "#3", label: "Third section", ref: React.createRef()}

  const goToAnchor = React.useCallback(name => ref.current?.goToAnchor?.(name), [ref?.current])

  return (
    <View style={{marginTop: 50}}>
    <HeaderAnchors 
      anchors={[...anchorsRef, anchor]}
      goToAnchor={goToAnchor}
    />
    <AnchrableScrollView
      ref={ref}
    >
      {
       anchorsRef.map((e, index) => (
          <View key={`${index}`}>
            <Anchor 
              ref={e.ref}
              name={e.name}
            >
              <Text>{e.label}</Text>
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
      <Anchor name={anchor.name} ref={anchor.ref} style={{height: 1000, borderWidth: 1, borderColor: 'green'}}/>
    </AnchrableScrollView>
    </View>
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
