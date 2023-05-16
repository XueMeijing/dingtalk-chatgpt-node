import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('chatgpt')
export class ChatGPT {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '用户id'
  })
  id: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
    comment: '用户名'
  })
  name: string

  @Column({
    type: 'varchar',    //字段类型(字符型:char、varchar、text)(数字型：int、tinyint)(小数型：float、double、decimal(10,2))等
    nullable: false,    //是否可为null(默认false)
    length: 150,         //当字段为字符型时，可指定长度
    unique: true,       //是否唯一约束
    name: 'conversation_id',   //数据库字段名字(若不指定，则为实体的属性，即此处的 username:string)
    comment: 'gpt对话id'    //字段注释
  })
  conversationId: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
    name: 'parent_id',
    comment: 'gpt上一句id'
  })
  parentId: string

  @CreateDateColumn({
    type: 'date',
    nullable: false,
    name: 'created_at',
    comment: '创建时间'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'date',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date
}