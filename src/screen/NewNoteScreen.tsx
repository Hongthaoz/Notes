import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { arrow_back } from "../svgXml";
import { useNotesStore } from "../store/notes";
import { Category, Note } from "../types";
import uuid from "react-native-uuid";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { scale, verticalScale } from "../utils/scale";

const categories: Category[] = ["Work and Study", "Life", "Health and Well-being"];
const HEADER_HEIGHT = 112;

const NewNoteScreen = ({ navigation }: any) => {
    const { addNote } = useNotesStore();
    const [category, setCategory] = useState<Category>("Work and Study");
    const [content, setContent] = useState("");

    const handleSave = () => {
        if (!content.trim()) return;
        const newNote: Note = {
            id: uuid.v4().toString(),
            category,
            content: content.trim(),
            createdAt: Date.now(),
        };
        addNote(newNote);
        setCategory("Work and Study");
        setContent("");
        navigation.goBack();
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
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
                            <SvgXml xml={arrow_back} width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>New note</Text>
                    </View>
                </LinearGradient>

                <ScrollView contentContainerStyle={styles.containerScroll}>
                    <View style={styles.selectBox}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryItem,
                                    category === cat && styles.categoryActive,
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        category === cat && styles.categoryTextActive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                        <TextInput
                            style={styles.input}
                            placeholder="Please input note content"
                            placeholderTextColor="#aaa"
                            value={content}
                            onChangeText={(text) => {
                                setContent(text.slice(0, 200));
                            }}

                            multiline
                        />
                        <Text style={styles.wordCount}>
                            {content.length}/200 words
                        </Text>
                    </KeyboardAvoidingView>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleSave}>
                        <LinearGradient
                            colors={["#F94695", "#F13A76"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.btnSave}
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

export default NewNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerGradient: {
        height: HEADER_HEIGHT,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    headerContent: {
        paddingHorizontal: scale(20),
        paddingTop: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: Fonts.size.xlarge,
        fontWeight: Fonts.weight.medium,
        fontFamily: 'PingFang SC',
        color: Colors.white,
    },
    btnBack: {
        justifyContent: "center",
        marginRight: scale(8)
    },
    containerScroll: {
        padding: scale(16),
        paddingTop: scale(20)
    },
    containerBody: {
        flex: 1,
        padding: 16,
    },
    selectBox: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: scale(8),
        marginBottom: scale(16),
    },
    categoryItem: {
        paddingVertical: scale(6),
        paddingHorizontal: scale(12),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fff",
    },
    categoryActive: {
        backgroundColor: Colors.pink,
        borderColor: Colors.pink,
    },
    categoryText: {
        color: Colors.white,
        fontSize: Fonts.size.tiny,
        fontFamily: "PingFang SC",
        fontWeight: Fonts.weight.regular,
    },
    categoryTextActive: {
        color: Colors.white,
        fontSize: Fonts.size.tiny,
        fontFamily: "PingFang SC",
        fontWeight: Fonts.weight.semibold,
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 12,
        color: "#fff",
        minHeight: 120,
        textAlignVertical: "top",
    },
    wordCount: {
        color: "#aaa",
        marginTop: 8,
        alignSelf: "flex-end",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1C0B37",
        height: verticalScale(100),
        borderTopLeftRadius: scale(16),
        borderTopRightRadius: scale(16),
        alignItems: "center",
        justifyContent: "center",
    },
    btnSave: {
        width: scale(200),
        height: scale(34),
        borderRadius: scale(16),
        alignItems: "center",
        justifyContent: 'center',
    },
    btnText: {
        color: Colors.white,
        fontWeight: Fonts.weight.regular,
        fontSize: Fonts.size.small,
        fontFamily: 'PingFang SC'
    },
});
