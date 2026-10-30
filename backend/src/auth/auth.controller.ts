import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true}) res: Response, //1. Response-Objekt injizieren
  ) {
    console.log('Request ist im Backend angekommen', createAuthDto);
    //2. Auth-Service aufrufen (holt das Token oder den User)
    const result = await this.authService.login(createAuthDto);

    //Für das Debugging
    console.log('2. AuthService.login erfolgreich ausgeführt!');

    const token = typeof result === 'string' ? result : result.access_token;

    res.cookie('token', token, {
      httpOnly: true, //Schützt vor Zugriff durch JavaScript (XSS-Schutz)
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Erfolgreich eingeloggt'};
  }
}
