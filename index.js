const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const users = [
    { id: 1, username: 'Valya', age: 25 }
];

const createUser = (input) => {
    const id = Date.now();
    return { id, ...input };
}

const root = { 
    getAllUsers: () => users,
    getUser: ({ id }) => users.find(user => user.id === id),
    createUser: ({ input }) => {
        const user = createUser(input);
        console.log(user);
        users.push(user);
        return user;
    }
};

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));


app.listen(5000, () => console.log(`SEVER STARTED at http://localhost:5000`));