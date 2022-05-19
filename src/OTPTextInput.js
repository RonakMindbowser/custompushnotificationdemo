import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';

const OTPTextInput = () => {

    const arrayToString = (list) => {
        return list.join("")
    }

    const stringToArray = (str) => {
        return str.split("")
    }

    const [value, setValue] = useState("")
    const [digits, setDigits] = useState(stringToArray(value))
    const [selectedIndex, setSelectedIndex] = useState(0)
    const textFieldRef = useRef([])
    let mynumber = 4;

    const onInputTextChange = (text, index, data) => {
        console.log("textFieldRef.current[index + 1]--->", textFieldRef.current[index + 1]);
        console.log("text--->", text);

        if (text == "") {
            setTimeout(() => {
                if (index > 0) {
                    textFieldRef.current[index - 1].focus()
                }
                else {
                    Keyboard.dismiss()
                }
            }, 20);
        }
        else {
            setTimeout(() => {
                if (index == mynumber - 1) {
                    Keyboard.dismiss()
                    setSelectedIndex(null)
                }
                else {
                    textFieldRef.current[index + 1].focus()
                }
            }, 20);
        }

        let temp = digits;
        temp[index] = text
        setDigits(temp)
        setValue(arrayToString(temp));

        if (temp.length >= mynumber) {
            console.log("Code is Filled");
        }
        // temp[index].inputRef.focus()
        // setSelectedIndex(index + 1)
    }

    const getEditStatus = (index) => {
        let status = digits[index - 1];
        if (status) return true;
        else return false;
    }

    const handleKeyPressTextInput = (index, key) => {
        console.log("Index- -- >", index);
        console.log("key- -- >", key);

        if (key == "Backspace") {
            if (index > 0) {
                textFieldRef.current[index - 1].focus()
            }
            else {
                Keyboard.dismiss()
            }
        }
    }

    const onSubmitEditing = (index) => {
        if (digits[index] && index != mynumber - 1) {
            textFieldRef.current[index + 1].focus()
        }
        else {
            Keyboard.dismiss()
        }
    }

    const renderOneInputField = (data, index) => {
        console.log('index--->', index);
        console.log('digits--->', digits);
        console.log('data--->', data);
        console.log('textFieldRef.current--->', textFieldRef.current[index]);
        return (
            <TextInput
                style={{
                    height: 30, width: 30, borderWidth: selectedIndex == index ? 2 : 1, padding: 0,
                    color: "black", fontSize: 14, fontWeight: "500",
                    alignSelf: "center", textAlign: "center",
                    borderColor: selectedIndex == index ? "blue" : "black",
                    borderRadius: 5
                }}
                placeholder={"#"}
                placeholderTextColor={"gray"}
                maxLength={1}
                ref={(ref) => {
                    textFieldRef.current[index] = ref
                }}
                keyboardType={'number-pad'}
                onKeyPress={({ nativeEvent: { key } }) => { handleKeyPressTextInput(index, key) }}
                editable={index == 0 ? true : getEditStatus(index)}
                value={digits[index] ? digits[index] : ""}
                onChangeText={(text) => onInputTextChange(text, index, data)}
                onFocus={() => setSelectedIndex(index)}
                autoFocus
                selectionColor={"black"}
                onSubmitEditing={() => onSubmitEditing(index)}
                blurOnSubmit={false}
                returnKeyType={index == mynumber - 1 ? "done" : "next"}
            />
        )
    }

    const renderTextFields = () => {
        const array = new Array(mynumber).fill({
            inputRef: null
        })
        // array.map((value, id) => textFieldRef.current[id] = value.inputRef)
        return array.map(renderOneInputField)
        // return array.map((value, index) => {
        //     textFieldRef.current[index] = value.inputRef
        //     return renderOneInputField()
        // })
    }

    return (
        <View style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center", justifyContent: "center"
        }}>
            {/* <Text>OTPTextInput</Text> */}
            <Text style={{ color: "black", marginVertical: 10 }}>{"Enter OTP"}</Text>
            <View style={{ flexDirection: "row", width: "50%", justifyContent: "space-between", alignSelf: "center" }}>
                {renderTextFields()}
            </View>
        </View>
    )
}

export default OTPTextInput;
