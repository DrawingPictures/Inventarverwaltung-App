import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name} = createAuthDto;

    //Nr.1: Passwort hashen
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
      //Nr.2: User in pgadmin/Postgres speichern
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      //Passwort aus dem Rückgabeobjekt löschen (zur Sicherheit!)
      const { password: _, ...userWithoutPassword} = user;
      return userWithoutPassword;
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = error as Prisma.PrismaClientKnownRequestError;
        if(prismaError.code === 'P2002') {
          throw new ConflictException("Email existiert bereits!");
        }
      }
      throw error;
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    //Nr.1: User suchen
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    //Nr. 2: Prüfen ob User existiert und ob Passwort korrekt ist
    if(user && (await bcrypt.compare(password, user.password))) {
      //Nr. 3: JWT Token erstellen
      const payload = {sub: user.id, email: user.email};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException("Ungültige Zugangsdaten!");
    }
  }
  
}
