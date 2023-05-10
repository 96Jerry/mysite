import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/apis/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn({ nullable: false })
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
