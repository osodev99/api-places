import { Categoria } from "src/categorias/entities/categoria.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Calificacion } from "src/calificaciones/entities/calificacione.entity";

@Entity()
export class Lugar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    url_imagen: string;

    @Column()
    latitud: number;

    @Column()
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
