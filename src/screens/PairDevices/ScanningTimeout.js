// @flow

import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Trans } from "react-i18next";
import colors from "../../colors";
import { urls } from "../../config/urls";
import { deviceNames } from "../../wording";
import Button from "../../components/Button";
import LText from "../../components/LText";
import Circle from "../../components/Circle";
import NanoX from "../../icons/NanoX";
import Help from "../../icons/Help";

type Props = {
  onRetry: () => void,
};

const hitSlop = {
  top: 16,
  left: 16,
  right: 16,
  bottom: 16,
};

class ScanningTimeout extends Component<Props> {
  render() {
    const { onRetry } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <Circle bg={colors.lightAlert} size={80}>
            <NanoX color={colors.alert} width={11} height={48} />
          </Circle>
          <LText secondary semiBold style={styles.titleText}>
            {<Trans i18nKey="PairDevices.ScanningTimeout.title" />}
          </LText>
          <LText style={styles.SubtitleText}>
            {
              <Trans
                i18nKey="PairDevices.ScanningTimeout.desc"
                values={deviceNames.nanoX}
              />
            }
          </LText>

          <View style={styles.buttonContainer}>
            <Button
              type="primary"
              title={<Trans i18nKey="common.retry" />}
              onPress={onRetry}
              containerStyle={[styles.button]}
            />
          </View>
          <TouchableOpacity
            style={styles.helpContainer}
            hitSlop={hitSlop}
            onPress={() => Linking.openURL(urls.faq)}
          >
            <Help size={16} color={colors.live} />
            <LText style={styles.helpText} semiBold>
              <Trans i18nKey="common.needHelp" />
            </LText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ScanningTimeout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleText: {
    marginTop: 32,
    textAlign: "center",
    color: colors.darkBlue,
    fontSize: 18,
  },
  SubtitleText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: colors.smoke,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  button: {
    flex: 1,
  },
  helpContainer: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  helpText: {
    color: colors.live,
    marginLeft: 6,
  },
});
