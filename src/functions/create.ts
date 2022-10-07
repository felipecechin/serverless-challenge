import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
    title: string;
    deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id: user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

    const id = Math.floor(Math.random() * 100) + 1;

    await document
        .put({
            TableName: 'todos',
            Item: {
                user_id,
                id: String(id),
                title,
                done: false,
                deadline: new Date(deadline).toDateString(),
            },
        })
        .promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Todo criado',
        }),
    };
};