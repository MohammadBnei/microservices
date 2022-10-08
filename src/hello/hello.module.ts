import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common';
import { HelloController } from './controller';
import { HelloService } from './service';

@Module({
  imports: [CommonModule],
  providers: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
