import { Body, Controller, Get, Headers } from "@nestjs/common";

@Controller()
export class BoardController {
  @Get("/board")
  hello(@Body() body: any, @Headers() header: any) {
    const result = `
      <html>
        <body>
          <h1>123</h1>
        </body>
      </html>
    `;
    return result;
  }
}
