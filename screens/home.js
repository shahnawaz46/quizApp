import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react';

const Home = ({ navigation }) => {

    return (
        <View style={styles.homeContainer}>
            <View style={styles.homeTop}>
                <Text style={styles.homeTopContent}>Quizzler</Text>
            </View>
            <View style={styles.bannerContainer}>
                <Image source={require("../images/home-image.png")} style={styles.banner} resizeMode="contain" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={styles.homeStartButton}>
                <Text style={styles.homeButton}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    homeContainer: {
        padding: 20,
        height: '100%'
    },

    homeTop: {
        alignItems: 'center',
    },

    homeTopContent: {
        fontSize: 35,
        fontWeight: '600'
    },

    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    banner: {
        height: 500,
        width: 500
    },

    homeStartButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#515b60',
        height: '6%',
        color: 'white',
        borderRadius: 14
    },

    homeButton: {
        color: 'white',
        fontSize: 18,
    }
})