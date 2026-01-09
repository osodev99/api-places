import { Lugar } from "src/lugares/entities/lugare.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Calificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    puntaje: number;

    @ManyToOne(() => User, (user) => user.calificaciones)
    usuario: User;

    @ManyToOne(() => Lugar, (lugar) => lugar.calificaciones)
    lugar: Lugar;
}
