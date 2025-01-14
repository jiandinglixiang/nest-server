import 'dotenv/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';

async function bootstrap() {
  // 创建一个Nest应用实例，并启用CORS（跨域资源共享）
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // 设置class-validator库使用的容器，并在发生错误时使用默认容器
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // 获取配置服务实例，用于访问应用配置
  const configService = app.get(ConfigService<AllConfigType>);

  // 启用应用关闭钩子，以便在应用关闭时执行一些清理操作
  app.enableShutdownHooks();
  // 设置全局路由前缀，排除根路径
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  // 启用URI版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 使用全局管道进行请求验证
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  // 使用全局拦截器，处理响应中的Promise对象，并进行类序列化
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor用于解决响应中的Promise，因为class-transformer无法处理
    // 参考：https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // 创建Swagger文档配置
  const options = new DocumentBuilder()
    .setTitle('API') // 设置API文档标题
    .setDescription('API docs') // 设置API文档描述
    .setVersion('1.0') // 设置API版本
    .addBearerAuth() // 添加Bearer认证
    .build();

  // 创建Swagger文档
  const document = SwaggerModule.createDocument(app, options);
  // 设置Swagger文档的访问路径
  SwaggerModule.setup('docs', app, document);

  // 启动应用并监听指定端口 获取配置值（自定义配置或进程环境变量） 基于属性路径（您可以使用点表示法遍历嵌套对象，例如“database.host”）。
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

void bootstrap();
