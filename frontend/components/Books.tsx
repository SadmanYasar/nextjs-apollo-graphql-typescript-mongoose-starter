import { gql } from '../src/__generated__/gql';
import { Query } from '../src/__generated__/graphql';
import { useQuery } from "@apollo/client";

export default function Books() {
    // query type is books from type Query = { books?: Maybe<Array<Maybe<Book>>>; }
    const { data, loading, error } = useQuery();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

}