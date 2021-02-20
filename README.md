
# react-native-anchrable-scrollview
* * *

A simple component that allow you to put anchors inside any children of a scrollview to directly go to its position.
* Each component accepts props of the initial react-native component
* Typescript support

### Installation

If using yarn:

```shell 
$ yarn add react-native-anchrable-scrollview
```
If using npm:

```shell 
$ npm i react-native-anchrable-scrollview
```

### List of components

* `AnchrableScrollView` which is a component based on react-native Scrollview that calculates positions of Anchors inside and provide a `goToAnchor`function
* `Anchor`which is a component base on react-native View component
* `HeaderAnchors` which is a horizontal scrollview including buttons for each anchor inside the AnchrableScrollView

### Usage

``` javascript
import AnchrableScrollView, { Anchor } from 'react-native-anchrable-scrollview'
```

Wrap all your anchors component inside one top parent `AnchrableScrollView` component, and give a name to each anchor.

The `AnchrableScrollView` component will look for all `Anchors` components inside itself recursively. 
Then you can put an anchor whereever you want in the component tree, as long as the top parent is an `AnchrableScrollView`

###### Basic Usage
* Create a ref for the scrollView
* Create an array of refs for the anchors
* useCallback on the provided function goToAnchor

``` js
function App() {
  // Ref of the scrollView
  const ref = React.useRef();

  //Array representing anchors
  const anchorsRef = [
   {name: "#1", label: "My first section", ref: React.createRef()},
   {name: "#2", label: "Second veryyyyyyyy long section", ref: React.createRef()},
   {name: "#3", label: "Third section", ref: React.createRef()}
  ]

  const goToAnchor = React.useCallback(name => ref.current?.goToAnchor?.(name), [ref?.current])

  return (
    <View style={{marginTop: 50}}>
      <Button onPress={() => goToAnchor("#1")} title={anchorsRef[0].label}/>
      <Button onPress={() => goToAnchor("#2")} title={anchorsRef[1].label}/>
      <Button onPress={() => goToAnchor("#3")} title={anchorsRef[2].label}/>
      <AnchrableScrollView
        ref={ref}
      >
        <View>
         <Anchor name={anchorsRef[0].name} ref={anchorsRef[0].ref} style={{height: 1000, borderWidth: 1, borderColor: 'green'}}/>
         <Anchor name={anchorsRef[1].name} ref={anchorsRef[1].ref} style={{height: 1000, borderWidth: 1, borderColor: 'green'}}/>
         </View>
        <Anchor name={anchorsRef[2].name} ref={anchorsRef[2].ref} style={{height: 1000, borderWidth: 1, borderColor: 'green'}}/>
      </AnchrableScrollView>
    </View>
  );
}
```

###### Better Usage

* Map throw the anchorsRef array to make section with anchors.
* Use [`HeaderAnchors`](#HeaderAnchors) component to have as many buttons as anchors

``` javascript
import AnchrableScrollView, { Anchor, HeaderAnchors } from 'react-native-anchrable-scrollview'

function App() {
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
            height: 700,
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
```

<!-- ### Demo -> Show me what you got

[Link to your awesome Demo](#) 

[Another Link to your awesome Demo](#) -->


### Documentation

#### AnchrableScrollView

> PROPS

| Name | Description | Details | Type |
|------|-------------|---------|------|
| ref  | Ref of the container: React.useRef() | *required* | React.RefObject<ScrollView> |
| children | Children pass inside the scrollview | *required* | React.ReactNode |

| Accepts any props of the [`ScrollView` Component](https://reactnative.dev/docs/scrollview#props) of react-native| 
|---|

> REF METHODS

| Name | Description | Details |
|------|-------------|---------|
| goToAnchor  | function provided to move to a specific anchor specifying the name | **params:** anchorName |

| The ref contains the reference of the actual scrollView |
|---|
| You can access all [method of standard ScrollView](https://reactnative.dev/docs/scrollview#methods) with <br> `ref?.current?._scrollView?.current.method`|

#### Anchor

> PROPS

| Name | Description | Details | Type |
|------|-------------|---------|------|
| name | Name to identify the anchor | *required* | string |
| ref  | Ref of the container: React.createRef() | *required* | React.RefObject<View> |
| children | Children pass inside the view | *not required* | React.ReactNode |


#### HeaderAnchors

### Contributing

Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.
Keep it simple. Keep it minimal. Don't put every single feature just because you can.

Working on your first Pull Request? You can learn how from this free series How to Contribute to an Open Source Project on GitHub

### Authors or Acknowledgments

*   Vincent Riamon

### License

This project is licensed under the MIT License