import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const response = await document
        .query({
            TableName: 'todos',
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': id,
            },
        })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            todos: [...response.Items],
        }),
    };
};