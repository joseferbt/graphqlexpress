import {ApolloServer, gql} from "apollo-server";


const typeDefs = gql`
  type breakingquote {
    quote: String  
    author: String
  }

  type Query {
    Getbreakingquotes: [breakingquote],
    Getbreakingquote(quote:String!):[breakingquote]
  }
  type Mutation {
      Createbreakingquote(quote: String!, author: String!): breakingquote
      Deletebreakingquote(quote: String!): breakingquote
      Updatebreakingquote(quote: String!, author: String!): breakingquote 
  }
`;

let fetchRes = fetch("https://api.breakingbadquotes.xyz/v1/quotes/10");
let breakingquotes = []
fetchRes.then(res =>
    res.json()).then(d => {
     breakingquotes = d;
})
//let breakingquotes = JSON.parse(JSON.stringify([{"quote":"All I can do is wait... for the cancer to come back.","author":"Skyler White"},{"quote":"So you do have a plan? Yeah, Mr. White! Yeah, science!","author":"Jesse Pinkman"},{"quote":"May his death satisfy you.","author":"Gustavo Fring"},{"quote":"Never give up control. Live life on your own terms.","author":"Walter White"},{"quote":"I do not believe fear to be an effective motivator. I want investment. For now, I'm simply interested in time frame","author":"Gustavo Fring"},{"quote":"They're minerals, Marie! Jesus!","author":"Hank Schrader"},{"quote":"You all know exactly who I am. Say my name.","author":"Walter White"},{"quote":"I will put you under the jail.","author":"Hank Schrader"},{"quote":"Walter Jr., you're my big man. There are going to be some things that you'll come to learn about me in the next few days. But just know that no matter how it may look, I only had you in my heart. Goodbye!","author":"Walter White"},{"quote":"Don't drink and drive but if you do, call me.","author":"Saul Goodman"}]));
  const resolvers = {
    Mutation: {
        Createbreakingquote: (_,arg) => {breakingquotes.push(arg); return arg},
        Deletebreakingquote: (_,arg) => { 
                                 let finalbreakingquotes=breakingquotes.filter(breakingquote => breakingquote.quote != arg.quote);
                                 let breakingquotedeleted = breakingquotes.find(breakingquote => breakingquote.quote == arg.quote );

            breakingquotes = [...finalbreakingquotes];
                                 return breakingquotedeleted
                                },
        Updatebreakingquote:(_,arg) => {  let objIdx = breakingquotes.findIndex(breakingquote => breakingquote.quote == arg.quote);
                                 breakingquotes[objIdx] = arg
                                 return arg
                              }                        

    },  
    Query: {
      Getbreakingquotes: () => breakingquotes,
      Getbreakingquote: (_,arg) => [breakingquotes.find(number => number.quote == arg.quote)]
    },
  };


const server = new ApolloServer({ typeDefs, resolvers ,introspection: true});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});