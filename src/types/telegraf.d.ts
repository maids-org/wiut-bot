import * as tt from "telegraf/typings/telegram-types";
import { TelegrafContext as TC } from "telegraf/typings/context";
import { Composer as C, Middleware } from "telegraf/typings/index";
import { BaseScene, Scene, SceneContext } from "telegraf/typings/stage";
export * from "telegraf";

export interface ViaBot {
  via_bot: boolean;
}

type HearsTriggers<TContext> =
  | string[]
  | string
  | RegExp
  | RegExp[]
  | ((value: string, ctx: TContext) => RegExpExecArray | null);

declare module "telegraf" {
  export interface IM extends tt.IncomingMessage {
    via_bot?: ViaBot;
  }

  export interface TelegrafContext extends TC {
    message?: IM;
    replyWithAnimation(
      animation: tt.InputFile,
      extra?: ExtraAnimation
    ): Promise<tt.MessageAnimation>;
    startPayload?: string;
    scene: SceneContext<this>;
  }

  export class Composer<TContext extends TelegrafContext> extends C {
    url(
      triggers: HearsTriggers<TContext>,
      ...middlewares: ReadonlyArray<Middleware<TContext>>
    ): this;

    inlineQuery(
      triggers: HearsTriggers<TContext>,
      ...middleware: ReadonlyArray<Middleware<TContext>>
    ): this;
  }
}
