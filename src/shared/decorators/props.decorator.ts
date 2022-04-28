import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Props = createParamDecorator((property: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (property === undefined) {
    return {
      pull: (key: string) => req[key],
      define: <T> (key: string, value: T) => { req[key] = value; }
    };
  } else { return req[property]; }
});
