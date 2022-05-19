import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

const CustomModal = ({ visible, onRequestClose, }) => {
    if (!visible) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={onRequestClose}>
                <View style={{ flex: 1 }}>
                    <TouchableHighlight style={styles.subContainer} onPress={onRequestClose}>
                        <TouchableOpacity onPress={() => null} activeOpacity={1}>
                            <View style={styles.modalContainer}>

                            </View>
                        </TouchableOpacity>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
};

export default CustomModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    subContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: "white",
        height: 100,
        borderRadius: 10
    },
});
