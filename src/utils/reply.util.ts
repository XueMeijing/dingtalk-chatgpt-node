const axios = require("axios")

export const replyAnswerTemplateToDingtalk = async function (body, answerTemplate) {
  const webhookUrl = body['sessionWebhook']

  const config = {
    method: 'post',
    url: webhookUrl,
    headers: { 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(answerTemplate)
  }
  
  const response = await axios(config)
}