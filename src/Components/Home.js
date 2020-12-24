import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DialogInput from 'react-native-dialog-input';
import Header from './header';


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDepositDialogVisible: false,
            isWithdrowDialogVisible: false,
            Deposit: 0,
            data: this.props.data
        }

    }
    showDepositDialog() {
        this.setState({ isDepositDialogVisible: true });
    }
    showWithdrowDialog() {
        this.setState({ isWithdrowDialogVisible: true });
    }
    sendDepositInput(inputText) {
        console.log("sendInput (DialogInput#1): " + inputText);
        const diposit = (parseInt(this.state.Deposit) + parseInt(inputText))
        this.setState({ Deposit: diposit })
    }
    sendWithdrowtInput(inputText) {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'short' });
        const date_month = month.substring(4, 10)
        const year = month.substring(20, 24)
        this.props.addToCartHandler({ TotalAmount: (this.state.Deposit - inputText), Withdrow: (inputText), Trade_fee: 0.00, Buy: 0.00, date_month: date_month, year: year });
        var totalAmount = (this.state.Deposit - inputText)
        this.setState({ Deposit: totalAmount })
        this.showWithdrowDialog(false)

    }
    render() {
        const context = this;
        // console.log("home", this.state.data.length)
        return (
            <View style={styles.home}>
                <DialogInput isDialogVisible={this.state.isDepositDialogVisible}
                    title={"Deposit"}
                    message={"Enter Deposit Amount"}
                    hintInput={"HINT INPUT"}
                    submitInput={(inputText) => { this.sendDepositInput(inputText) || this.setState({ isDepositDialogVisible: false }) }}
                    closeDialog={() => { this.setState({ isDepositDialogVisible: false }) }}>
                </DialogInput>
                <DialogInput isDialogVisible={this.state.isWithdrowDialogVisible}
                    title={"Withdrow"}
                    message={"Enter Withdrow Amount"}
                    hintInput={"HINT INPUT"}
                    submitInput={(inputText) => { this.sendWithdrowtInput(inputText) || this.setState({ isWithdrowDialogVisible: false }) }}
                    closeDialog={() => { this.setState({ isWithdrowDialogVisible: false }) }}>
                </DialogInput>
                <Header />
                <View style={{ alignItems: "center", top: '5%' }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>${this.state.Deposit}</Text>
                    <Text style={{ color: 'white', fontSize: 11 }}>${this.state.Deposit}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: '22%' }}>
                    <TouchableOpacity style={styles.button} onPress={() => { this.showDepositDialog() }}>
                        <Text>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { this.showWithdrowDialog() }}>
                        <Text>Withdrow</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ top: '35%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white' }}>
                        RECENT TRANSACTIONS
                    </Text>
                    <Image source={require('../images/filter.png')} style={{ height: 30, width: 30, top: 0 }} />
                </View>
                <View style={{ height: '50%', top: '17%' }}>
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.Container} >
                                    <Image source={require('../images/up-arrow.png')} style={{ height: 30, width: 30, top: 30 }} />
                                    <View style={styles.textContainer}>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.textStyling}>Withdrow</Text>
                                            <Text style={styles.textStyling}>-${item.Withdrow}</Text>
                                        </View>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.dateStyling}>{item.date_month}, {item.year}</Text>
                                            <Text style={styles.dateStyling}>${item.TotalAmount}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Container} >
                                    <Image source={require('../images/percentage.png')} style={{ height: 30, width: 30, top: 30 }} />
                                    <View style={styles.textContainer}>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.textStyling}>Trade Fee</Text>
                                            <Text style={styles.textStyling}>${item.Trade_fee}</Text>
                                        </View>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.dateStyling}>BCH-USD • {item.date_month}, {item.year}</Text>
                                            <Text style={styles.dateStyling}>${item.Withdrow}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Container} >
                                    <Image source={require('../images/compress.png')} style={{ height: 30, width: 30, top: 30 }} />
                                    <View style={styles.textContainer}>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.textStyling}>Buy</Text>
                                            <Text style={styles.textStyling}>${item.Buy}</Text>
                                        </View>
                                        <View style={styles.textInnerContainer}>
                                            <Text style={styles.dateStyling}>BCH-USD • {item.date_month}, {item.year}</Text>
                                            <Text style={styles.dateStyling}>${item.Withdrow}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        )}
                        //Setting the number of column
                        numColumns={1}
                        keyExtractor={(item, index) => index}
                    />
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        paddingLeft: 50,
        paddingRight: 50
    },
    Container: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 20
    },
    textInnerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexGrow: 1,
        padding: 0
    },
    textStyling: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    dateStyling: {
        color: 'white',
        fontSize: 11
    }
})