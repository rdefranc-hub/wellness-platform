// Minimal shim for cmdk command palette.
export const Command = (props: any) => props?.children ?? null;
Command.Dialog = (props: any) => props?.children ?? null;
Command.Input = (props: any) => null;
Command.List = (props: any) => props?.children ?? null;
Command.Empty = (props: any) => props?.children ?? null;
Command.Group = (props: any) => props?.children ?? null;
Command.Item = (props: any) => props?.children ?? null;
Command.Shortcut = (props: any) => props?.children ?? null;
Command.Separator = (props: any) => null;
export default Command;
