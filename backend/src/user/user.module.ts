import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminSeederService } from './admin-seeder.service';

@Module({
  controllers: [UserController],
  providers: [
    
    UserService,
    AdminSeederService,
  ],
})
export class UserModule {}
