import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'


const Quiz = ({ navigation }) => {
    const [questions, setQuestions] = useState()
    const [quesNo, setQuesNo] = useState(0)
    const [options, setOptions] = useState([])
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const getQuiz = async () => {
        const URL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple&encode=url3986'
        const res = await fetch(URL)
        const data = await res.json()
        setQuestions(data.results)

        setOptions(shuffleAnswers(data.results[0].correct_answer, ...data.results[0].incorrect_answers))
    }

    const shuffleAnswers = (...array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        // console.log(array);
        return array
    }

    const nextQuestion = () => {
        if (selectedAnswer === null) return

        if (options[selectedAnswer] === questions[quesNo].correct_answer) {
            setScore(prev => prev + 10)
        }

        if (quesNo === 9) return navigation.navigate("Result", { score: score })

        setQuesNo(prev => prev + 1)
        setOptions(shuffleAnswers(questions[quesNo + 1].correct_answer, ...questions[quesNo + 1].incorrect_answers))
        setSelectedAnswer(null)
    }

    const skipQuestion = () => {
        if (quesNo === 9) return navigation.navigate("Result", { score: score })

        setQuesNo(prev => prev + 1)
        setOptions(shuffleAnswers(questions[quesNo + 1].correct_answer, ...questions[quesNo + 1].incorrect_answers))
        setSelectedAnswer(null)
    }

    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <View style={styles.quizContainer}>
            {
                !questions ?
                    <View style={styles.reloder_container}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    :
                    <View style={{ height: '100%' }}>
                        <View style={styles.quizTop}>
                            <Text style={styles.quizTopText}>Q. {quesNo + 1}) {decodeURIComponent(questions[quesNo].question)}</Text>
                        </View>
                        <View style={styles.quizOptions}>
                            {
                                options?.map((inc, index) =>
                                    <TouchableOpacity key={index} onPress={() => setSelectedAnswer(index)} style={{ marginVertical: 8 }}>
                                        <Text style={{ ...styles.quizOptionText, backgroundColor: selectedAnswer === index ? "green" : '#34A0A4' }}>{index + 2}). {decodeURIComponent(inc)}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View style={styles.quizBottom}>
                            <TouchableOpacity style={styles.quizButton} onPress={skipQuestion}>
                                <Text style={styles.quizButtonText}>SKIP</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quizButton} onPress={nextQuestion}>
                                <Text style={styles.quizButtonText}>NEXT</Text>
                            </TouchableOpacity>

                            {/* {
                            quesNo === 9 &&
                            <TouchableOpacity onPress={endQuiz} style={styles.quizButton}>
                                <Text style={styles.quizButtonText}>END</Text>
                            </TouchableOpacity>
                        } */}
                        </View>
                    </View>
            }
        </View >
    )
}

export default Quiz

const styles = StyleSheet.create({
    reloder_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    quizContainer: {
        padding: 18,
        height: '100%'
    },

    quizTop: {
        marginVertical: 10
    },

    quizTopText: {
        fontSize: 20,
        fontWeight: '700'
    },

    quizOptions: {
        marginVertical: 10,
        flex: 1
    },

    quizOptionText: {
        color: 'white',
        padding: 13,
        borderRadius: 8,
        fontSize: 16
    },

    quizBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    quizButton: {
        backgroundColor: '#515b60',
        padding: 8,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 12
    },

    quizButtonText: {
        color: 'white',
        fontSize: 16
    }
})