import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/modules/auth/enums/role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column({
    unique: true,
  })
  readonly email: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  role: Role[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(id: string, email: string, pass: string, role: Role[]) {
    this.id = id;
    this.email = email;
    this.password = pass;
    this.role = role;
  }
}
