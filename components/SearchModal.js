// components/SearchModal.js

import React from 'react';
import { Modal, View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchModal = ({ isVisible, teams, onClose, onSelect, searchQuery, onSearchChange }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        maxFontSizeMultiplier={1.1}
                        style={styles.searchInput}
                        placeholder="Search teams..."
                        value={searchQuery}
                        onChangeText={onSearchChange}
                    />
                    <FlatList
                        data={teams}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.teamItem}
                                onPress={() => {
                                    onSelect(item.id);
                                    onClose();
                                }}
                            >
                                <Text style={styles.teamItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText} maxFontSizeMultiplier={1.1}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'flex-start',
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