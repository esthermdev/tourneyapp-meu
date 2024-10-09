import React, { useMemo } from 'react';
import {
    Modal,
    View,
    TextInput,
    SectionList,
    TouchableOpacity,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

const SearchModal = ({ isVisible, teams, onClose, onSelect, searchQuery, onSearchChange, showNoneOption, onSelectNone }) => {
    const groupedTeams = useMemo(() => {
        const grouped = teams.reduce((acc, team) => {
            if (!acc[team.division]) {
                acc[team.division] = [];
            }
            acc[team.division].push(team);
            return acc;
        }, {});

        return Object.entries(grouped).map(([division, teams]) => ({
            title: division,
            data: teams
        }));
    }, [teams]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.teamItem}
            onPress={() => {
                onSelect(item.id);
                onClose();
            }}
        >
            <Text style={styles.teamItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <TextInput
                            maxFontSizeMultiplier={1.1}
                            style={styles.searchInput}
                            placeholder="Search teams..."
                            value={searchQuery}
                            onChangeText={onSearchChange}
                        />
                        {showNoneOption && (
                            <TouchableOpacity
                                style={styles.teamItem}
                                onPress={() => {
                                    onSelectNone();
                                    onClose();
                                }}
                            >
                                <Text style={styles.teamItemText}>None (non-player)</Text>
                            </TouchableOpacity>
                        )}
                        <SectionList
                            sections={groupedTeams}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            renderSectionHeader={renderSectionHeader}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText} maxFontSizeMultiplier={1.1}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#8F8DAA',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontFamily: 'Outfit-Regular',
        fontSize: 16,
    },
    teamItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    teamItemText: {
        fontSize: 16,
        fontFamily: 'Outfit-Regular',
    },
    sectionHeader: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    sectionHeaderText: {
        fontFamily: 'Outfit-Bold',
        fontSize: 16,
        color: '#333243',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#EA1D25',
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontFamily: 'Outfit-SemiBold',
        fontSize: 16,
    },
});

export default SearchModal;