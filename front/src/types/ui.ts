import type { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

export type BadgeProps = {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
};

type ButtonVariant = "primary" | "secondary" | "danger";

export type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type CardProps = {
    children: ReactNode;
    className?: string;
};

export type InputProps = {
    label?: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;