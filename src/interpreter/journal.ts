export type IJournalValue = number | boolean | string | null;

export interface IJournalFlags {
  [key: string]: IJournalValue;
}

export interface IJournal {
  script: string;
  data: IJournalFlags;
}

export enum JournalResultType {
  Jump,
  End,
}

export interface IJournalEntryResult {
  type: JournalResultType;
  target: string;
}

export function jump(next: string): IJournalEntryResult {
  return {
    target: next,
    type: JournalResultType.Jump,
  };
}

export function end(): IJournalEntryResult {
  return {
    target: null,
    type: JournalResultType.End,
  };
}
