import { ISprite, IStage, IStageProps, Stage } from "senpai-stage";
import { IKeyDownEvent, IPointDownEvent } from "senpai-stage/dist/events";
import { IJournal, IJournalFlags, IJournalValue } from "./journal";

export interface IInterpreterProps extends IStageProps {

}

export interface IInterpreter extends IStage {
  setFlag(flag: string, value: IJournalValue): IJournalValue;
  getFlag(flag: string): IJournalValue;
  setData(flag: string, value: IJournalValue): IJournalValue;
  getData(flag: string, value: IJournalValue): IJournalValue;
  setPersist(flag: string, value: IJournalValue): IJournalValue;
  getPersist(flag: string): IJournalValue;

}

enum InterpreterState {
  Start,
  Options,
  Dialog,
  Story,
}

export class Interpreter extends Stage implements IInterpreter {
  private journal: IJournal[] = [];
  private journalIndex: number = 0;
  // private states: IState[] = [];
  private stateIndex: number = 0;
  private interpreterState: InterpreterState = InterpreterState.Start;
  private flags: IJournalFlags = {};
  private persist: IJournalFlags = {};
  private data: IJournalFlags = {};
  // private nextStep: IInterpreterAction = null;

  constructor(props: IInterpreterProps) {
    super(props);

    this.pointDownEvent.listen(e => this.handlePointDown(e));
    this.keyDownEvent.listen(e => this.handleKeyDown(e));
  }

  public setFlag(flag: string, value: IJournalValue): IJournalValue {
    if (!this.flags.hasOwnProperty(flag)) {
      this.flags[flag] = value;
    }
    return this.flags[flag];
  }

  public getFlag(flag: string): IJournalValue {
    return this.flags[flag] || null;
  }

  public setData(flag: string, value: IJournalValue): IJournalValue {
    return this.data[flag] = value;
  }

  public getData(flag: string): IJournalValue {
    return this.data[flag];
  }

  public setPersist(flag: string, value: IJournalValue): IJournalValue {
    return this.persist[flag] = value;
  }

  public getPersist(flag: string): IJournalValue {
    return this.persist[flag];
  }

  private handlePointDown(e: IPointDownEvent): void {
    if (this.interpreterState === InterpreterState.Story) {
      this.advance();
    }
  }

  private handleKeyDown(e: IKeyDownEvent): void {
    if (this.interpreterState === InterpreterState.Story) {
      switch (e.key) {
        case "Enter":
        case "Tab":
        case " ":
        case "Spacebar":
        case "ArrowRight":
        case "Right":
        case "Accept":
          this.advance();
          break;
        case "ArrowLeft":
        case "Left":
        case "Backspace":
          this.previous();
          break;
      }
    }
  }
  private previous(): void {
    // noOp
  }
  private advance(): void {
    if (this.interpreterState === InterpreterState.Story) {
      this.stateIndex += 1;
      /* if (this.stateIndex >= this.states.length) {
        switch (this.nextStep.type) {

        }
      } */
    }
  }
}
