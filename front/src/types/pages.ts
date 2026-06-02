type NotificationVariant = "success" | "warning" | "danger" | "neutral";

export type NotificationItemProps = {
    badge: string;
    variant: NotificationVariant;
    title: string;
    description: string;
    time: string;
};