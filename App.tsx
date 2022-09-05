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
    Pressable,
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
    const thumbnailsRef = useRef<FlatList>(null);

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

    const selectImg = (index: number) => {
        if (index < files.length && viewerRef.current) {
            viewerRef.current.scrollToIndex({
                animated: true,
                index,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} />
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <FlatList
                    data={files}
                    keyExtractor={(_, index) => index.toString()}
                    snapToInterval={width}
                    onScroll={onScroll}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.imageContainer} key={index}>
                                <FastImage source={item} resizeMode="cover" style={{ width, height: "100%" }} />
                            </View>
                        );
                    }}
                    horizontal
                    ref={viewerRef}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Thumbnails */}
            <View style={styles.thumbnails_container}>
                <FlatList
                    data={files}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable
                                style={[styles.thumbnails, selected == index ? styles.selected : null]}
                                onPress={() => selectImg(index)}
                            >
                                <Image source={item} style={[styles.thumbnails_img]} resizeMethod="auto" />
                            </Pressable>
                        );
                    }}
                    horizontal
                    ref={thumbnailsRef}
                    showsHorizontalScrollIndicator={false}
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
    thumbnails_container: {
        height: 105,
        justifyContent: "center",
        position: "absolute",
        left: 0,
        bottom: 50,
    },
    thumbnails: {
        width: 80,
        height: 80,
        marginHorizontal: 15,
        marginTop: 15,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 20,
        overflow: "hidden",
    },
    thumbnails_img: {
        width: "100%",
        height: "100%",
    },
    selected: {
        borderWidth: 4,
        borderColor: "yellow",
    },
});

export default App;
