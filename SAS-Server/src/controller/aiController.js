const router = require('express').Router();
const aiRequest = require('../utils/request/aiRequest');

module.exports = router;

/**
 * @name newSearch - 新建搜索会话
 * @description POST /ai/newSearch
 * @response {string} searchId 搜索结果
 */
router.post('/newSearch', async (req, res) => {
    const result = await aiRequest.newSearch();
    if (result.success) {
        res.ResultVO(0, '创建成功', result.data);
    } else {
        res.ResultVO(1, '创建失败', result.error);
    }
});

/**
 * @name searchResponse - 搜索结果
 * @description POST /ai/searchResponse
 * @body {string} searchId 搜索结果
 * @body {string} query 搜索结果
 * @response {string} response 搜索结果
 */
router.post('/searchResponse', async (req, res) => {
    const result = await aiRequest.searchResponse('', req.body);
    if (result.success) {
        res.ResultVO(0, '搜索成功', result.data);
    } else {
        res.ResultVO(1, '搜索失败', result.error);
    }
});

/**
 * @name sendMessage - 发送消息
 * @description POST /ai/sendMessage
 * @body {object} message 消息内容
 * @response {stream} 流式响应消息内容
 */
router.post('/sendMessage', async (req, res) => {
    const result = await aiRequest.sendMessage('', req.body);
    if (result.success) {
        // 设置响应头，指定内容类型为事件流
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = result.data;

        // 使用ReadableStream的reader接口处理流数据
        const reader = stream.getReader();

        // 处理流数据
        const processStream = async () => {
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('Stream complete');
                        res.write('data: [DONE]\n\n');
                        res.end();
                        break;
                    }
                    // 处理数据块
                    const chunkStr = new TextDecoder().decode(value);

                    // 直接处理整个数据块，因为它可能已经是JSON格式
                    try {
                        // 尝试直接解析整个数据块
                        const jsonData = JSON.parse(chunkStr);
                        // 提取content或reasoning_content字段（如果存在）
                        let content = '';
                        if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].delta) {
                            // 优先使用content字段，如果不为null则使用content，否则使用reasoning_content字段
                            if (jsonData.choices[0].delta.content !== null && jsonData.choices[0].delta.content !== undefined) {
                                content = jsonData.choices[0].delta.content || '';
                            } else if (jsonData.choices[0].delta.reasoning_content) {
                                content = jsonData.choices[0].delta.reasoning_content;
                            }
                        }
                        // 构造符合要求的格式：data:{delta:{reasoning_content:'',content:''}}
                        const responseData = {
                            delta: {
                                reasoning_content: jsonData.choices?.[0]?.delta?.reasoning_content || '',
                                content: jsonData.choices?.[0]?.delta?.content || ''
                            }
                        };
                        res.write(`data: ${JSON.stringify(responseData)}\n\n`);
                    } catch (parseError) {
                        // 如果直接解析失败，尝试按行解析
                        // 将接收到的数据按行分割，处理每一行
                        const lines = chunkStr.split('\n');
                        for (const line of lines) {
                            // 跳过空行
                            if (!line.trim()) continue;

                            // 检查是否是数据行（以'data: '开头）
                            if (line.startsWith('data: ')) {
                                const jsonStr = line.substring(6).trim();
                                // 跳过[DONE]标记
                                if (jsonStr === '[DONE]') continue;

                                try {
                                    // 解析JSON数据
                                    const jsonData = JSON.parse(jsonStr);
                                    // 提取content或reasoning_content字段（如果存在）
                                    let content = '';
                                    if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].delta) {
                                        // 优先使用content字段，如果不为null则使用content，否则使用reasoning_content字段
                                        if (jsonData.choices[0].delta.content !== null && jsonData.choices[0].delta.content !== undefined) {
                                            content = jsonData.choices[0].delta.content || '';
                                        } else if (jsonData.choices[0].delta.reasoning_content) {
                                            content = jsonData.choices[0].delta.reasoning_content;
                                        }
                                    }
                                    const responseData = {
                                        delta: {
                                            reasoning_content: jsonData.choices?.[0]?.delta?.reasoning_content || '',
                                            content: jsonData.choices?.[0]?.delta?.content || ''
                                        }
                                    };
                                    res.write(`data: ${JSON.stringify(responseData)}\n\n`);
                                } catch (innerParseError) {
                                    console.error('JSON解析错误:', innerParseError, jsonStr);
                                    // 如果解析失败，发送原始数据
                                    res.write(`data: ${jsonStr}\n\n`);
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                // 处理流错误
                console.error('Stream error:', err);
                res.write(`data: {"error": "${err.message}"}\n\n`);
                res.end();
            }
        };

        processStream();

        // 处理客户端断开连接
        req.on('close', () => {
            reader.cancel();
        });
    } else {
        res.ResultVO(1, '失败', result.error);
    }
});
