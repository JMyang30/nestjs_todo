import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AiService } from '../service/ai.service';
import { AiDTO } from '../dto/ai.dto';
import { Observable } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Controller('api/v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/post')
  async getAiAnswer(@Body() data: AiDTO) {
    const { question } = data;

    return await this.aiService.gemini({ question });
  }

  // SSE 동시성 오류의 경우 user의 ID 값을 가져와 비교해서 일치할 경우 리턴
  @Sse('/geminiSSE')
  async geminiStream(): Promise<Observable<any>> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const question = '떡국 끓이는 방법 100자 이내로 간단하게 알려줘';

    // Gemini api 스트리밍식 답변
    const result = await model.generateContentStream(question);

    // SSE 방식으로 Ai 응답중에 프론트와 네트워크 연결 유지
    const observer = new Observable((o) => {
      (async () => {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          o.next(chunkText);
        }
        o.complete();
      })();
    });

    return observer;
  }
}
