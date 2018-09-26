import { ICharacter, ISprite } from "senpai-stage";
import { ISpritePosition, SpriteType } from "senpai-stage/dist/util";

export enum ScriptActionType {
  Say,
  SayAdd,
  Move,
}

export interface IScriptAction {
  type: ScriptActionType;
  target: ISprite;
  value: any;
}

export interface ISayAction extends IScriptAction {
  type: ScriptActionType.Say;
  value: string;
}

export interface ISayAddAction extends IScriptAction {
  type: ScriptActionType.SayAdd;
  value: string;
}

export interface IMoveAction extends IScriptAction {
  type: ScriptActionType.Move;
  value: ISpritePosition;
}
function validateSay(text: TemplateStringsArray, params: any[]) {
  if (text[0] !== "" || !text[1].startsWith(":")) {
    throw new Error("Invalid say format.");
  }
  if (params[0].type !== SpriteType.Character) {
    throw new Error("First parameter is not a character.");
  }
}
export function say(text: TemplateStringsArray, ...params: any[]): ISayAction {
  validateSay(text, params);
  const target = params[0] as ISprite;
  params[0] = "";
  const contents = String.raw(
    text,
    ...params,
  );

  return {
    target,
    type: ScriptActionType.Say,
    value: contents.slice(1).trim(),
  };
}
