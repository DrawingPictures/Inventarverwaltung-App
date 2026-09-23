import { Injectable, OnApplicationBootstrap, Logger } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeederService implements OnApplicationBootstrap {
    private readonly logger = new Logger(AdminSeederService.name);

    constructor(private readonly prisma: PrismaService) {}

    async onApplicationBootstrap() {
        await this.seedAdmin();
    }

    private async seedAdmin() {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

        const existingAdmin = await this.prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if(!adminEmail || !adminPassword) {
            throw new Error('ADMIN_EMAIL oder ADMIN_INITIAL_PASSWORD fehlen in der .env Datei!');
        }

        if(existingAdmin) {
            this.logger.log("Admin existiert bereits.");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await this.prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'System Admin',
                role: 'ADMIN',
            },
        });

        this.logger.log(`Admin-User (${adminEmail}) erfolgreich angelegt!`);
    }
}