import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  getHello(): string {
    this.logger.log("getHello service execute!")
    return 'Hello World!';
  }
}
