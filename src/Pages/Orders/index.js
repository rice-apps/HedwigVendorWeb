import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

const ORDERS_QUERY = gql`
    query OrdersForVendor($vendorID:MongoID){
        orderMany(filter:{ vendor: $vendorID}) {
            _id
            user {
                name
            }
            items {
                product {
                    name
                    price
                }
                addons {
                    name
                    price
                }
                comments
            }
            createdAt
        }
    }
`

const ORDER_SUBSCRIPTION = gql`
    subscription($vendorID: ID!) {
        orderAdded(vendorID: $vendorID) {
            _id
            user {
                name
            }
            items {
                product {
                    name
                    price
                }
                addons {
                    name
                    price
                }
                comments
            }
            createdAt
        }
    }  
`

const Order = ({ order }) => {
    // Deconstructing elements from the order object
    // EVERYTHING HERE IS FROM THE GRAPHQL QUERY
    const { _id, user, items, createdAt } = order;
    return (
        <div>
            <h1>Order ID: {_id}</h1>
            <p>Ordered By: {user.name}</p>
            <p># of Order Items: {items.length}</p>
            <p>Ordered At: {createdAt}</p>
            <p>Items: {items.map(item => item.product.name).join(", ")}</p>
        </div>
    )
}

const Orders = () => {
    let vendorID = "5ebcc4a6a55cea938d503174";
    // Following this: https://www.apollographql.com/docs/react/v3.0-beta/data/subscriptions/#subscribing-to-updates-for-a-query
    // First query the data we want (active orders) and then subscribe for more as they roll in
    const { loading, error, data, subscribeToMore } = useQuery(
        ORDERS_QUERY,
        { variables: { vendorID: vendorID } }
    );

    // Setup subscribeToMore
    const subscription = () => subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: { vendorID: vendorID },
        updateQuery: (prev, { subscriptionData } ) => {
            if (!subscriptionData.data) return prev; // no new data, return existing orders
            const newFeedOrder = subscriptionData.data.orderAdded;
            return Object.assign({}, prev, {
                orderMany: [...prev.orderMany, newFeedOrder]
            });
        }
    });

    // Since the second arg is [], this will execute just once, which is what we need.
    useEffect(() => {
        // Only runs once, don't run if undefined
        if (subscribeToMore) {
            subscription();
        }
    }, [])

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Orders.</h1>
            <ul>
                {data.orderMany.map(order => {
                    return (<Order order={order} />)
                })}
            </ul>
        </div>
    )
}

export default Orders;