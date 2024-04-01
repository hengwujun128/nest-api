import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('book')
export class BookController {
  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number): string {
    console.log('getBook', typeof id)
    return 'hello this  is getBook: ' + id
  }
}
