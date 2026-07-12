import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";

type Props = {
    onPress: () => void;
};

export default function FloatingAddButton({
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Ionicons
                name="add"
                size={30}
                color="#FFFFFF"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",

        left: "50%",
        bottom: 115,

        width: 64,
        height: 64,

        transform: [
            {
                translateX: -32,
            },
        ],

        borderRadius: 32,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.primary,

        zIndex: 999,
        elevation: 10,

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
});