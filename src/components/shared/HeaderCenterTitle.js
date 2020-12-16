import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { ConstantValues } from '../../utils/ConstantValues';
import { colors, fontsProps, paddingProps, dimensionsProps } from '../../utils/StyleComponents';

export default function HeaderCenterTitle({title,backcolor,headerstyle}) {


    return (
        <View style={
            headerstyle
        }>
            <Text style={{ fontSize: fontsProps.lg, color: title == "More" || (title == ConstantValues.MAIN_GATE_STR || ConstantValues.FORMS_STR) ? colors.COLOR_WHITE : colors.COLOR_BLACK }}>{title}</Text>
        </View>)
}
const styles = StyleSheet.create({
});
