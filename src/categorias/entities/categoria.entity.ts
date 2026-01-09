import { Lugar } from "src/lugares/entities/lugare.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ default: true })
    enable: boolean;

    @OneToMany(() => Lugar, (lugar) => lugar.categoria)
    lugares: Lugar[]
}
