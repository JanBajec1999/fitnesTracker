var AWS = require('aws-sdk');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "fitnesTrackerDB";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}


exports.handler = (event, context, callback) => {
    console.log(event);

    if (event.request.userAttributes.email) {

        let putItemParams = {
            TableName: tableName,
            Item: {
                'PK': 'USERS',
                'SK': event.request.userAttributes.email,
                'username': event.userName
            }
          }
          dynamodb.put(putItemParams, (err, data) => {
            if(err) {
              //res.statusCode = 500;                                                        ///POTREBNO JE POHENDLAT ERORJE!
              console.log(err);
              //res.json({error: err, url: req.url, body: req.body});
            } else{
              //res.json({success: 'put call succeed!', url: req.url, data: data})
            }
          });

        callback(null, event);
    } else {
        // Nothing to do, the user's email ID is unknown
        callback(null, event);
    }
};