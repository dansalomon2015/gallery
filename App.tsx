import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import FastImage from "react-native-fast-image";

const { width, height } = Dimensions.get("screen");

const files = [
    require("./src/images/01.jpg"),
    require("./src/images/02.jpg"),
    require("./src/images/03.jpg"),
    require("./src/images/04.jpg"),
    require("./src/images/05.jpg"),
    require("./src/images/06.jpg"),
];

const App = () => {
    const viewerRef = useRef<FlatList>(null);
    const thumbnailsRef = useRef<FlatList>();

    const [selected, setSelected] = useState(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const xPos = event.nativeEvent.contentOffset.x;
        const current = Math.ceil(xPos / width);
        if (current >= 0) {
            setSelected(current);
            if (current < files.length) {
                if (thumbnailsRef.current) {
                    thumbnailsRef.current.scrollToIndex({
                        animated: true,
                        index: current,
                    });
                }
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} />
            <View style={{ flex: 1, backgroundColor: "#000" }}>
                <FlatList
                    data={files}
                    keyExtractor={(_, index) => index.toString()}
                    snapToInterval={width}
                    onScroll={onScroll}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.imageContainer}>
                                <FastImage source={item} resizeMode="contain" style={{ width }} />
                            </View>
                        );
                    }}
                    horizontal
                    ref={viewerRef}
                    bounces={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width,
    },
});

export default App;
