import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  password: string;
}
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
