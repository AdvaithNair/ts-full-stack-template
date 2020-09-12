import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { BUCKET_URL, USER_ROLES } from '@app/common';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { default: USER_ROLES.USER })
  role: string;

  @Column('text', { default: `${BUCKET_URL}/profile/Default.png` })
  imageURL: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  count: number;
}
