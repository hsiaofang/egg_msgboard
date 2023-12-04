module.exports = {
    schedule: {
      interval: '10m',
      type: 'all',
    },
    async task(ctx) {
      const app = ctx.app;
  
      // hgetall 獲取 messages 的hash結構中的所有欄位和值
      const allMessage = await app.redis.hgetall('messages');
      console.log('allMessage:', allMessage);
  
      const messages = [];
      for (const field in allMessage) {
        const redisValue = allMessage[field];
        // console.log('redisValue:', redisValue);
  
        if (redisValue) {
          const messageData = JSON.parse(redisValue);
  
          messages.push({
            userID: messageData.userID,
            title: messageData.title,
            content: messageData.content,
            createdAt: messageData.createdAt,
          });
        //   console.log('redis裡的資料', messages);
        }
      }
  
  
      if (messages.length > 0) {
        await app.model.Message.bulkCreate(messages);
        // console.log('存進資料庫->', messages);
  
        await app.redis.del('messages');
      } else {
        // console.log('緩存沒資料！');
      }
    },
  
  };
  