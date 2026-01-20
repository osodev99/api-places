import { Categoria } from "src/categorias/entities/categoria.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Calificacion } from "src/calificaciones/entities/calificacione.entity";
import { Double } from "typeorm/browser";

@Entity()
export class Lugar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    imagen_filename: string;

    @Column({ type: 'real' })
    latitud: number;

    @Column({ type: 'real' })
    longitud: number;

    @Column()
    descripcion: string;

    @Column({ default: true })
    enable: boolean;

    @ManyToOne(() => User, (user) => user.lugares)
    usuario: User;

    @ManyToOne(() => Categoria, (cat) => cat.lugares)
    categoria: Categoria;

    @OneToMany(() => Calificacion, (cal) => cal.lugar)
    calificaciones: Calificacion[]

}
