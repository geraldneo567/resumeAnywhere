import React from 'react'
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { Icon } from 'react-native-elements'

const Email = ({ containerStyle, onPressEmail, name, email, index }) => (
    <TouchableOpacity onPress={() => onPressEmail(email)}>
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconRow}>
                {index === 0 && (
                    <Icon
                        name="email"
                        underlayColor="transparent"
                        iconStyle={styles.emailIcon}
                        onPress={() => onPressEmail()}
                    />
                )}
            </View>
            <View style={styles.emailRow}>
                <View style={styles.emailColumn}>
                    <Text style={styles.emailText}>{email}</Text>
                </View>
                <View style={styles.emailNameColumn}>
                    {name.length !== 0 && (
                        <Text style={styles.emailNameText}>{name}</Text>
                    )}
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

export default function UserProfile() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>User Profile</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        color: 'gray',
        fontSize: 30,
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
})
