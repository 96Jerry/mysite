import { Field, ObjectType } from "@nestjs/graphql";
import { Board } from "src/apis/board/entities/board.entity";
import { User } from "src/apis/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class View {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  boardId: string;
}
