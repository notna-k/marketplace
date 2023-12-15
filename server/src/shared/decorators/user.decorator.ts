import { createParamDecorator } from '@nestjs/common'

import type { ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user
  },
)
