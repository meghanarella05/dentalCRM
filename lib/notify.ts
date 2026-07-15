import { db } from "@/lib/db";
import { MODULE_VERSIONS } from "@/lib/version";

type Channel = "email" | "push" | "inapp";

type NotificationPayload = {
  event: string;
  message: string;
  moduleVersion: string;
};

type Sender = {
  send: (userId: string, payload: NotificationPayload) => Promise<void>;
};

const noopSender: Sender = {
  async send() {
    return;
  },
};

const senders: Record<Channel, Sender> = {
  email: noopSender,
  push: noopSender,
  inapp: noopSender,
};

function buildPayload(event: string): NotificationPayload {
  return {
    event,
    message: `Event: ${event}`,
    moduleVersion: MODULE_VERSIONS.notify,
  };
}

export async function notify(userId: string, event: string, channels: Channel[]) {
  const payload = buildPayload(event);

  for (const channel of channels) {
    await senders[channel].send(userId, payload);
  }

  await db.notification.create({
    data: {
      userId,
      event,
      payload,
    },
  });
}
