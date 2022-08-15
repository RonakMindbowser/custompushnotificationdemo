// import React, { useState } from "react";
// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import DraggableFlatList, {
//   ScaleDecorator,
// } from "react-native-draggable-flatlist";

// const NUM_ITEMS = 10;
// function getColor(i) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     key: `item-${index}`,
//     label: String(index) + "",
//     backgroundColor,
//   };
// });

// export default function App() {
//   const [data, setData] = useState(initialData);

//   const renderItem = ({ item, drag, isActive }) => {
//     return (
//       <TouchableOpacity
//         onLongPress={drag}
//         disabled={isActive}
//         style={[
//           styles.rowItem,
//           { backgroundColor: isActive ? "red" : item.backgroundColor },
//         ]}
//       >
//         <Text style={styles.text}>{item.label}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <DraggableFlatList
//       data={data}
//       onDragEnd={({ data }) => setData(data)}
//       keyExtractor={(item) => item.key}
//       renderItem={({ item, drag, isActive }) => {
//         return (
//           <TouchableOpacity
//             onLongPress={drag}
//             disabled={isActive}
//             style={[
//               styles.rowItem,
//               { backgroundColor: isActive ? "red" : item.backgroundColor },
//             ]}
//           >
//             <Text style={styles.text}>{item.label}</Text>
//           </TouchableOpacity>
//         );
//       }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   rowItem: {
//     height: 100,
//     width: 400,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });


// import React, { createRef } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   Image,
//   Dimensions,
//   SafeAreaView
// } from 'react-native';
// import { AnySizeDragSortableView } from 'react-native-drag-sort';

// const { width } = Dimensions.get('window')
// const headerViewHeight = 160
// const bottomViewHeight = 40

// const getW = (index, isWidth) => isWidth ? index % 3 === 0 ? (width - 40) : (width - 60) / 2 : 80;
// // const getW = (index, isWidth) => 120 + Math.floor((Math.random() - 0.5) * 100);
// // const getW = (index, isWidth) => 150;

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     const items = []
//     for (let i = 0; i < 26; i++) {
//       items.push({
//         text: String.fromCharCode(65 + i),
//         width: getW(i, true),
//         height: getW(i, false)
//       })
//     }
//     this.state = {
//       items,
//       movedKey: null
//     };

//     this.sortableViewRef = createRef()
//   }

//   onDeleteItem = (item, index) => {
//     const items = [...this.state.items]
//     items.splice(index, 1)
//     this.setState({ items })
//   }

//   _renderItem = (item, index, isMoved) => {
//     const { movedKey } = this.state
//     return (
//       <TouchableOpacity
//         onLongPress={() => {
//           this.setState({ movedKey: item.text })
//           this.sortableViewRef.current.startTouch(item, index)
//         }}
//         onPressOut={() => this.sortableViewRef.current.onPressOut()}
//       >
//         <View style={[styles.item_wrap, { opacity: (movedKey === item.text && !isMoved) ? 1 : 1 }]}>
//           {
//             <View style={styles.item_clear_wrap}>
//               <TouchableOpacity onPress={() => this.onDeleteItem(item, index)}>
//                 {/* <Image source={require('../data/img/clear.png')} style={styles.item_clear} /> */}
//               </TouchableOpacity>
//             </View>
//           }
//           <View style={[styles.item, { width: item.width, height: item.height, backgroundColor: isMoved ? 'red' : '#f39c12' }]}>

//             <View style={styles.item_text_swipe}>
//               <Text style={styles.item_text}>{item.text}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     )
//   }

//   render() {
//     const { items } = this.state;
//     const renderHeaderView = (
//       <View style={styles.aheader}>
//         <Image source={{ uri: 'https://avatars0.githubusercontent.com/u/15728691?s=460&v=4' }} style={styles.aheader_img} />
//         <View style={styles.aheader_context}>
//           <Text style={styles.aheader_title}>mochixuan</Text>
//           <Text style={styles.aheader_desc}>Android, React-Native, Flutter, React, Web。Learn new knowledge and share new knowledge.</Text>
//         </View>
//       </View>
//     )
//     const renderBottomView = (
//       <View style={styles.abottom}>
//         <Text style={styles.abottom_desc}>yarn add react-native-drag-sort</Text>
//       </View>
//     )
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//         <View style={styles.header}>
//           <Text style={styles.header_title}>AnySize</Text>
//         </View>
//         <AnySizeDragSortableView
//           ref={this.sortableViewRef}
//           dataSource={items}
//           keyExtractor={(item) => item.text}
//           renderItem={this._renderItem}
//           onDataChange={(data, callback) => {
//             this.setState({ items: data }, () => {
//               callback()
//             })
//           }}
//           headerViewHeight={headerViewHeight}
//           renderBottomView={renderBottomView}
//           bottomViewHeight={bottomViewHeight}
//           movedWrapStyle={styles.item_moved}
//           onDragEnd={() => {
//             this.setState({
//               movedKey: null
//             })
//           }}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   item_wrap: {
//     position: 'relative',
//     paddingLeft: 20,
//     paddingTop: 20
//   },
//   item: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#f39c12',
//     borderRadius: 4,
//   },
//   item_clear_wrap: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//     width: 20,
//     height: 20,
//     zIndex: 999
//   },
//   item_clear: {
//     width: 20,
//     height: 20
//   },
//   item_moved: {
//     opacity: 0.95,
//     borderRadius: 4,
//     backgroundColor: "blue",
//     opacity: 0
//   },
//   item_icon_swipe: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 50 * 0.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item_icon: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   item_text_swipe: {
//     backgroundColor: '#fff',
//     width: 56,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item_text: {
//     color: '#444',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   header: {
//     height: 48,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomColor: '#2ecc71',
//     borderBottomWidth: 2,
//   },
//   header_title: {
//     color: '#333',
//     fontSize: 24,
//     fontWeight: 'bold'
//   },
//   aheader: {
//     height: headerViewHeight,
//     flexDirection: 'row',
//     borderBottomColor: '#2ecc71',
//     borderBottomWidth: 2,
//     zIndex: 100,
//     backgroundColor: '#fff'
//   },
//   aheader_img: {
//     width: headerViewHeight * 0.6,
//     height: headerViewHeight * 0.6,
//     resizeMode: 'cover',
//     borderRadius: headerViewHeight * 0.3,
//     marginLeft: 16,
//     marginTop: 10,
//   },
//   aheader_context: {
//     marginLeft: 8,
//     height: headerViewHeight * 0.4,
//     marginTop: 10
//   },
//   aheader_title: {
//     color: '#333',
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: 'bold'
//   },
//   aheader_desc: {
//     color: '#444',
//     fontSize: 16,
//     width: width - headerViewHeight * 0.6 - 32
//   },
//   abottom: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: bottomViewHeight,
//     backgroundColor: '#fff',
//     zIndex: 100,
//     borderTopColor: '#2ecc71',
//     borderTopWidth: 2,
//   },
//   abottom_desc: {
//     color: '#333',
//     fontSize: 20,
//     fontWeight: 'bold'
//   }
// });

// import React, { Component } from 'react'
// import {
//   StyleSheet,
//   Text,
//   View
// } from 'react-native'
// import SortableGrid from './src/SortableGrid'

// // import SortableGrid from 'react-native-sortable-grid'

// export default class basicExample extends Component {

//   constructor() {
//     super()
//     this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F',
//       'G', 'H', 'I', 'J',
//     ]
//   }

//   getColor() {
//     let r = this.randomRGB()
//     let g = this.randomRGB()
//     let b = this.randomRGB()
//     return 'rgb(' + r + ', ' + g + ', ' + b + ')'
//   }
//   randomRGB = () => 160 + Math.random() * 85

//   render() {
//     return (
//       <SortableGrid
//         blockTransitionDuration={400}
//         activeBlockCenteringDuration={200}
//         itemsPerRow={10}
//         itemHeight={100}
//         itemWidth={100}
//         dragActivationTreshold={200}
//         onDragRelease={(itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder)}
//         onDragStart={() => console.log("Some block is being dragged now!")}
//       >
//         {
//           this.alphabets.map((letter, index) =>
//             <View key={index} style={[styles.block, { backgroundColor: this.getColor() }]}>
//               <Text style={{ color: 'white', fontSize: 50 }}>{letter}</Text>
//             </View>
//           )
//         }
//       </SortableGrid>
//     )
//   }

// }

// const styles = StyleSheet.create({
//   block: {
//     margin: 8,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 100, width: 100
//   }
// });


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React, { useCallback, useEffect, useMemo, useRef } from 'react';
// import {
//   Animated,
//   Easing,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import SortableList from 'react-native-sortable-list';

// const window = Dimensions.get('window');

// const data = {
//   0: {
//     image: 'https://placekitten.com/200/240',
//     text: 'Chloe',
//   },
//   1: {
//     image: 'https://placekitten.com/200/201',
//     text: 'Jasper',
//   },
//   2: {
//     image: 'https://placekitten.com/200/202',
//     text: 'Pepper',
//   },
//   3: {
//     image: 'https://placekitten.com/200/203',
//     text: 'Oscar',
//   },
//   4: {
//     image: 'https://placekitten.com/200/204',
//     text: 'Dusty',
//   },
//   5: {
//     image: 'https://placekitten.com/200/205',
//     text: 'Spooky',
//   },
//   6: {
//     image: 'https://placekitten.com/200/210',
//     text: 'Kiki',
//   },
//   7: {
//     image: 'https://placekitten.com/200/215',
//     text: 'Smokey',
//   },
//   8: {
//     image: 'https://placekitten.com/200/220',
//     text: 'Gizmo',
//   },
//   9: {
//     image: 'https://placekitten.com/220/239',
//     text: 'Kitty',
//   },
// };

// const list = [
//   {
//     image: 'https://placekitten.com/200/240',
//     text: 'Chloe',
//   },
//   {
//     image: 'https://placekitten.com/200/201',
//     text: 'Jasper',
//   },
//   {
//     image: 'https://placekitten.com/200/202',
//     text: 'Pepper',
//   },
//   {
//     image: 'https://placekitten.com/200/203',
//     text: 'Oscar',
//   },
//   {
//     image: 'https://placekitten.com/200/204',
//     text: 'Dusty',
//   },
//   {
//     image: 'https://placekitten.com/200/205',
//     text: 'Spooky',
//   },
// ]

// export default function Horizontal() {
//   const renderRow = useCallback(({ data, active }) => {
//     return <Row data={data} active={active} />;
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>React Native Sortable List</Text>
//       <SortableList
//         horizontal
//         style={styles.list}
//         contentContainerStyle={styles.contentContainer}
//         data={list}
//         renderRow={renderRow}
//         onChangeOrder={(nextOrder) => {
//           console.log("onChangeOrder", nextOrder)
//         }}
//         onReleaseRow={(key, currentOrder) => {
//           console.log("onReleaseRow currentOrder", currentOrder)
//           console.log("onReleaseRow key", key)
//           let tempOrder = currentOrder
//           let temp = list;
//           let finalSortedList = tempOrder.map((obj) => {
//             let value = temp.find((data, key) => {
//               return key == Number(obj)
//             })
//             return value;
//           })
//           console.log("finalSortedList key", finalSortedList)
//         }}
//       />
//     </View>
//   );
// }

// function Row(props) {
//   const { active, data } = props;

//   // const activeAnim = useRef(new Animated.Value(0));
//   // const style = useMemo(
//   //   () => ({
//   //     ...Platform.select({
//   //       ios: {
//   //         transform: [
//   //           {
//   //             scale: activeAnim.current.interpolate({
//   //               inputRange: [0, 1],
//   //               outputRange: [1, 1.1],
//   //             }),
//   //           },
//   //         ],
//   //         shadowRadius: activeAnim.current.interpolate({
//   //           inputRange: [0, 1],
//   //           outputRange: [2, 10],
//   //         }),
//   //       },

//   //       android: {
//   //         transform: [
//   //           {
//   //             scale: activeAnim.current.interpolate({
//   //               inputRange: [0, 1],
//   //               outputRange: [1, 1.07],
//   //             }),
//   //           },
//   //         ],
//   //         elevation: activeAnim.current.interpolate({
//   //           inputRange: [0, 1],
//   //           outputRange: [2, 6],
//   //         }),
//   //       },
//   //     }),
//   //   }),
//   //   [],
//   // );
//   useEffect(() => {
//     // Animated.timing(activeAnim.current, {
//     //   duration: 300,
//     //   easing: Easing.bounce,
//     //   toValue: Number(active),
//     //   useNativeDriver: true,
//     // }).start();
//   }, [active]);

//   return (
//     <View style={[styles.row,]}>
//       <Image source={{ uri: data.image }} style={styles.image} />
//       <Text style={styles.text}>{data.text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',

//     ...Platform.select({
//       ios: {
//         paddingTop: 20,
//       },
//     }),
//   },

//   title: {
//     fontSize: 20,
//     paddingVertical: 20,
//     color: '#999999',
//   },

//   list: {
//     height: 210,
//     width: window.width,
//   },

//   contentContainer: {
//     ...Platform.select({
//       ios: {
//         paddingVertical: 30,
//       },

//       android: {
//         paddingVertical: 0,
//       },
//     }),
//   },

//   row: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//     width: 110,
//     height: 150,
//     marginHorizontal: 10,
//     borderRadius: 4,

//     ...Platform.select({
//       ios: {
//         shadowColor: 'rgba(0,0,0,0.2)',
//         shadowOpacity: 1,
//         shadowOffset: { height: 2, width: 2 },
//         shadowRadius: 2,
//       },

//       android: {
//         elevation: 0,
//       },
//     }),
//   },

//   image: {
//     width: 50,
//     height: 50,
//     marginBottom: 15,
//     borderRadius: 25,
//   },

//   text: {
//     fontSize: 18,
//     color: '#222222',
//   },
// });

// import React, { Component } from 'react';
// import { Dimensions, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from './src/mapsdirection/MapViewDirection';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const GOOGLE_MAPS_APIKEY = 'AIzaSyCNrm4G9EmQ_hpcOB63gXfZmIXmrWUZLvQ';

// class Example extends Component {

//   constructor(props) {
//     super(props);

//     // AirBnB's Office, and Apple Park
//     this.state = {
//       coordinates: [
//         {
//           latitude: 37.3317876,
//           longitude: -122.0054812,
//         },
//         {
//           latitude: 37.771707,
//           longitude: -122.4053769,
//         },
//       ],
//     };

//     this.mapView = null;
//   }

//   onMapPress = (e) => {
//     this.setState({
//       coordinates: [
//         ...this.state.coordinates,
//         e.nativeEvent.coordinate,
//       ],
//     });
//   }

//   render() {
//     return (
//       <MapView
//         initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }}
//         style={StyleSheet.absoluteFill}
//         ref={c => this.mapView = c}
//         onPress={this.onMapPress}
//       >
//         {this.state.coordinates.map((coordinate, index) =>
//           <Marker key={`coordinate_${index}`} coordinate={coordinate} />
//         )}
//         {(this.state.coordinates.length >= 2) && (
//           <MapViewDirections
//             origin={this.state.coordinates[0]}
//             waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : undefined}
//             destination={this.state.coordinates[this.state.coordinates.length - 1]}
//             apikey={GOOGLE_MAPS_APIKEY}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             optimizeWaypoints={true}
//             onStart={(params) => {
//               console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//             }}
//             onReady={result => {
//               console.log(`Distance: ${result.distance} km`)
//               console.log(`Duration: ${result.duration} min.`)

//               this.mapView.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: (width / 20),
//                   bottom: (height / 20),
//                   left: (width / 20),
//                   top: (height / 20),
//                 }
//               });
//             }}
//             onError={(errorMessage) => {
//               // console.log('GOT AN ERROR');
//             }}
//           />
//         )}
//       </MapView>
//     );
//   }
// }

// export default Example;

import React from 'react';
import { Text, View } from 'react-native';
import AppleHealthKitIOSScreen from './src/AppleHealthKitIOSScreen';

const App = ({
  params,
}) => (
  <AppleHealthKitIOSScreen />
);

export default App;
