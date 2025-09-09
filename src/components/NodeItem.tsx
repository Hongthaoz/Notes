import { StyleSheet, Text, View } from "react-native";
import { scale } from "../utils/scale";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

type Props = {
    content: string,
    createAt: number
};

const NoteItem = ({ content, createAt }: Props) => {
    const preview = content.length > 20 ? content.slice(0, 20) + '....' : content;
    const date = new Date(createAt).toLocaleString();

    return (
        <View style={styles.container}>
            <Text style={styles.preview}>{preview}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: scale(6)
    },
    preview: {
        fontSize: Fonts.size.small,
        color: Colors.black
    },
    date:{
        fontSize: Fonts.size.small,
        color: Colors.gray
    }
});

export default NoteItem;