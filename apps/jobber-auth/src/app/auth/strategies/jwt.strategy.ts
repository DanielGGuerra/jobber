import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies?.Authentication || request.token;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
