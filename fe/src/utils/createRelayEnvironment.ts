import { Logger } from '../services';
import axios from 'axios';
import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export const createRelayEnvironment = (records: RecordMap, onServer?: boolean): Environment =>
    new Environment({
        network: Network.create(
            async (operation, variables) => {
                const correctEndpoint = onServer
                    ? process.env.API_ENDPOINT_GRAPHQL
                    : process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL;

                if (!correctEndpoint) {
                    throw new Error('No GraphQL endpoint defined!');
                }

                try {
                    const { data } = await axios(correctEndpoint, {
                        data: JSON.stringify({ query: operation.text, variables }),
                        headers: {
                            'Content-Type': 'application/json',
                            'X-LOCALE': 'cs',
                        },
                        method: 'POST',
                        withCredentials: true,
                    });
                    return data;
                } catch (e) {
                    Logger.log('ERROR');
                    Logger.log(operation.text?.substr(0, 200), variables);
                    Logger.error(e);
                }
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (request, variables) => {
                if (!process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL_WS) {
                    throw new Error('No GraphQL ws endpoint defined!');
                }

                const subscriptionClient = new SubscriptionClient(process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL_WS, {
                    reconnect: true,
                });

                const subscribeObservable = subscriptionClient.request({
                    query: request.text as string,
                    operationName: request.name as string,
                    variables,
                });
                // Important: Convert subscriptions-transport-ws observable type to Relay's
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return Observable.from(subscribeObservable);
            },
        ),
        store: new Store(new RecordSource(records)),
        isServer: true,
    });
