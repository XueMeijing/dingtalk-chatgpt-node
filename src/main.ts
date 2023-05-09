import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 指定host和port，0.0.0.0可以运行在服务器上对外访问，记得开服务器的网络防火墙端口
  // GCP在VPC network -> firewalls -> 增加一条 VPC firewall rules 指定端口，target填 http-server或https-server
  await app.listen(3000, '0.0.0.0');
  // await app.listen(3000);
}
bootstrap();
