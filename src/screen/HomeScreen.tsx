import { StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SvgXml } from "react-native-svg";

import { arrow_pink, bell, circle, clock, icon_setting, tag } from "../svgXml";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { useNotesStore } from "../store/notes";
import { scale } from "../utils/scale";
import { Category, Note } from "../types";
import { useState } from "react";

const HEADER_HEIGHT = 112;

interface CategoryType {
    title: Category;
    icon: string;
}

const categories: CategoryType[] = [
    { title: "Work and Study", icon: tag },
    { title: "Life", icon: bell },
    { title: "Health and Well-being", icon: circle },
];

const HomeScreen = ({ navigation }: any) => {
    const { notes } = useNotesStore();
    const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <LinearGradient
                colors={["#1B284F", "#351159", "#421C45", "#3B184E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bodyGradient}
            >
                <LinearGradient
                    colors={["#240D38", "#330F52"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.headerText}>Home</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                            <SvgXml xml={icon_setting} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.containerScroll}>
                    <View style={styles.headerBody}>
                        <SvgXml xml={clock} />
                        <Text style={styles.txtHeader}>Recently created notes</Text>
                    </View>

                    {categories.map((cat) => {
                        const categoryNotes = notes
                            .filter((n: Note) => n.category === cat.title)
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .slice(0, 3);

                        if (categoryNotes.length === 0) return null;

                        return (
                            <View key={cat.title} style={styles.categoryBox}>
                                <View style={styles.categoryHeader}>
                                    <SvgXml xml={cat.icon} />
                                    <Text style={styles.categoryTitle}>{cat.title}</Text>
                                </View>

                                {categoryNotes.map((note: Note) => (
                                    <TouchableOpacity
                                        key={note.id}
                                        style={styles.noteItem}
                                        onPress={() => {
                                            setExpandedNoteId(expandedNoteId === note.id ? null : note.id);
                                        }}>
                                        <Text style={styles.noteText}>
                                            {expandedNoteId === note.id ? note.content : note.content.slice(0, 20) + '...'}
                                        </Text>
                                        <SvgXml xml={arrow_pink} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        );
                    })}
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyGradient: {
        flex: 1,
    },
    headerGradient: {
        height: HEADER_HEIGHT,
        paddingHorizontal: scale(20),
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        justifyContent: 'center',
        paddingTop: scale(20)
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: Fonts.size.xlarge,
        fontWeight: Fonts.weight.medium,
        fontFamily: 'PingFang SC',
        color: Colors.white,
    },
    containerScroll: {
        padding: scale(16),
        paddingTop: scale(20)
    },
    headerBody: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scale(25)
    },
    txtHeader: {
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.regular,
        fontFamily: 'PingFang SC',
        color: Colors.gray,
        marginLeft: scale(9)
    },
    categoryBox: {
        marginBottom: 20
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scale(8)
    },
    categoryTitle: {
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.regular,
        fontFamily: 'PingFang SC',
        color: Colors.white,
        marginLeft: scale(9)
    },
    noteItem: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: scale(12),
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteText: {
        color: Colors.white,
        flex: 1
    },
    arrow: {
        color: '#ff4fad',
        marginLeft: 8,
        fontSize: 18
    },
});
