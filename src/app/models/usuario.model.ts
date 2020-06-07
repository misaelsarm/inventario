export class Usuario {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    password: string;
    email: string;
    tipoUsuario: string;
    confirmPassword: string;
}

export enum Roles {
    Administrador = 'Administrador',
    Cliente = 'Cliente'
}