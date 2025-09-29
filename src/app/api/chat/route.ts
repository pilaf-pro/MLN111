import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Khởi tạo Gemini AI
const ai = new GoogleGenAI({});

// System prompt để định hình AI chỉ trả lời về Khổng Tử
const SYSTEM_PROMPT = `
Bạn là một chuyên gia về Khổng Tử (Confucius) và tư tưởng Nho giáo. Bạn chỉ trả lời các câu hỏi liên quan đến:

1. Cuộc đời và tiểu sử của Khổng Tử
2. Triết học và tư tưởng Nho giáo
3. Các giáo lý và lời dạy của Khổng Tử
4. Tác phẩm như Luận Ngữ, Ngũ Kinh
5. Ảnh hưởng của Khổng Tử đến văn hóa Á Đông
6. Ngũ đức: Nhân, Nghĩa, Lễ, Trí, Tín
7. Quan điểm giáo dục của Khổng Tử
8. Lịch sử và bối cảnh thời đại Xuân Thu

Quy tắc trả lời:
- Nếu câu hỏi KHÔNG liên quan đến Khổng Tử, hãy từ chối một cách lịch sự và đề xuất hỏi về Khổng Tử
- Trả lời bằng tiếng Việt, ngắn gọn nhưng đầy đủ thông tin
- Sử dụng emoji phù hợp để tạo sự thân thiện
- Có thể trích dẫn câu nói nổi tiếng của Khổng Tử khi phù hợp
- Luôn khuyến khích người dùng tìm hiểu thêm về Khổng Tử

Hãy trả lời như một người thầy Nho học uyên bác và thân thiện.
`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Tin nhắn không được để trống" },
        { status: 400 }
      );
    }

    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key chưa được cấu hình" },
        { status: 500 }
      );
    }

    // Tạo prompt hoàn chỉnh
    const fullPrompt = `${SYSTEM_PROMPT}

Câu hỏi của người dùng: ${message}

Hãy trả lời:`;

    // Tạo ReadableStream để streaming response với buffer tối ưu
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Gửi request đến Gemini với streaming
          const response = await ai.models.generateContentStream({
            model: "gemini-2.5-pro",
            contents: fullPrompt,
          });

          let buffer = "";
          const encoder = new TextEncoder();

          // Đọc stream từng chunk với buffer để tối ưu hiệu suất
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              buffer += text;

              // Gửi buffer theo từng đoạn nhỏ để mượt mà hơn
              while (buffer.length > 0) {
                const sendLength = Math.min(buffer.length, 3); // Gửi tối đa 3 ký tự mỗi lần
                const sendText = buffer.substring(0, sendLength);
                buffer = buffer.substring(sendLength);

                const data =
                  JSON.stringify({
                    type: "chunk",
                    content: sendText,
                  }) + "\n";

                controller.enqueue(encoder.encode(data));

                // Thêm delay nhỏ để tạo hiệu ứng typing mượt mà
                if (buffer.length > 0) {
                  await new Promise((resolve) => setTimeout(resolve, 30));
                }
              }
            }
          }

          // Gửi signal kết thúc
          const endData =
            JSON.stringify({
              type: "end",
            }) + "\n";
          controller.enqueue(encoder.encode(endData));
          controller.close();
        } catch (error) {
          console.error("Gemini AI Streaming Error:", error);

          // Gửi fallback response
          const fallbackResponses = [
            'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Nhưng tôi có thể chia sẻ một câu nói của Khổng Tử: "学而不思则罔，思而不学则殆" - Học mà không tư thì mờ mịt, tư mà không học thì nguy hiểm. 📚',
            'Tôi gặp chút trục trặc, nhưng hãy nhớ lời Khổng Tử: "三人行，必有我師焉" - Ba người đi, nhất định có người làm thầy ta. Bạn có muốn hỏi gì khác về ngài không? 🤔',
            'Xin lỗi vì sự bất tiện! Như Khổng Tử đã nói: "己所不欲，勿施於人" - Đừng làm điều gì mà bạn không muốn người khác làm cho mình. Hãy thử hỏi lại nhé! 🙏',
          ];

          const randomResponse =
            fallbackResponses[
              Math.floor(Math.random() * fallbackResponses.length)
            ];

          const errorData =
            JSON.stringify({
              type: "chunk",
              content: randomResponse,
            }) + "\n";
          controller.enqueue(new TextEncoder().encode(errorData));

          const endData =
            JSON.stringify({
              type: "end",
            }) + "\n";
          controller.enqueue(new TextEncoder().encode(endData));
          controller.close();
        }
      },
    });

    // Trả về streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi không mong muốn" },
      { status: 500 }
    );
  }
}
