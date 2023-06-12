import "~/live-common-setup-base";
import "~/live-common-set-supported-currencies";
import "./families"; // families may set up their own things

import VaultTransport from "@ledgerhq/hw-transport-vault";
import { registerTransportModule } from "@ledgerhq/live-common/hw/index";
import { retry } from "@ledgerhq/live-common/promise";
import { listen as listenLogs } from "@ledgerhq/logs";
import { getUserId } from "~/helpers/user";
import { setEnvOnAllThreads } from "./../helpers/env";
import { IPCTransport } from "./IPCTransport";
import logger from "./logger";
import { setDeviceMode } from "@ledgerhq/live-common/hw/actions/app";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
listenLogs(({ id, date, ...log }) => {
  if (log.type === "hid-frame") return;
  logger.debug(log);
});
setEnvOnAllThreads("USER_ID", getUserId());

// This defines our IPC Transport that will proxy to an internal process (we shouldn't use node-hid on renderer)
registerTransportModule({
  id: "ipc",
  open: (id: string) => {
    // id could be another type of transport such as vault-transport
    // that is registered in src/renderer/components/VaultSignerTransport.tsx
    if (id !== "ipc") return;
    return retry(() => IPCTransport.open(id));
  },
  disconnect: () => Promise.resolve(),
});

registerTransportModule({
  id: "vault-transport",
  open: (id: string) => {
    const prefixID = "vault-transport:";
    if (!id.startsWith(prefixID)) return;
    // FIXME how to restore initial device mode value?
    setDeviceMode("polling");
    const params = new URLSearchParams(id.split(prefixID)[1]);
    return retry(() =>
      VaultTransport.open(params.get("host") as string).then(transport => {
        transport.setData({
          token: params.get("token") as string,
          workspace: params.get("workspace") as string,
        });
        return Promise.resolve(transport);
      }),
    );
  },
  disconnect: () => {
    return Promise.resolve();
  },
});
