import { StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SvgXml } from "react-native-svg";

import { arrow_back, arrow_pink, headphone, list, document, request } from "../svgXml";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { scale, verticalScale } from "../utils/scale";
import { useNotesStore } from "../store/notes";

const HEADER_HEIGHT = 112;

const SettingScreen = ({ navigation }: any) => {
    const { deleteAll } = useNotesStore();

    const cards = [
        { title: "Online Customer", icon: headphone },
        { title: "User Agreement", icon: list },
        { title: "Privacy Policy", icon: document },
        { title: "About Us", icon: request },
    ];

    const handleCardPress = (title: string) => {
        let url = "https://talentjdi.com/";
        if (title === "About Us") {
            url = "https://talentjdi.com/about-us";
        }
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
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
                        <Text style={styles.headerText}>Settings</Text>
                    </View>
                </LinearGradient>

                <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardsWrapper}>
                        {cards.map((item) => (
                            <TouchableOpacity
                                key={item.title}
                                style={styles.card}
                                onPress={() => handleCardPress(item.title)}>
                                <View style={styles.cardContent}>
                                    <SvgXml xml={item.icon} />
                                    <Text style={styles.cardText}>{item.title}</Text>
                                    <SvgXml xml={arrow_pink} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={deleteAll}>
                        <LinearGradient
                            colors={["#F94695", "#F13A76"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.btnDelete}
                        >
                            <Text style={styles.btnText}>Delete All Notes</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginRight: scale(12)
    },
    containerScroll: {
        padding: scale(16),
        paddingTop: scale(20),
    },
    cardsWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(16),
    },
    card: {
        paddingVertical: verticalScale(16),
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: scale(16)
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    cardText: {
        flex: 1,
        marginLeft: scale(16),
        color: Colors.white,
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.regular,
        fontFamily: "PingFang SC",
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
    btnDelete: {
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(48),
        borderRadius: 32,
        alignItems: "center",
        width: 'auto'
    },
    btnText: {
        color: Colors.white,
        fontWeight: Fonts.weight.regular,
        fontSize: Fonts.size.small,
        fontFamily: 'PingFang SC'
    },
});
