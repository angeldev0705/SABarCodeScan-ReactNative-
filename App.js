import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RootNavigator from './src/navigation/RootNavigator';
import { ApiGetWhiteLabelSettings } from './src/network/Services';
import ApplicationDataManager from './src/utils/ApplicationDataManager';
import { ConstantValues } from './src/utils/ConstantValues';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isDone: false
    }
  }
  componentDidMount() {
    this.getAppInfo();
  }
  getAppInfo = () => {
    console.log("getBundleId---" + DeviceInfo.getBundleId())
    console.log("getApplicationName---" + DeviceInfo.getApplicationName())
    let appname = DeviceInfo.getApplicationName();
    ApplicationDataManager.getInstance().setAppName(appname);
    this.getWhiteLabelSettings(DeviceInfo.getApplicationName());
  }
  setWhiteLables = async (responseJson) => {
    console.log("this.state.whitelabelsettings0" + JSON.stringify(responseJson) + "responseJson[0].login_logo" + responseJson[0].login_logo)
    ApplicationDataManager.getInstance().setAppLogo(responseJson[0].login_logo);
    ApplicationDataManager.getInstance().setActionButtonBackground(responseJson[0].action_button_background_color);
    ApplicationDataManager.getInstance().setFooterActiveTabcolor(responseJson[0].footer_background_color);
    ApplicationDataManager.getInstance().setToggleOfColor(responseJson[0].toggle_off_color);
    ApplicationDataManager.getInstance().setToggleOnColor(responseJson[0].toggle_on_color);
    ApplicationDataManager.getInstance().setTabActiveColor(responseJson[0].tab_background_color);
    ApplicationDataManager.getInstance().setHeaderTextColor(responseJson[0].header_text_color);
    ApplicationDataManager.getInstance().setActionButtonTextColor(responseJson[0].action_button_text_color);
    ApplicationDataManager.getInstance().setHeaderBgcolor(responseJson[0].header_background_color);
    await this.setState({
      whitelabelsettings: responseJson,
      isDone: true
    })
  }
  getWhiteLabelSettings = async (appname) => {
    let params = "?company_id=" + ConstantValues.COMPANY_ID_STR
    ApiGetWhiteLabelSettings(
      params).then(responseJson => {
        if (responseJson.length > 0) {
          this.setWhiteLables(responseJson)
        }
        else {
          this.setState({ isDone: true })
        }
      }).catch((err) => {
        this.setState({ isDone: true })
      })
  }
  render() {
    return (
      this.state.isDone &&
      <View style={{ flex: 1 }}>
        <RootNavigator />
      </View>
    );
  }
}
