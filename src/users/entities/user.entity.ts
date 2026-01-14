import { Calificacion } from "src/calificaciones/entities/calificacione.entity";
import { Lugar } from "../../lugares/entities/lugare.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    enable: boolean;

    @OneToMany(() => Lugar, (lugar) => lugar.usuario)
    lugares: Lugar[]

    @OneToMany(() => Calificacion, (calificacion) => calificacion.usuario)
    calificaciones: Calificacion[]
}
