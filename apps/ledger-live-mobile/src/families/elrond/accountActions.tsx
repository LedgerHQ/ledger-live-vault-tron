import React from "react";
import type { ElrondAccount } from "@ledgerhq/live-common/families/elrond/types";
import { getCurrentElrondPreloadData } from "@ledgerhq/live-common/families/elrond/preload";
import { randomizeProviders } from "@ledgerhq/live-common/families/elrond/helpers/randomizeProviders";
import { MIN_DELEGATION_AMOUNT } from "@ledgerhq/live-common/families/elrond/constants";
import { Icons } from "@ledgerhq/native-ui";
import { Trans } from "react-i18next";

import type { Account } from "@ledgerhq/types-live";
import type { ActionButtonEvent } from "../../components/FabActions";

import { NavigatorName, ScreenName } from "../../const";

/*
 * Declare the types for the properties and return payload.
 */

export interface getActionsType {
  account: ElrondAccount;
  parentAccount?: Account;
}
export type getActionsReturnType = ActionButtonEvent[] | null | undefined;

type NavigationParamsType = readonly [name: string, options: object];

/*
 * Declare the function that will return the actions' settings array.
 */

const getMainActions = (props: getActionsType): getActionsReturnType => {
  const { account, parentAccount } = props;

  const delegationEnabled = account.spendableBalance.isGreaterThanOrEqualTo(MIN_DELEGATION_AMOUNT);

  /*
   * Get a list of all the providers, randomize, and also the screen, conditionally, based on existing amount of delegations.
   */
  const preloaded = getCurrentElrondPreloadData();
  const validators = randomizeProviders(preloaded.validators);

  const screen =
    account.elrondResources && account.elrondResources.delegations.length === 0
      ? ScreenName.ElrondDelegationStarted
      : ScreenName.ElrondDelegationValidator;

  /*
   * Return an empty array if "elrondResources" doesn't exist.
   */

  if (!account.elrondResources) {
    return [];
  }

  /*
   * Return the array of actions.
   */
  const navigationParams = delegationEnabled
    ? [NavigatorName.ElrondDelegationFlow, { screen, params: { account, validators } }]
    : [
        NavigatorName.NoFundsFlow,
        {
          screen: ScreenName.NoFunds,
          params: {
            account,
            parentAccount,
          },
        },
      ];
  return [
    {
      id: "stake",
      label: <Trans i18nKey="account.stake" />,
      Icon: Icons.ClaimRewardsMedium,
      navigationParams: navigationParams as unknown as NavigationParamsType,
      event: "button_clicked",
      eventProperties: {
        button: "stake",
        currency: "ELROND",
        page: "Account Page",
      },
    },
  ];
};

export default { getMainActions };
