import { StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { arrow_back } from "../svgXml";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { scale } from "../utils/scale";
import { useNotesStore } from "../store/notes";
import { Note } from "../types";

const HEADER_HEIGHT = 112;

const SummaryDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { notes } = useNotesStore();
    const category = route.params?.category;

    const filteredNotes = notes.filter((n) => n.category === category);

    const renderItem = ({ item }: { item: Note }) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleString();
        return (
            <View style={styles.noteItem}>
                <Text style={styles.noteText}>{item.content}</Text>
                <Text style={styles.noteDate}>{formattedDate}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <LinearGradient
                colors={["#1B284F", "#351159", "#421C45", "#3B184E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    colors={["#240D38", "#330F52"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.headerGradient}
                >
                    <SafeAreaView style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
                            <SvgXml xml={arrow_back} width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{category} Notes</Text>
                    </SafeAreaView>
                </LinearGradient>

                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.noteText}>No notes found.</Text>}
                    style={styles.containerFlat}
                    contentContainerStyle={styles.bottomFlat}
                    showsVerticalScrollIndicator={false}
                />

            </LinearGradient>
        </View>
    );
};

export default SummaryDetailScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerGradient: {
        height: HEADER_HEIGHT,
        paddingHorizontal: scale(20),
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: "hidden",
        justifyContent: "flex-end",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    btnBack: {
        justifyContent: "center"
    },
    headerText: {
        fontSize: Fonts.size.xlarge,
        fontWeight: Fonts.weight.medium,
        fontFamily: "PingFang SC",
        color: Colors.white,
        marginLeft: scale(4),
    },
    containerFlat: {
        padding: scale(16),
        paddingTop: scale(20),
    },
    noteItem: {
        backgroundColor: "rgba(255,255,255,0.07)",
        borderRadius: scale(16),
        padding: scale(16),
        marginBottom: scale(20),
    },
    noteText: {
        color: Colors.white,
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.regular,
        fontFamily: 'PingFang SC'
    },
    noteDate: {
        color: Colors.gray,
        fontSize: Fonts.size.small,
        fontWeight: Fonts.weight.regular,
        fontFamily: 'PingFang SC',
        marginTop:scale(8)
    },
    bottomFlat: {
        paddingBottom: scale(112)
    }
});
