'use strict';
const path = require('path');
const fs = require('fs-extra');
const downloads = require('@serverless-devs/downloads').default;

async function downloadChatglm3(region) {
    const nasModelPath = '/mnt/auto/llm/models/chatglm3-6b';
    const modelUrl = `https://serverless-ai-models-${region}.oss-${region}-internal.aliyuncs.com/chatglm3-6b/pytorch_model-00007-of-00007.bin`;
    const filename = path.basename(modelUrl);
    if (!fs.existsSync(nasModelPath)) {
        fs.ensureDirSync(nasModelPath);
    }
    const modelFile = path.join(nasModelPath, filename);
    console.log(modelFile);
    let result = ''
    if (fs.existsSync(modelFile)) {
        result = 'file already exist'
    } else {
        try {
            await downloads(modelUrl, {
                dest: nasModelPath,
                filename,
                extract: false
            });
            result = 'download chatglm3-6b success'
            // callback(null, 'download chatglm2-6b-int4 success');
        } catch (e) {
            result = e;
        }

    }
    return result

}





exports.handler = async (_event, _context, callback) => {
    const region = process.env.region || 'cn-hangzhou';
    const modelName = process.env.modelName;
    let result =  await downloadChatglm3(region);
    

    callback(null, result)

}
