import bcrypt from 'bcrypt';

export class BCrypt {
    static async hashPassword(password: string) {
        const saltRounds = 10; // Nível de complexidade do sal
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    // Função para verificar a senha
    static async verifyPassword(password: string, hash: string) {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
}