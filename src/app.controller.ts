import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  defaultResponse() {
    return 'Available Routes:\n/pokemon(id/:id | name/:name | type/:type | generation/:generation)';
  }
}
