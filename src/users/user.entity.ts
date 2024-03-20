import { Exclude } from 'class-transformer';
import { Item } from '../items/item.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', +this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id: ', +this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id: ', +this.id);
  }
}
