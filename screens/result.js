import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Result = ({ route, navigation }) => {
    const { score } = route.params

    // console.log(score)
    return (
        <View style={styles.resultContainer}>
            <View style={styles.resultTop}>
                <Text style={styles.resultTopContent}>Result</Text>
            </View>
            <View style={{ marginTop: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>{score}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeStartButton}>
                <Text style={styles.homeButton}>Start Again</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Result

const styles = StyleSheet.create({
    resultContainer: {
        height: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    resultTop: {
        alignItems: 'center',
    },

    resultTopContent: {
        fontSize: 35,
        fontWeight: '600'
    },

    homeStartButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#515b60',
        height: '6%',
        width: '100%',
        color: 'white',
        borderRadius: 14,
        marginTop: 50
    },

    homeButton: {
        color: 'white',
        fontSize: 18,
    }
})