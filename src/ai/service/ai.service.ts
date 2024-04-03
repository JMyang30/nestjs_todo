import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

  constructor(private readonly httpService: HttpService) {}

  async gemini({ question }: { question: string }): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent([question]);
    const response = result.response;
    const text = response.text();

    return text;
  }

  async geminiStream({ question }: { question: string }): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContentStream(question);

    let text: string;

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      text += chunkText;
    }

    return text;
  }
}
