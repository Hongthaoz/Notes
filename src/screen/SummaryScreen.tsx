import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { scale } from "../utils/scale";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { Category } from "../types";
import { useNotesStore } from "../store/notes";

const categories: { id: number; title: Category; avatar: any }[] = [
    { id: 1, title: "Work and Study", avatar: require("../assets/avtWork.png") },
    { id: 2, title: "Life", avatar: require("../assets/avtHome.png") },
    { id: 3, title: "Health and Well-being", avatar: require("../assets/avtHealth.png") },
];

const SummaryScreen = ({ navigation }: any) => {
    const { notes } = useNotesStore();

    const summaryData = categories.map((cat) => ({
        ...cat,
        count: notes.filter((n) => n.category === cat.title).length,
    }));

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#1B284F", "#351159", "#421C45", "#3B184E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.containerHeader}>
                <Text style={styles.header}>Summary</Text>

                <View style={styles.robotWrap}>
                    <LinearGradient
                        colors={["#1B284F", "#351159", "#713294"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.robotFill}
                    />
                    <Image source={require("../assets/robot.png")} style={styles.robot} />
                </View>
            </View>

            <View style={styles.containerBody}>
                {summaryData.map((cat) => (
                    <View key={cat.id} style={styles.itemBox}>
                        <View style={styles.row}>
                            <Image source={cat.avatar} style={styles.avatar} />
                            <Text style={styles.title}>{cat.title}</Text>
                            <TouchableOpacity
                                style={styles.detailBtn}
                                onPress={() => navigation.navigate("SummaryDetail", { category: cat.title })}>
                                <Text style={styles.detailText}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.subText}>
                            This topic has a total of {cat.count} records.
                        </Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default SummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    containerHeader: {
        backgroundColor: "transparent",
        borderBottomLeftRadius: scale(24),
        borderBottomRightRadius: scale(24),
        paddingVertical: scale(16),
        paddingHorizontal: scale(20),
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
        marginBottom: scale(20)
    },
    robotWrap: {
        width: scale(268),
        height: scale(268),
        borderRadius: scale(134),
        position: "absolute",
        top: scale(-145),
        right: scale(-30),
        overflow: "hidden",
        shadowColor: "#713294",
        shadowOffset: { width: 4, height: 15 },
        shadowOpacity: 0.38,
        shadowRadius: scale(30),
        elevation: scale(20),
    },
    robotFill: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: scale(134),
    },
    robot: {
        position: "absolute",
        right: scale(30),
        bottom: scale(18),
        resizeMode: "contain",
    },
    header: {
        fontSize: Fonts.size.xlarge,
        fontWeight: Fonts.weight.semibold,
        fontFamily: "PingFang SC",
        color: Colors.white,
    },
    containerBody: {
        flex: 1,
        padding: scale(16),
        marginTop: scale(50),
    },
    itemBox: {
        backgroundColor: "rgba(255,255,255,0.07)",
        borderRadius: scale(16),
        padding: scale(16),
        marginBottom: scale(20),
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    title: {
        flex: 1,
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.regular,
        color: Colors.white,
        fontFamily: 'PingFang SC'
    },
    detailBtn: {
        backgroundColor: Colors.pink,
        paddingVertical: scale(6),
        paddingHorizontal: scale(14),
        borderRadius: scale(20)
    },
    detailText: {
        color: Colors.white,
        fontWeight: Fonts.weight.semibold,
        fontSize: Fonts.size.small,
        fontFamily: 'PingFang SC'
    },
    subText: {
        color: Colors.gray,
        fontWeight: Fonts.weight.regular,
        fontSize: Fonts.size.small,
        fontFamily: 'PingFang SC',
        marginTop: scale(12)
    },
});
