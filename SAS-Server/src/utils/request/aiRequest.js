const search = require('config').get('searchConfig');
const ai = require('config').get('aiConfig');
const searchUrl = search.baseUrl;
const aiUrl = ai.baseUrl;
const request = {
    fetch: async (url, options) => {
        console.log('Request URL:', url);
        return await fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    console.error('Request error:', res.statusText);
                    return res.json();
                }
                return res.json();
            })
            .then((res) => {
                return { success: true, data: res };
            })
            .catch((error) => {
                console.error('Request error:', error);
                return { success: false, error: error.message || '未知错误' };
            });
    },
    fetchStream: async (url, options) => {
        try {
            // 从options中提取signal，确保其余选项正确传递
            const { signal, ...fetchOptions } = options;

            // 如果存在signal且是有效的AbortSignal实例，则添加到fetchOptions
            if (signal && signal instanceof AbortSignal) {
                fetchOptions.signal = signal;
            }

            const response = await fetch(url, fetchOptions);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Stream request error:', response.statusText);
                return { success: false, error: errorData.error || response.statusText };
            }
            return { success: true, data: response.body };
        } catch (error) {
            console.error('Stream request error:', error);
            return { success: false, error: error.message || '未知错误' };
        }
    },
    newSearch: (url) => {
        url = searchUrl;
        return request.fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + search.search_api_key
            },
            body: JSON.stringify({
                app_id: search.app_id
            })
        });
    },
    searchResponse: (url, data) => {
        url = searchUrl;
        return request.fetch(url + '/runs', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + search.search_api_key
            },
            body: JSON.stringify({
                app_id: search.app_id,
                query: data.query,
                conversation_id: data.conversation_id,
                stream: false
            })
        });
    },
    sendMessage: (url, data) => {
        url = aiUrl;
        console.log('sendMessage', data);

        // 准备请求选项，确保signal正确处理
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + ai.api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: data.model,
                stream: true,
                max_tokens: data.max_tokens,
                stop: data.stop,
                temperature: data.temperature,
                top_p: data.top_p,
                top_k: data.top_k,
                frequency_penalty: data.frequency_penalty,
                n: data.n,
                response_format: data.response_format,
                messages: data.messages
            })
        };

        // 如果data.signal存在，添加到options
        if (data.signal) {
            options.signal = data.signal;
        }

        return request.fetchStream(url, options);
    }
};
module.exports = request;
