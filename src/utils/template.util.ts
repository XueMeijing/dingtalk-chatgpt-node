export const getAnswerTemplate = function (body, message) {
  const senderId = body['senderId']
  const markdownMsg = `<font color=#008000>@${senderId} </font>  \n\n ${message}`

  const data = {
      "msgtype": "markdown",
      "markdown": {
          "title": "大聪明说",
          "text": markdownMsg
      },
      "at": {
          "atDingtalkIds": [
            senderId
          ],
      }
  }
  return data
}