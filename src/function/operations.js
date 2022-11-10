import faunadb, {
  Create,
  Collection,
  Ref,
  Documents,
  Paginate,
  Lambda,
  Get,
  Map,
  Delete,
  Update
} from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_KEY,
  domain: process.env.REACT_APP_FAUNA_DOMAIN ? process.env.REACT_APP_FAUNA_DOMAIN : 'db.eu.fauna.com',
});

export const newItem = (col, data) => client.query(
  Create(
    Collection(col),
    { data: {
      ...data
    } }
  )
)

export default client;

export const getItemRef = (col, id) => Ref(Collection(col), id);

// Define the reference to the target set
export const getSetRef = (collectionName) => Documents(Collection(collectionName));

// All Transactions
export const allItems = (col) => client.query(
  Map(
    Paginate(Documents(Collection(col))),
    Lambda(x => Get(x))
  )
)

export const updateTransaction = (id, data) => client.query(
  Update(
    Ref(Collection('Transaction'), id),
    {
      data: {
        ...data
      },
    },
  )
)

export const deleteTransaction = id => client.query(
  Delete(Ref(Collection('Transaction'), id))
)